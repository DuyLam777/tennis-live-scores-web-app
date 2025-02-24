using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.Data
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new TennisAppContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<TennisAppContext>>());
            Console.WriteLine("DATA IS SEEDING");

            if (context == null)
            {
                throw new NullReferenceException("Null TennisAppContext");
            }

            // Ensure no data exists before seeding
            if (context.Club.Any() || context.Player.Any() || context.Court.Any() ||
                context.Match.Any() || context.Game.Any() || context.Set.Any() ||
                context.Scoreboard.Any() || context.User.Any() || context.Venue.Any())
            {
                Console.WriteLine("Database already seeded");
                return; // Data already seeded
            }

            // Seed Clubs
            var clubs = new List<Club>
            {
                new Club { Name = "Tennis Club A" },
                new Club { Name = "Tennis Club B" }
            };
            context.Club.AddRange(clubs);

            // Seed Players
            var players = new List<Player>
            {
                new Player
                {
                    Name = "John Doe",
                    Country = "USA",
                    DateOfBirth = new DateOnly(1990, 5, 15),
                    gender = Gender.Male
                },
                new Player
                {
                    Name = "Jane Smith",
                    Country = "Canada",
                    DateOfBirth = new DateOnly(1995, 8, 20),
                    gender = Gender.Female
                }
            };
            context.Player.AddRange(players);

            // Seed Courts
            var courts = new List<Court>
            {
                new Court
                {
                    Name = "Court 1",
                    IsIndoor = true,
                    IsOccupied = false
                },
                new Court
                {
                    Name = "Court 2",
                    IsIndoor = false,
                    IsOccupied = false
                }
            };
            context.Court.AddRange(courts);

            // Seed Venues
            var venues = new List<Venue>
            {
                new Venue
                {
                    Name = "Tennis Center A",
                    Address = "123 Tennis Lane"
                },
                new Venue
                {
                    Name = "Tennis Center B",
                    Address = "456 Sports Ave"
                }
            };
            context.Venue.AddRange(venues);

            // Seed Scoreboards
            var scoreboards = new List<Scoreboard>
            {
                new Scoreboard
                {
                    BatteryLevel = 100,
                    LastConnected = DateTime.UtcNow
                }
            };
            context.Scoreboard.AddRange(scoreboards);

            // Seed Matches
            var matches = new List<Match>
            {
                new Match
                {
                    Court = courts[0],
                    MatchTime = DateTime.UtcNow,
                    Player1 = players[0],
                    Player2 = players[1],
                    Scoreboard = scoreboards[0]
                }
            };
            context.Match.AddRange(matches);

            // Seed Sets
            var sets = new List<Set>
            {
                new Set
                {
                    Match = matches[0],
                    SetNumber = 1,
                    StartTime = DateTime.UtcNow
                }
            };
            context.Set.AddRange(sets);

            // Seed Games
            var games = new List<Game>
            {
                new Game
                {
                    PointsPlayer1 = new List<string> { "15", "30", "40" },
                    PointsPlayer2 = new List<string> { "15", "30" },
                    IsCompleted = false
                }
            };
            context.Game.AddRange(games);

            // Seed Users
            var users = new List<User>
            {
                new User
                {
                    Email = "player@example.com",
                    Password = "password123",
                    Role = UserRole.Player
                },
                new User
                {
                    Email = "admin@example.com",
                    Password = "admin123",
                    Role = UserRole.SystemAdmin
                }
            };
            context.User.AddRange(users);

            // Save all changes to the database
            context.SaveChanges();
        }
    }
}