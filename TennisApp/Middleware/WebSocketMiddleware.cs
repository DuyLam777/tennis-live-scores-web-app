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
            var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await HandleWebSocketAsync(webSocket, dbContext);
        }
        else
        {
            _logger.LogInformation("Not a WebSocket request or incorrect path");
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
            if (parts[2] == "00")
            {
                dbContext.Set.RemoveRange(match.Sets);
                await dbContext.SaveChangesAsync();
                _logger.LogInformation("Deleted all sets for match {MatchId}", matchId);
                return;
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
                    currentSet.Player1Games >= 3
                    && currentSet.Player1Games - currentSet.Player2Games >= 2
                )
                {
                    currentSet.WinnerId = 1;
                    currentSet.IsCompleted = true;
                    currentSet.EndTime = DateTime.UtcNow;
                }
                else if (
                    currentSet.Player2Games >= 3
                    && currentSet.Player2Games - currentSet.Player1Games >= 2
                )
                {
                    currentSet.WinnerId = 2;
                    currentSet.IsCompleted = true;
                    currentSet.EndTime = DateTime.UtcNow;
                }
            }

            await dbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing message");
        }
    }
}
