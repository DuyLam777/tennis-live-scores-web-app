using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.WebSockets
{
    public class LiveScoreService
    {
        private readonly ILogger<LiveScoreService> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly WebSocketHandler _webSocketHandler;

        public LiveScoreService(
            ILogger<LiveScoreService> logger,
            IServiceProvider serviceProvider,
            WebSocketHandler webSocketHandler
        )
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _webSocketHandler = webSocketHandler;
        }

        public async Task ProcessMessageAsync(string message)
        {
            try
            {
                _logger.LogInformation("Processing live score message: {Message}", message);

                using var scope = _serviceProvider.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<TennisAppContext>();

                var parts = message.Split(',');

                // Validate message structure
                if (parts.Length != 10 || !int.TryParse(parts[0], out int matchId))
                {
                    _logger.LogError("Invalid message format. Expected 10 parts.");
                    return;
                }

                var match = await dbContext
                    .Match.Include(m => m.Sets)
                    .ThenInclude(s => s.Games)
                    .Include(m => m.Player1)
                    .Include(m => m.Player2)
                    .FirstOrDefaultAsync(m => m.Id == matchId);

                if (match == null)
                {
                    _logger.LogError("Match {MatchId} not found", matchId);
                    return;
                }

                // Check if match is already completed - if so, don't allow further set creation
                // Only allow for set deletion (setPart == "00")
                if (IsMatchCompleted(match) && parts[2] != "00")
                {
                    _logger.LogInformation(
                        "Match {MatchId} is already completed. No further updates allowed.",
                        matchId
                    );
                    return;
                }

                // Parse set information
                string setPart = parts[2];

                // Handle set deletion if the set part is "00"
                if (setPart == "00")
                {
                    dbContext.Set.RemoveRange(match.Sets);
                    match.Sets.Clear();
                    await dbContext.SaveChangesAsync();
                    _logger.LogInformation("Deleted all sets for match {MatchId}", matchId);
                }

                // Process set logic based on set counts
                Set? currentSet = null;

                if (setPart == "00")
                {
                    // Create new first set since we deleted all sets
                    currentSet = new Set
                    {
                        SetNumber = 1,
                        Match = match,
                        StartTime = DateTime.UtcNow,
                    };
                    match.Sets.Add(currentSet);
                    _logger.LogInformation("Created new first set after deletion");
                }
                else if (setPart == "10" || setPart == "01")
                {
                    // Mark first set as complete if it exists
                    var firstSet = match.Sets.FirstOrDefault(s => s.SetNumber == 1);
                    if (firstSet != null && !firstSet.IsCompleted)
                    {
                        firstSet.IsCompleted = true;
                        firstSet.EndTime = DateTime.UtcNow;
                        firstSet.WinnerId = setPart == "10" ? match.Player1Id : match.Player2Id;
                        _logger.LogInformation(
                            "Marked first set as complete, winner: Player {WinnerId}",
                            firstSet.WinnerId
                        );
                    }
                    else if (firstSet == null)
                    {
                        // Create first set if it doesn't exist
                        firstSet = new Set
                        {
                            SetNumber = 1,
                            Match = match,
                            StartTime = DateTime.UtcNow.AddMinutes(-10), // Backdated
                            IsCompleted = true,
                            EndTime = DateTime.UtcNow,
                            WinnerId = setPart == "10" ? match.Player1Id : match.Player2Id,
                        };
                        match.Sets.Add(firstSet);
                        _logger.LogInformation(
                            "Created and completed first set, winner: Player {WinnerId}",
                            firstSet.WinnerId
                        );
                    }

                    // Look for second set or create it
                    currentSet = match.Sets.FirstOrDefault(s => s.SetNumber == 2);
                    if (currentSet == null)
                    {
                        currentSet = new Set
                        {
                            SetNumber = 2,
                            Match = match,
                            StartTime = DateTime.UtcNow,
                        };
                        match.Sets.Add(currentSet);
                        _logger.LogInformation("Created second set");
                    }
                }
                else if (setPart == "11")
                {
                    // Ensure first set exists and is complete
                    var firstSet = match.Sets.FirstOrDefault(s => s.SetNumber == 1);
                    if (firstSet == null)
                    {
                        firstSet = new Set
                        {
                            SetNumber = 1,
                            Match = match,
                            StartTime = DateTime.UtcNow.AddMinutes(-20), // Backdated
                            IsCompleted = true,
                            EndTime = DateTime.UtcNow.AddMinutes(-10),
                            WinnerId = match.Player1Id, // Default to player 1
                        };
                        match.Sets.Add(firstSet);
                        _logger.LogInformation("Created and completed first set (default)");
                    }
                    else if (!firstSet.IsCompleted)
                    {
                        firstSet.IsCompleted = true;
                        firstSet.EndTime = DateTime.UtcNow.AddMinutes(-10);
                        firstSet.WinnerId =
                            firstSet.Player1Games > firstSet.Player2Games
                                ? match.Player1Id
                                : match.Player2Id;
                        _logger.LogInformation(
                            "Marked first set as complete, winner: Player {WinnerId}",
                            firstSet.WinnerId
                        );
                    }

                    // Mark second set as complete if it exists
                    var secondSet = match.Sets.FirstOrDefault(s => s.SetNumber == 2);
                    if (secondSet != null && !secondSet.IsCompleted)
                    {
                        secondSet.IsCompleted = true;
                        secondSet.EndTime = DateTime.UtcNow;
                        secondSet.WinnerId =
                            secondSet.Player1Games > secondSet.Player2Games
                                ? match.Player1Id
                                : match.Player2Id;
                        _logger.LogInformation(
                            "Marked second set as complete, winner: Player {WinnerId}",
                            secondSet.WinnerId
                        );
                    }
                    else if (secondSet == null)
                    {
                        // Create second set if it doesn't exist
                        secondSet = new Set
                        {
                            SetNumber = 2,
                            Match = match,
                            StartTime = DateTime.UtcNow.AddMinutes(-10),
                            IsCompleted = true,
                            EndTime = DateTime.UtcNow,
                            WinnerId =
                                firstSet.WinnerId == match.Player1Id
                                    ? match.Player2Id
                                    : match.Player1Id, // Alternate winner
                        };
                        match.Sets.Add(secondSet);
                        _logger.LogInformation(
                            "Created and completed second set, winner: Player {WinnerId}",
                            secondSet.WinnerId
                        );
                    }

                    // Check if match is already completed after completing first two sets
                    if (IsMatchCompleted(match))
                    {
                        _logger.LogInformation(
                            "Match {MatchId} is completed after two sets.",
                            matchId
                        );
                        await dbContext.SaveChangesAsync();
                        await BroadcastMatchUpdateAsync(matchId);
                        return;
                    }

                    // Look for or create third set if match not completed
                    currentSet = match.Sets.FirstOrDefault(s => s.SetNumber == 3);
                    if (currentSet == null)
                    {
                        currentSet = new Set
                        {
                            SetNumber = 3,
                            Match = match,
                            StartTime = DateTime.UtcNow,
                        };
                        match.Sets.Add(currentSet);
                        _logger.LogInformation("Created third set");
                    }
                }
                else if (setPart == "20" || setPart == "02" || setPart == "21" || setPart == "12")
                {
                    // Mark all previous sets as complete
                    bool setsUpdated = false;
                    foreach (
                        var set in match.Sets.Where(s => !s.IsCompleted).OrderBy(s => s.SetNumber)
                    )
                    {
                        set.IsCompleted = true;
                        set.EndTime = DateTime.UtcNow;

                        // Determine winner based on games
                        set.WinnerId =
                            set.Player1Games > set.Player2Games ? match.Player1Id : match.Player2Id;
                        _logger.LogInformation(
                            "Marked set #{SetNumber} as complete, winner: Player {WinnerId}",
                            set.SetNumber,
                            set.WinnerId
                        );
                        setsUpdated = true;
                    }

                    // If we updated any sets, save changes and broadcast
                    if (setsUpdated)
                    {
                        await dbContext.SaveChangesAsync();

                        // Check if match is completed after updating sets
                        if (IsMatchCompleted(match))
                        {
                            _logger.LogInformation("Match {MatchId} is completed.", matchId);
                        }

                        await BroadcastMatchUpdateAsync(matchId);
                        return;
                    }
                }
                else
                {
                    // Default case - get current uncompleted set or create new one
                    currentSet = match.Sets.FirstOrDefault(s => !s.IsCompleted);
                    if (currentSet == null)
                    {
                        // Only create a new set if the match isn't completed
                        if (IsMatchCompleted(match))
                        {
                            _logger.LogInformation(
                                "Match {MatchId} is already completed. Cannot create new sets.",
                                matchId
                            );
                            return;
                        }

                        int nextSetNumber = match.Sets.Count + 1;
                        currentSet = new Set
                        {
                            SetNumber = nextSetNumber,
                            Match = match,
                            StartTime = DateTime.UtcNow,
                        };
                        match.Sets.Add(currentSet);
                        _logger.LogInformation(
                            "Created new set #{SetNumber} (default case)",
                            nextSetNumber
                        );
                    }
                }

                // Ensure we have a current set
                if (currentSet == null)
                {
                    _logger.LogError("Failed to create or find current set");
                    return;
                }

                // Reset current set scores
                currentSet.Player1Games = 0;
                currentSet.Player2Games = 0;
                currentSet.Games.Clear();

                // Process game segments
                var gameSegments = parts.Skip(4).Take(6).ToList();
                foreach (var segment in gameSegments)
                {
                    if (segment.Length != 2)
                        continue;

                    // For each '1' in the left position, add a point to player 1
                    if (segment[0] == '1')
                    {
                        currentSet.Player1Games++;
                        currentSet.Games.Add(
                            new Game { WinnerId = match.Player1Id, IsCompleted = true }
                        );
                    }

                    // For each '1' in the right position, add a point to player 2
                    if (segment[1] == '1')
                    {
                        currentSet.Player2Games++;
                        currentSet.Games.Add(
                            new Game { WinnerId = match.Player2Id, IsCompleted = true }
                        );
                    }
                }

                await dbContext.SaveChangesAsync();

                // Broadcast updated match data
                await BroadcastMatchUpdateAsync(matchId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing live score message");
            }
        }

        // Imported from the other class to check match completion
        private bool IsMatchCompleted(Match match)
        {
            // Updated match completion logic:
            // 1. All sets must be completed
            // 2. At least 2 sets must have the same winnerId
            if (match.Sets == null || !match.Sets.Any())
                return false;

            // Check if all sets are completed first
            if (match.Sets.Any(s => !s.IsCompleted))
                return false;

            // Count wins for each player
            int? player1Id = match.Player1?.Id;
            int? player2Id = match.Player2?.Id;
            int player1Wins = match.Sets.Count(s => s.WinnerId == player1Id);
            int player2Wins = match.Sets.Count(s => s.WinnerId == player2Id);

            // Match is completed if either player has at least 2 set wins
            return player1Wins >= 2 || player2Wins >= 2;
        }

        public async Task BroadcastMatchUpdateAsync(int matchId)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<TennisAppContext>();

                var match = await dbContext
                    .Match.Include(m => m.Sets)
                    .Include(m => m.Player1)
                    .Include(m => m.Player2)
                    .FirstOrDefaultAsync(m => m.Id == matchId);

                if (match == null)
                {
                    _logger.LogError("Match {MatchId} not found for broadcasting", matchId);
                    return;
                }

                var matchData = new
                {
                    Id = match.Id,
                    match.Player1Name,
                    match.Player2Name,
                    Sets = match
                        .Sets.Select(s => new
                        {
                            s.SetNumber,
                            s.Player1Games,
                            s.Player2Games,
                            s.IsCompleted,
                            s.WinnerId,
                        })
                        .ToList(),
                    IsCompleted = IsMatchCompleted(match),
                };

                await _webSocketHandler.SendMessageToTopicAsync("live_score", matchData);
                _logger.LogInformation(
                    "Match update broadcast completed for match {MatchId}",
                    matchId
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error broadcasting match update");
            }
        }
    }
}
