using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using TennisApp.Models;

namespace TennisApp.WebSockets
{
    public class WebSocketHandler
    {
        private readonly ILogger<WebSocketHandler> _logger;
        private readonly ConcurrentDictionary<string, WebSocket> _sockets = new();
        private readonly ConcurrentDictionary<string, HashSet<string>> _topics = new();
        private readonly IServiceProvider _serviceProvider;

        // List to track components that need to be notified of updates
        private readonly List<object> _subscribers = new();

        public WebSocketHandler(ILogger<WebSocketHandler> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        // Method to register Blazor components for updates
        public void RegisterForWebSocketUpdates(object subscriber)
        {
            if (!_subscribers.Contains(subscriber))
            {
                _subscribers.Add(subscriber);
                _logger.LogInformation(
                    $"Component registered for WebSocket updates: {subscriber.GetType().Name}"
                );
            }
        }

        // Method to unregister Blazor components
        public void UnregisterFromWebSocketUpdates(object subscriber)
        {
            if (_subscribers.Remove(subscriber))
            {
                _logger.LogInformation(
                    $"Component unregistered from WebSocket updates: {subscriber.GetType().Name}"
                );
            }
        }

        // Method to notify registered components about updates
        private async Task NotifySubscribersAsync()
        {
            foreach (var subscriber in _subscribers.ToList())
            {
                try
                {
                    // Using reflection to call the RefreshFromWebSocketEvent method
                    var method = subscriber.GetType().GetMethod("RefreshFromWebSocketEvent");
                    if (method != null)
                    {
                        _logger.LogInformation($"Notifying component: {subscriber.GetType().Name}");
                        var result = method.Invoke(subscriber, null);
                        if (result is Task task)
                        {
                            await task;
                        }
                        else
                        {
                            _logger.LogWarning(
                                "The method 'RefreshFromWebSocketEvent' did not return a Task."
                            );
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(
                        ex,
                        $"Error notifying subscriber: {subscriber.GetType().Name}"
                    );
                }
            }
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
                        
                    case "message":
                        // Process message for a topic
                        if (request.Topic == "live_score" && !string.IsNullOrEmpty(request.Message))
                        {
                            // Use service provider to resolve LiveScoreService at runtime
                            using var scope = _serviceProvider.CreateScope();
                            var liveScoreService = scope.ServiceProvider.GetRequiredService<LiveScoreService>();
                            await liveScoreService.ProcessMessageAsync(request.Message);
                            _logger.LogInformation($"Processed live_score message: {request.Message}");
                        }
                        else
                        {
                            _logger.LogWarning($"Unknown topic: '{request.Topic}' or message is empty");
                        }
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

            // Send initial data immediately after subscription
            if (topic == "court_availability" || topic == "live_score")
            {
                // Use Task.Run to avoid blocking the current thread
                _ = Task.Run(async () =>
                {
                    try
                    {
                        // Send the data to the newly subscribed client
                        await SendResourceDataAsync(socketId, topic);
                        _logger.LogInformation($"Sent initial {topic} data to socket {socketId}");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(
                            ex,
                            $"Error sending initial {topic} data to socket {socketId}"
                        );
                    }
                });
            }
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
            else if (topic == "live_score")
            {
                await SendLiveScoreDataAsync(socketId);
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

            _logger.LogInformation($"Sending {courts.Count} courts to client {socketId}");
            foreach (var court in courts)
            {
                _logger.LogInformation(
                    $"Court: {court.Id}, {court.Name}, Available: {court.IsAvailable}"
                );
            }

            await SendMessageToSocketAsync(socketId, "court_availability", courts);
        }
        
        private async Task SendLiveScoreDataAsync(string socketId)
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<Data.TennisAppContext>();

            var matches = await dbContext.Match
                .Include(m => m.Sets)
                .Select(m => new
                {
                    Id = m.Id,
                    m.Player1Name,
                    m.Player2Name,
                    Sets = m.Sets.Select(s => new
                    {
                        s.SetNumber,
                        s.Player1Games,
                        s.Player2Games,
                        s.IsCompleted,
                        s.WinnerId
                    }).ToList()
                })
                .ToListAsync();

            _logger.LogInformation($"Sending {matches.Count} matches to client {socketId}");
            
            await SendMessageToSocketAsync(socketId, "live_score", matches);
        }

        public virtual async Task BroadcastCourtAvailabilityAsync()
        {
            _logger.LogInformation("Starting court availability broadcast");

            // Step 1: Broadcast to WebSocket clients
            if (
                !_topics.TryGetValue("court_availability", out HashSet<string>? subscribers)
                || subscribers.Count == 0
            )
            {
                _logger.LogInformation("No WebSocket subscribers for court_availability topic");
            }
            else
            {
                _logger.LogInformation(
                    $"Found {subscribers.Count} WebSocket subscribers for court_availability"
                );

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

                _logger.LogInformation(
                    $"Broadcasting {courts.Count} courts to {subscribers.Count} WebSocket subscribers"
                );

                await SendMessageToTopicAsync("court_availability", courts);
                _logger.LogInformation("WebSocket broadcast completed");
            }

            // Step 2: Notify Blazor components
            if (_subscribers.Count > 0)
            {
                _logger.LogInformation(
                    $"Notifying {_subscribers.Count} registered Blazor components"
                );
                await NotifySubscribersAsync();
                _logger.LogInformation("Component notification completed");
            }
            else
            {
                _logger.LogInformation("No Blazor components registered for updates");
            }
        }

        public async Task SendMessageToTopicAsync(string topic, object data)
        {
            if (
                !_topics.TryGetValue(topic, out HashSet<string>? subscribers)
                || subscribers.Count == 0
            )
            {
                _logger.LogInformation($"No subscribers for topic {topic}, message not sent");
                return;
            }

            _logger.LogInformation(
                $"Preparing to send message to {subscribers.Count} subscribers for topic {topic}"
            );

            var message = new WebSocketMessage { Type = topic, Data = data };

            var serializedMessage = JsonSerializer.Serialize(message);
            _logger.LogInformation(
                $"Serialized message: {serializedMessage.Substring(0, Math.Min(500, serializedMessage.Length))}..."
            );

            var bytes = Encoding.UTF8.GetBytes(serializedMessage);

            var tasks = new List<Task>();
            int successCount = 0;

            foreach (var socketId in subscribers.ToList())
            {
                if (
                    _sockets.TryGetValue(socketId, out WebSocket? socket)
                    && socket.State == WebSocketState.Open
                )
                {
                    _logger.LogInformation($"Sending message to socket {socketId}");
                    tasks.Add(
                        socket
                            .SendAsync(
                                new ArraySegment<byte>(bytes, 0, bytes.Length),
                                WebSocketMessageType.Text,
                                true,
                                CancellationToken.None
                            )
                            .ContinueWith(t =>
                            {
                                if (t.IsCompletedSuccessfully)
                                {
                                    Interlocked.Increment(ref successCount);
                                    _logger.LogInformation(
                                        $"Successfully sent message to socket {socketId}"
                                    );
                                }
                                else if (t.IsFaulted)
                                {
                                    _logger.LogError(
                                        t.Exception,
                                        $"Failed to send message to socket {socketId}"
                                    );
                                }
                                return t;
                            })
                    );
                }
                else
                {
                    _logger.LogWarning(
                        $"Socket {socketId} is not available for sending (State: {socket?.State})"
                    );
                }
            }

            await Task.WhenAll(tasks);
            _logger.LogInformation(
                $"Completed sending message to {successCount} out of {subscribers.Count} subscribers"
            );
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
        
        [JsonPropertyName("message")]
        public string? Message { get; set; }
    }

    public class CourtAvailabilityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }
}