using System;
using Microsoft.EntityFrameworkCore;


namespace TennisApp.Data;

public class TennisAppContext(DbContextOptions<TennisAppContext> options) : DbContext(options)
{
    public DbSet<TennisApp.Models.Player> Player { get; set; } = default!;
    public DbSet<TennisApp.Models.Match> Match { get; set; } = default!;
    public DbSet<TennisApp.Models.Court> Court { get; set; } = default!;
    public DbSet<TennisApp.Models.User> User { get; set; } = default!;
    public DbSet<TennisApp.Models.Club> Club { get; set; } = default!;
    public DbSet<TennisApp.Models.Scoreboard> Scoreboard { get; set; } = default!;
    public DbSet<TennisApp.Models.Set> Set { get; set; } = default!;
    public DbSet<TennisApp.Models.Venue> Venue { get; set; } = default!;

    public DbSet<TennisApp.Models.Game> Game { get; set; } = default!;

}
// dotnet aspnet-codegenerator blazor CRUD -dbProvider postgres -dc TennisApp.Data.TennisAppContext -m TennisApp -outDir Components/Pages
// dotnet tool install --global dotnet-aspnet-codegenerator
// dotnet tool install --global dotnet-ef
// dotnet tool install --global dotnet-aspnet-codegenerator --version 8.0.0
// dotnet tool install --global dotnet-ef --version 8.0.0
// echo 'export PATH="$PATH:/home/luka/.dotnet/tools"' >> ~/.zshrc

// dotnet aspnet-codegenerator blazor CRUD -dbProvider postgres -dc TennisApp.Data.TennisAppContext -m TennisApp.Models.Match -outDir Components/Pages
// dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design --version 8.0.0
// dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
// dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0
// dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore --version 8.0.0
// dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.0
// dotnet add package Microsoft.AspNetCore.Components.QuickGrid --version 8.0.0
// dotnet add package Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter --version 8.0.0
// dotnet ef migrations add InitialCreate
// dotnet ef database update