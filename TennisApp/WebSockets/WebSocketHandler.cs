using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using TennisApp.Models;

namespace TennisApp.WebSockets
{
    public class WebSocketHandler
    {
        private readonly ILogger<WebSocketHandler> _logger;
        private readonly ConcurrentDictionary<string, WebSocket> _sockets = new();
        private readonly ConcurrentDictionary<string, HashSet<string>> _topics = new();
        private readonly IServiceProvider _serviceProvider;

        public WebSocketHandler(ILogger<WebSocketHandler> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        public async Task HandleConnection(WebSocket webSocket, HttpContext context)
        {
            var socketId = Guid.NewGuid().ToString();
            _sockets.TryAdd(socketId, webSocket);
            _logger.LogInformation($"WebSocket connected: {socketId}");

            try
            {
                await ProcessWebSocketMessages(socketId, webSocket);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in WebSocket session {socketId}");
            }
            finally
            {
                await DisconnectSocket(socketId);
            }
        }

        private async Task ProcessWebSocketMessages(string socketId, WebSocket webSocket)
        {
            var buffer = new byte[4096];
            WebSocketReceiveResult result;

            while (webSocket.State == WebSocketState.Open)
            {
                try
                {
                    result = await webSocket.ReceiveAsync(
                        new ArraySegment<byte>(buffer),
                        CancellationToken.None
                    );

                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        await webSocket.CloseAsync(
                            WebSocketCloseStatus.NormalClosure,
                            "Client closed the connection",
                            CancellationToken.None
                        );
                        break;
                    }

                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        _logger.LogInformation($"Received message from {socketId}: {message}");

                        await HandleMessage(socketId, message);
                    }
                }
                catch (WebSocketException ex)
                {
                    _logger.LogWarning(ex, $"WebSocket error for {socketId}");
                    break;
                }
            }
        }

        private async Task HandleMessage(string socketId, string message)
        {
            try
            {
                var request = JsonSerializer.Deserialize<WebSocketRequest>(
                    message,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );

                if (request == null)
                    return;

                _logger.LogInformation($"Parsed action: {request.Action}, topic: {request.Topic}");

                switch (request.Action.ToLowerInvariant())
                {
                    case "subscribe":
                        SubscribeToTopic(socketId, request.Topic);
                        break;

                    case "unsubscribe":
                        UnsubscribeFromTopic(socketId, request.Topic);
                        break;

                    case "get":
                        await SendResourceDataAsync(socketId, request.Topic);
                        break;

                    default:
                        _logger.LogWarning($"Unknown action: '{request.Action}'");
                        break;
                }
            }
            catch (JsonException ex)
            {
                _logger.LogWarning(ex, $"Invalid WebSocket message format: {message}");
            }
        }

        private async Task DisconnectSocket(string socketId)
        {
            if (_sockets.TryRemove(socketId, out WebSocket? socket))
            {
                // Remove socket from all topics
                foreach (var topic in _topics)
                {
                    topic.Value.Remove(socketId);
                }

                _logger.LogInformation($"WebSocket disconnected: {socketId}");

                if (socket.State != WebSocketState.Closed && socket.State != WebSocketState.Aborted)
                {
                    await socket.CloseAsync(
                        WebSocketCloseStatus.NormalClosure,
                        "Server closing connection",
                        CancellationToken.None
                    );
                }
            }
        }

        public void SubscribeToTopic(string socketId, string topic)
        {
            var subscribers = _topics.GetOrAdd(topic, _ => new HashSet<string>());
            subscribers.Add(socketId);
            _logger.LogInformation($"Socket {socketId} subscribed to {topic}");
        }

        public void UnsubscribeFromTopic(string socketId, string topic)
        {
            if (_topics.TryGetValue(topic, out HashSet<string>? subscribers))
            {
                subscribers.Remove(socketId);
                _logger.LogInformation($"Socket {socketId} unsubscribed from {topic}");
            }
        }

        private async Task SendResourceDataAsync(string socketId, string topic)
        {
            if (topic == "court_availability")
            {
                await SendCourtAvailabilityAsync(socketId);
            }
        }

        private async Task SendCourtAvailabilityAsync(string socketId)
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<Data.TennisAppContext>();

            var courts = dbContext
                .Court.Select(court => new CourtAvailabilityDto
                {
                    Id = court.Id,
                    Name = court.Name ?? string.Empty,
                    IsAvailable = !court.IsOccupied,
                })
                .ToList();

            await SendMessageToSocketAsync(socketId, "court_availability", courts);
        }

        public async Task BroadcastCourtAvailabilityAsync()
        {
            if (
                !_topics.TryGetValue("court_availability", out HashSet<string>? subscribers)
                || subscribers.Count == 0
            )
            {
                return; // No subscribers, no need to broadcast
            }

            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<Data.TennisAppContext>();

            var courts = dbContext
                .Court.Select(court => new CourtAvailabilityDto
                {
                    Id = court.Id,
                    Name = court.Name ?? string.Empty,
                    IsAvailable = !court.IsOccupied,
                })
                .ToList();

            await SendMessageToTopicAsync("court_availability", courts);
        }

        public async Task SendMessageToTopicAsync(string topic, object data)
        {
            if (
                !_topics.TryGetValue(topic, out HashSet<string>? subscribers)
                || subscribers.Count == 0
            )
            {
                return;
            }

            var message = new WebSocketMessage { Type = topic, Data = data };

            var serializedMessage = JsonSerializer.Serialize(message);
            var bytes = Encoding.UTF8.GetBytes(serializedMessage);

            var tasks = new List<Task>();
            foreach (var socketId in subscribers.ToList()) // Create a copy of the collection to avoid modification during iteration
            {
                if (
                    _sockets.TryGetValue(socketId, out WebSocket? socket)
                    && socket.State == WebSocketState.Open
                )
                {
                    tasks.Add(
                        socket.SendAsync(
                            new ArraySegment<byte>(bytes, 0, bytes.Length),
                            WebSocketMessageType.Text,
                            true,
                            CancellationToken.None
                        )
                    );
                }
            }

            await Task.WhenAll(tasks);
        }

        public async Task SendMessageToSocketAsync(string socketId, string type, object data)
        {
            if (
                !_sockets.TryGetValue(socketId, out WebSocket? socket)
                || socket.State != WebSocketState.Open
            )
            {
                return;
            }

            var message = new WebSocketMessage { Type = type, Data = data };

            var serializedMessage = JsonSerializer.Serialize(message);
            var bytes = Encoding.UTF8.GetBytes(serializedMessage);

            await socket.SendAsync(
                new ArraySegment<byte>(bytes, 0, bytes.Length),
                WebSocketMessageType.Text,
                true,
                CancellationToken.None
            );
        }
    }

    public class WebSocketMessage
    {
        public string Type { get; set; } = string.Empty;
        public object? Data { get; set; }
    }

    public class WebSocketRequest
    {
        [JsonPropertyName("action")]
        public string Action { get; set; } = string.Empty;

        [JsonPropertyName("topic")]
        public string Topic { get; set; } = string.Empty;
    }

    public class CourtAvailabilityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }
}
