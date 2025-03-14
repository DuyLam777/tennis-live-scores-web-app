using System;
using Microsoft.EntityFrameworkCore;
using TennisApp.Models;

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

    public DbSet<TennisApp.Models.Tournament> Tournament { get; set; } = default!;
}
