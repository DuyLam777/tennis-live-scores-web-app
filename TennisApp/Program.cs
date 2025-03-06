using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using TennisApp.Components;
using TennisApp.Data;

// This is necessary for the physical android device to connect to the server from the MAUI app
var builder = WebApplication.CreateBuilder(
    new WebApplicationOptions
    {
        Args = args,
        WebRootPath = "wwwroot",
        ContentRootPath = AppContext.BaseDirectory,
        EnvironmentName = Environments.Development,
    }
);

// Bind to all network interfaces
builder.WebHost.UseUrls("http://0.0.0.0:5020");

// Add services to the container.
builder.Services.AddRazorComponents().AddInteractiveServerComponents();

// Register the DbContext with PostgreSQL
builder.Services.AddDbContext<TennisAppContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddQuickGridEntityFrameworkAdapter();

// This is the SignalR service registration
builder.Services.AddSignalR();
builder.Services.AddResponseCompression(opts =>
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(["application/octet-stream"]);
});

var app = builder.Build();

// Use response compression
app.UseResponseCompression();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseStaticFiles();
app.UseAntiforgery();

// Enable WebSockets
app.UseWebSockets();

// Map WebSocket endpoint
app.Map(
    "/ws",
    async context =>
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await HandleWebSocketConnection(webSocket);
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
);

app.MapRazorComponents<App>().AddInteractiveServerRenderMode();

// WebSocket handler method (This will be moved to a separate class in the future)
async Task HandleWebSocketConnection(WebSocket webSocket)
{
    var buffer = new byte[1024 * 4];
    while (webSocket.State == WebSocketState.Open)
    {
        var result = await webSocket.ReceiveAsync(buffer, CancellationToken.None);
        if (result.MessageType == WebSocketMessageType.Text)
        {
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            Console.WriteLine($"Received: {message}");

            // Echo the message back for now
            await webSocket.SendAsync(
                buffer[..result.Count],
                WebSocketMessageType.Text,
                true,
                CancellationToken.None
            );
        }
        else if (result.MessageType == WebSocketMessageType.Close)
        {
            await webSocket.CloseAsync(
                WebSocketCloseStatus.NormalClosure,
                "Closing",
                CancellationToken.None
            );
        }
    }
}

// Ensure the database is dropped and recreated on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<TennisAppContext>();
        Console.WriteLine("Dropping and recreating the database...");
        context.Database.EnsureDeleted(); // Drop the database
        context.Database.EnsureCreated(); // Recreate the database
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while resetting the database: {ex.Message}");
    }
}

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        SeedData.Initialize(services);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred while seeding the database: {ex.Message}");
    }
}

app.Run();
