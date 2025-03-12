using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.WebSockets
{
    public class CourtAvailabilityService
    {
        private readonly ILogger<CourtAvailabilityService> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly WebSocketHandler _webSocketHandler;

        public CourtAvailabilityService(
            ILogger<CourtAvailabilityService> logger,
            IServiceProvider serviceProvider,
            WebSocketHandler webSocketHandler
        )
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
            _webSocketHandler = webSocketHandler;
        }

        public async Task BroadcastCourtAvailabilityChangesAsync()
        {
            try
            {
                await _webSocketHandler.BroadcastCourtAvailabilityAsync();
                _logger.LogInformation(
                    "Court availability broadcast completed at {time}",
                    DateTime.Now
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error broadcasting court availability changes");
            }
        }
    }
}
