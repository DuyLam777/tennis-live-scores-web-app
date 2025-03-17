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
            var parts = message.Split(',');

            // Validate basic message structure
            if (parts.Length < 5 || !int.TryParse(parts[0], out int matchId))
            {
                _logger.LogError("Invalid message format");
                _logger.LogError("Message: {Message}", message);
                return;
            }

            // Get match with related data
            var match = await dbContext
                .Set<Match>()
                .Include(m => m.Sets)
                .ThenInclude(s => s.Games)
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                _logger.LogError("Match {MatchId} not found", matchId);
                return;
            }

            // Parse set scores (format: "21" = player1: 2, player2: 1)
            if (
                parts[2].Length != 2
                || !int.TryParse(parts[2][0].ToString(), out int reportedP1Sets)
                || !int.TryParse(parts[2][1].ToString(), out int reportedP2Sets)
            )
            {
                _logger.LogError("Invalid set score format");
                return;
            }

            // Get current set state
            var completedSets = match.Sets.Where(s => s.IsCompleted).ToList();
            var currentSet = match.Sets.FirstOrDefault(s => !s.IsCompleted);

            // Create new sets if needed
            int totalReportedSets = reportedP1Sets + reportedP2Sets;
            while (match.Sets.Count < totalReportedSets)
            {
                var newSet = new Set { SetNumber = match.Sets.Count + 1, Match = match };
                match.Sets.Add(newSet);
            }

            // Process game segments (starting from index 4)
            for (int i = 4; i < parts.Length; i++)
            {
                int setIndex = i - 4;
                if (setIndex >= match.Sets.Count)
                    break;

                var set = match.Sets[setIndex];
                var segment = parts[i];

                // Parse game segment (format: "10" = player1: 1, player2: 0)
                if (
                    segment.Length != 2
                    || !int.TryParse(segment[0].ToString(), out int p1Games)
                    || !int.TryParse(segment[1].ToString(), out int p2Games)
                )
                {
                    _logger.LogWarning("Invalid game segment format: {Segment}", segment);
                    continue;
                }

                // Update set games
                set.Player1Games = p1Games;
                set.Player2Games = p2Games;

                // Automatically determine set winner if conditions met
                if (!set.IsCompleted)
                {
                    set.DetermineSetWinner();
                    if (set.IsCompleted)
                    {
                        set.EndTime = DateTime.UtcNow;
                    }
                }

                // Create games if needed
                while (set.Games.Count < Math.Max(p1Games, p2Games))
                {
                    var newGame = set.NewGame();
                    newGame.WinnerId = set.Games.Count < p1Games ? 1 : 2;
                    newGame.IsCompleted = true;
                }
            }

            // Update set completion states
            foreach (var set in match.Sets)
            {
                if (!set.IsCompleted && set.SetNumber <= totalReportedSets)
                {
                    set.StartTime ??= DateTime.UtcNow;
                    set.DetermineSetWinner();
                }
            }

            await dbContext.SaveChangesAsync();
            _logger.LogInformation("Successfully updated match {MatchId}", matchId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing WebSocket message");
        }
    }
}
