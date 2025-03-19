using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;
using System;
using System.Linq;

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
                    .FirstOrDefaultAsync(m => m.Id == matchId);

                if (match == null)
                {
                    _logger.LogError("Match {MatchId} not found", matchId);
                    return;
                }

                // Handle set deletion
                if (
                    parts[2] == "00"
                    && parts[4] == "00"
                    && parts[5] == "00"
                    && parts[6] == "00"
                    && parts[7] == "00"
                    && parts[8] == "00"
                    && parts[9] == "00"
                )
                {
                    dbContext.Set.RemoveRange(match.Sets);
                    await dbContext.SaveChangesAsync();
                    _logger.LogInformation("Deleted all sets for match {MatchId}", matchId);
                }

                // Set management
                var currentSet = match.Sets.LastOrDefault(s => !s.IsCompleted);
                var shouldCreateNewSet = false;

                if (currentSet == null)
                {
                    var previousSet = match.Sets.LastOrDefault();
                    if (previousSet != null && !previousSet.IsCompleted)
                    {
                        previousSet.DetermineSetWinner();
                        if (!previousSet.IsCompleted)
                        {
                            // Fallback to first-to-3 rule
                            if (
                                previousSet.Player1Games >= 3
                                && previousSet.Player1Games - previousSet.Player2Games >= 2
                            )
                            {
                                previousSet.WinnerId = 1;
                                previousSet.IsCompleted = true;
                                previousSet.EndTime = DateTime.UtcNow;
                            }
                            else if (
                                previousSet.Player2Games >= 3
                                && previousSet.Player2Games - previousSet.Player1Games >= 2
                            )
                            {
                                previousSet.WinnerId = 2;
                                previousSet.IsCompleted = true;
                                previousSet.EndTime = DateTime.UtcNow;
                            }
                        }

                        if (previousSet.IsCompleted)
                        {
                            _logger.LogInformation(
                                "Completed previous set {SetNumber}",
                                previousSet.SetNumber
                            );
                            shouldCreateNewSet = true;
                        }
                    }
                    else
                    {
                        shouldCreateNewSet = true;
                    }

                    if (shouldCreateNewSet)
                    {
                        currentSet = new Set
                        {
                            SetNumber = match.Sets.Count + 1,
                            Match = match,
                            StartTime = DateTime.UtcNow,
                        };
                        match.Sets.Add(currentSet);
                        _logger.LogInformation("Created new set #{SetNumber}", currentSet.SetNumber);
                    }
                }

                if (currentSet == null)
                {
                    _logger.LogError("Failed to create or find current set");
                    return;
                }

                // Reset current set
                currentSet.Player1Games = 0;
                currentSet.Player2Games = 0;
                currentSet.Games.Clear();

                // Process game segments
                var gameSegments = parts.Skip(4).Take(6).ToList();
                foreach (var segment in gameSegments)
                {
                    if (segment.Length != 2)
                        continue;

                    if (segment[0] == '1')
                    {
                        currentSet.Player1Games++;
                        currentSet.Games.Add(new Game { WinnerId = 1, IsCompleted = true });
                    }
                    if (segment[1] == '1')
                    {
                        currentSet.Player2Games++;
                        currentSet.Games.Add(new Game { WinnerId = 2, IsCompleted = true });
                    }
                }

                // Determine set winner
                currentSet.DetermineSetWinner();

                // First-to-3-games override
                if (!currentSet.IsCompleted)
                {
                    if (
                        currentSet.Player1Games >= 6
                        && currentSet.Player1Games - currentSet.Player2Games >= 2
                    )
                    {
                        currentSet.WinnerId = 1;
                        currentSet.IsCompleted = true;
                        currentSet.EndTime = DateTime.UtcNow;
                    }
                    else if (
                        currentSet.Player2Games >= 6
                        && currentSet.Player2Games - currentSet.Player1Games >= 2
                    )
                    {
                        currentSet.WinnerId = 2;
                        currentSet.IsCompleted = true;
                        currentSet.EndTime = DateTime.UtcNow;
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
        
        public async Task BroadcastMatchUpdateAsync(int matchId)
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<TennisAppContext>();
                
                var match = await dbContext
                    .Match.Include(m => m.Sets)
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
                    Sets = match.Sets.Select(s => new
                    {
                        s.SetNumber,
                        s.Player1Games,
                        s.Player2Games,
                        s.IsCompleted,
                        s.WinnerId
                    }).ToList()
                };
                
                await _webSocketHandler.SendMessageToTopicAsync("live_score", matchData);
                _logger.LogInformation("Match update broadcast completed for match {MatchId}", matchId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error broadcasting match update");
            }
        }
    }
}