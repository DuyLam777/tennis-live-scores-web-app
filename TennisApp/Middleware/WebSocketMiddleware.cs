using System.Text;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.Middleware;

public class WebSocketMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<WebSocketMiddleware> _logger;

    public WebSocketMiddleware(RequestDelegate next, ILogger<WebSocketMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, TennisAppContext dbContext)
    {
        if (context.WebSockets.IsWebSocketRequest && context.Request.Path == "/ws")
        {
            _logger.LogInformation("WebSocket connection request received");
            _logger.LogInformation("Path: {Path}", context.Request.Path);
            var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await HandleWebSocketAsync(webSocket, dbContext);
        }
        else
        {
            _logger.LogInformation("Not a WebSocket request or incorrect path");
            _logger.LogInformation("Path: {Path}", context.Request.Path);
            await _next(context);
        }
    }

    private async Task HandleWebSocketAsync(
        System.Net.WebSockets.WebSocket webSocket,
        TennisAppContext dbContext
    )
    {
        var buffer = new byte[1024 * 4];
        try
        {
            while (webSocket.State == System.Net.WebSockets.WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer),
                    CancellationToken.None
                );
                if (result.MessageType == System.Net.WebSockets.WebSocketMessageType.Text)
                {
                    var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    _logger.LogInformation("Received message: {Message}", message);
                    await ProcessMessageAsync(message, dbContext);
                }
                else if (result.MessageType == System.Net.WebSockets.WebSocketMessageType.Close)
                {
                    await webSocket.CloseAsync(
                        System.Net.WebSockets.WebSocketCloseStatus.NormalClosure,
                        "Closed by client",
                        CancellationToken.None
                    );
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "WebSocket error");
        }
    }

    private async Task ProcessMessageAsync(string message, TennisAppContext dbContext)
    {
        try
        {
            _logger.LogInformation("Processing message: {Message}", message);
            var parts = message.Split(',');

            // Validate message structure: [matchId],Set,11,Games, [6 segments]
            if (parts.Length != 10 || !int.TryParse(parts[0], out int matchId))
            {
                _logger.LogError("Invalid message format. Expected 10 parts.");
                return;
            }

            // Get match with the latest incomplete set
            var match = await dbContext
                .Match.Include(m => m.Sets)
                .ThenInclude(s => s.Games)
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                _logger.LogError("Match {MatchId} not found", matchId);
                return;
            }

            // Get or create the current set (latest incomplete)
            var currentSet = match.Sets.LastOrDefault(s => !s.IsCompleted);
            if (currentSet == null)
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

            // Reset current set state (games are replaced by incoming data)
            currentSet.Player1Games = 0;
            currentSet.Player2Games = 0;
            currentSet.Games.Clear();

            // Process the 6 game segments (positions 4-9)
            var gameSegments = parts.Skip(4).Take(6).ToList();
            _logger.LogInformation(
                "Processing {Count} game segments for set #{SetNumber}",
                gameSegments.Count,
                currentSet.SetNumber
            );

            foreach (var segment in gameSegments)
            {
                if (segment.Length != 2)
                {
                    _logger.LogWarning("Invalid segment format: {Segment}", segment);
                    continue;
                }

                char p1Win = segment[0];
                char p2Win = segment[1];

                // Add games based on segment values
                if (p1Win == '1')
                {
                    currentSet.Player1Games++;
                    currentSet.Games.Add(new Game { WinnerId = 1, IsCompleted = true });
                    _logger.LogDebug("Added Player 1 game");
                }
                if (p2Win == '1')
                {
                    currentSet.Player2Games++;
                    currentSet.Games.Add(new Game { WinnerId = 2, IsCompleted = true });
                    _logger.LogDebug("Added Player 2 game");
                }
            }

            // Special case: All left or all right digits are '1'
            bool allLeftWins = gameSegments.All(s => s[0] == '1');
            bool allRightWins = gameSegments.All(s => s[1] == '1');

            if (allLeftWins || allRightWins)
            {
                currentSet.WinnerId = allLeftWins ? 1 : 2;
                currentSet.IsCompleted = true;
                currentSet.EndTime = DateTime.UtcNow;
                _logger.LogInformation(
                    "Set {SetNumber} completed via segment sweep. Winner: {Winner}",
                    currentSet.SetNumber,
                    currentSet.WinnerId
                );
            }
            else
            {
                // Fallback to standard tennis rules
                currentSet.DetermineSetWinner();
                if (currentSet.IsCompleted)
                {
                    _logger.LogInformation(
                        "Set {SetNumber} completed via standard rules. Winner: {Winner}",
                        currentSet.SetNumber,
                        currentSet.WinnerId
                    );
                }
            }

            await dbContext.SaveChangesAsync();
            _logger.LogInformation("Match {MatchId} updated successfully", matchId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing message");
        }
    }
}
