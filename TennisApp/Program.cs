using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using TennisApp.Components;
using TennisApp.Data;
using TennisApp.Middleware;
using TennisApp.WebSockets;

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
builder.Services.AddControllers();

// Register the DbContext with PostgreSQL
builder.Services.AddDbContext<TennisAppContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Register the DbContextFactory with PostgreSQL - specify scoped lifetime
builder.Services.AddDbContextFactory<TennisAppContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")),
    ServiceLifetime.Scoped // Explicitly set to Scoped to match DbContext
);

builder.Services.AddQuickGridEntityFrameworkAdapter();

// Register HttpClient for components
builder.Services.AddHttpClient();
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("http://localhost:5020") });

// This is the SignalR service registration
builder.Services.AddSignalR();
builder.Services.AddResponseCompression(opts =>
{
    opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(["application/octet-stream"]);
});

// Register WebSocket services
builder.Services.AddSingleton<WebSocketHandler>();
builder.Services.AddSingleton<CourtAvailabilityService>();

var app = builder.Build();

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
app.UseWebSockets(new WebSocketOptions { KeepAliveInterval = TimeSpan.FromMinutes(2) });

app.UseMiddleware<WebSocketMiddleware>();

// Map WebSocket endpoint
app.Map(
    "/ws",
    async context =>
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            var handler = context.RequestServices.GetRequiredService<WebSocketHandler>();
            await handler.HandleConnection(webSocket, context);
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
);

app.MapRazorComponents<App>().AddInteractiveServerRenderMode();
app.MapControllers();

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
