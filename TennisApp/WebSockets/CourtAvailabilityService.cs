using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.WebSockets
{
    public class CourtAvailabilityService : BackgroundService
    {
        private readonly ILogger<CourtAvailabilityService> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly WebSocketHandler _webSocketHandler;
        private readonly TimeSpan _checkInterval = TimeSpan.FromSeconds(30);

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

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Court Availability Service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await CheckAndBroadcastCourtChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error checking court availability changes");
                }

                await Task.Delay(_checkInterval, stoppingToken);
            }

            _logger.LogInformation("Court Availability Service is stopping.");
        }

        private async Task CheckAndBroadcastCourtChangesAsync()
        {
            await _webSocketHandler.BroadcastCourtAvailabilityAsync();
            _logger.LogInformation(
                "Court availability broadcast completed at {time}",
                DateTime.Now
            );
        }
    }
}
