using System.Net.WebSockets;
using System.Threading.Tasks;

namespace TennisApp.WebSockets
{
    public interface IWebSocketHandler
    {
        Task BroadcastCourtAvailabilityAsync();
        Task HandleConnection(WebSocket webSocket, HttpContext context);
        void RegisterForWebSocketUpdates(object subscriber);
        void UnregisterFromWebSocketUpdates(object subscriber);
        void SubscribeToTopic(string socketId, string topic);
        void UnsubscribeFromTopic(string socketId, string topic);
        Task SendMessageToTopicAsync(string topic, object data);
        Task SendMessageToSocketAsync(string socketId, string type, object data);
    }
}
