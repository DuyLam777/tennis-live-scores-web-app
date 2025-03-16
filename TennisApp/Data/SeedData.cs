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
                serviceProvider.GetRequiredService<DbContextOptions<TennisAppContext>>()
            );
            Console.WriteLine("DATA IS SEEDING");

            if (context == null)
            {
                throw new NullReferenceException("Null TennisAppContext");
            }

            // Ensure no data exists before seeding
            if (
                context.Club.Any()
                || context.Player.Any()
                || context.Court.Any()
                || context.Match.Any()
                || context.Game.Any()
                || context.Set.Any()
                || context.Scoreboard.Any()
                || context.User.Any()
                || context.Venue.Any()
                || context.Tournament.Any()
            )
            {
                Console.WriteLine("Database already seeded");
                return; // Data already seeded
            }

            // Seed Clubs
            var clubs = new List<Club>
            {
                new Club { Name = "Tennis Club A" },
                new Club { Name = "Tennis Club B" },
                new Club { Name = "Riverside Tennis Club" },
                new Club { Name = "Downtown Tennis Academy" },
            };
            context.Club.AddRange(clubs);

            // Seed Players - Extended list
            var players = new List<Player>
            {
                new Player
                {
                    Name = "John Doe",
                    Country = "USA",
                    DateOfBirth = new DateOnly(1990, 5, 15),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Jane Smith",
                    Country = "Canada",
                    DateOfBirth = new DateOnly(1995, 8, 20),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Michael Johnson",
                    Country = "USA",
                    DateOfBirth = new DateOnly(1988, 3, 10),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Emma Williams",
                    Country = "UK",
                    DateOfBirth = new DateOnly(1992, 9, 5),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Carlos Rodriguez",
                    Country = "Spain",
                    DateOfBirth = new DateOnly(1994, 7, 12),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Sofia Chen",
                    Country = "China",
                    DateOfBirth = new DateOnly(1996, 11, 28),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Alexander Miller",
                    Country = "Germany",
                    DateOfBirth = new DateOnly(1991, 2, 18),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Olivia Brown",
                    Country = "Australia",
                    DateOfBirth = new DateOnly(1993, 4, 30),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Rafael Gomez",
                    Country = "Argentina",
                    DateOfBirth = new DateOnly(1989, 6, 22),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Naomi Tanaka",
                    Country = "Japan",
                    DateOfBirth = new DateOnly(1994, 12, 3),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Lucas Martin",
                    Country = "France",
                    DateOfBirth = new DateOnly(1992, 8, 14),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Isabella Rossi",
                    Country = "Italy",
                    DateOfBirth = new DateOnly(1996, 3, 9),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Liam Wilson",
                    Country = "New Zealand",
                    DateOfBirth = new DateOnly(1990, 11, 17),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Ana Costa",
                    Country = "Brazil",
                    DateOfBirth = new DateOnly(1993, 7, 25),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Felix Hansen",
                    Country = "Sweden",
                    DateOfBirth = new DateOnly(1991, 4, 12),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Marina Petrova",
                    Country = "Russia",
                    DateOfBirth = new DateOnly(1995, 2, 28),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "David Kim",
                    Country = "South Korea",
                    DateOfBirth = new DateOnly(1993, 9, 15),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Serena Davis",
                    Country = "USA",
                    DateOfBirth = new DateOnly(1992, 5, 7),
                    gender = Gender.Female,
                },
                new Player
                {
                    Name = "Andres Gonzalez",
                    Country = "Mexico",
                    DateOfBirth = new DateOnly(1994, 1, 20),
                    gender = Gender.Male,
                },
                new Player
                {
                    Name = "Priya Sharma",
                    Country = "India",
                    DateOfBirth = new DateOnly(1996, 10, 5),
                    gender = Gender.Female,
                },
            };
            context.Player.AddRange(players);
            context.SaveChanges(); // Save players to get their IDs

            // Seed Courts - Extended list
            var courts = new List<Court>
            {
                new Court
                {
                    Name = "Court 1",
                    IsIndoor = true,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Court 2",
                    IsIndoor = false,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Court 3",
                    IsIndoor = true,
                    IsOccupied = true,
                },
                new Court
                {
                    Name = "Center Court",
                    IsIndoor = false,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Clay Court 1",
                    IsIndoor = false,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Indoor Practice Court",
                    IsIndoor = true,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Clay Court 2",
                    IsIndoor = false,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Clay Court 3",
                    IsIndoor = false,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Hard Court 1",
                    IsIndoor = false,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Hard Court 2",
                    IsIndoor = false,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Indoor Court 1",
                    IsIndoor = true,
                    IsOccupied = false,
                },
                new Court
                {
                    Name = "Indoor Court 2",
                    IsIndoor = true,
                    IsOccupied = false,
                },
            };
            context.Court.AddRange(courts);

            // Seed Venues - Extended list
            var venues = new List<Venue>
            {
                new Venue { Name = "Tennis Center A", Address = "123 Tennis Lane" },
                new Venue { Name = "Tennis Center B", Address = "456 Sports Ave" },
                new Venue { Name = "Riverside Sports Complex", Address = "789 River Road" },
                new Venue { Name = "Central Stadium", Address = "101 Main Street" },
            };
            context.Venue.AddRange(venues);

            // Link courts to venues
            courts[0].IsOccupied = true;
            courts[3].IsOccupied = true;

            // Seed Scoreboards - Extended list
            var scoreboards = new List<Scoreboard>
            {
                new Scoreboard { BatteryLevel = 100, LastConnected = DateTime.UtcNow },
                new Scoreboard { BatteryLevel = 85, LastConnected = DateTime.UtcNow.AddHours(-2) },
                new Scoreboard { BatteryLevel = 92, LastConnected = DateTime.UtcNow.AddHours(-1) },
                new Scoreboard { BatteryLevel = 76, LastConnected = DateTime.UtcNow.AddHours(-3) },
                new Scoreboard
                {
                    BatteryLevel = 88,
                    LastConnected = DateTime.UtcNow.AddMinutes(-45),
                },
                new Scoreboard
                {
                    BatteryLevel = 95,
                    LastConnected = DateTime.UtcNow.AddMinutes(-15),
                },
                new Scoreboard
                {
                    BatteryLevel = 82,
                    LastConnected = DateTime.UtcNow.AddMinutes(-30),
                },
                new Scoreboard
                {
                    BatteryLevel = 78,
                    LastConnected = DateTime.UtcNow.AddHours(-1.5),
                },
                new Scoreboard
                {
                    BatteryLevel = 90,
                    LastConnected = DateTime.UtcNow.AddMinutes(-10),
                },
                new Scoreboard { BatteryLevel = 65, LastConnected = DateTime.UtcNow.AddHours(-4) },
                new Scoreboard
                {
                    BatteryLevel = 87,
                    LastConnected = DateTime.UtcNow.AddMinutes(-25),
                },
                new Scoreboard
                {
                    BatteryLevel = 93,
                    LastConnected = DateTime.UtcNow.AddMinutes(-5),
                },
            };
            context.Scoreboard.AddRange(scoreboards);

            // Seed Users - Extended list
            var users = new List<User>
            {
                new User
                {
                    Email = "player@example.com",
                    Password = "password123",
                    Role = UserRole.Player,
                },
                new User
                {
                    Email = "admin@example.com",
                    Password = "admin123",
                    Role = UserRole.SystemAdmin,
                },
                new User
                {
                    Email = "club@example.com",
                    Password = "club123",
                    Role = UserRole.Club,
                },
                new User
                {
                    Email = "player2@example.com",
                    Password = "tennis456",
                    Role = UserRole.Player,
                },
            };
            context.User.AddRange(users);

            // Seed Tournaments - Extended list
            var now = DateTime.UtcNow;
            var tournaments = new List<Tournament>
            {
                new Tournament
                {
                    Name = "Tournament A",
                    StartDate = now.AddDays(14),
                    EndDate = now.AddDays(21),
                    Host = clubs[0],
                    HostId = clubs[0].Id,
                    Description = "Annual singles tournament with great prizes",
                    Status = TournamentStatus.Upcoming,
                    MaxParticipants = 16,
                    Type = TournamentType.Singles,
                },
                new Tournament
                {
                    Name = "Tournament B",
                    StartDate = now.AddDays(7),
                    EndDate = now.AddDays(14),
                    Host = clubs[1],
                    HostId = clubs[1].Id,
                    Description = "Mixed doubles tournament for all skill levels",
                    Status = TournamentStatus.Upcoming,
                    MaxParticipants = 32,
                    Type = TournamentType.Doubles,
                },
                new Tournament
                {
                    Name = "Spring Championships",
                    StartDate = now.AddDays(-21),
                    EndDate = now.AddDays(-14),
                    Host = clubs[2],
                    HostId = clubs[2].Id,
                    Description = "Completed championship tournament",
                    Status = TournamentStatus.Completed,
                    MaxParticipants = 24,
                    Type = TournamentType.Singles,
                    WinnerId = players[0].Id,
                    Winner = players[0],
                },
                new Tournament
                {
                    Name = "Summer Open",
                    StartDate = now.AddDays(-3),
                    EndDate = now.AddDays(4),
                    Host = clubs[3],
                    HostId = clubs[3].Id,
                    Description = "Ongoing prestigious tournament",
                    Status = TournamentStatus.Ongoing,
                    MaxParticipants = 24,
                    Type = TournamentType.Singles,
                },
            };
            context.Tournament.AddRange(tournaments);
            context.SaveChanges(); // Save changes to generate IDs

            // Seed Matches - Including past, ongoing and upcoming
            var matches = new List<Match>();

            // PAST MATCHES (Completed)
            var pastMatch1 = new Match
            {
                Court = courts[0],
                CourtId = courts[0].Id,
                MatchTime = now.AddDays(-10),
                Player1 = players[0], // John Doe
                Player1Id = players[0].Id,
                Player2 = players[2], // Michael Johnson
                Player2Id = players[2].Id,
                Scoreboard = scoreboards[0],
                ScoreboardId = scoreboards[0].Id,
                TournamentId = tournaments[2].Id, // Spring Championships (completed)
            };
            matches.Add(pastMatch1);

            var pastMatch2 = new Match
            {
                Court = courts[1],
                CourtId = courts[1].Id,
                MatchTime = now.AddDays(-8),
                Player1 = players[1], // Jane Smith
                Player1Id = players[1].Id,
                Player2 = players[3], // Emma Williams
                Player2Id = players[3].Id,
                Scoreboard = scoreboards[1],
                ScoreboardId = scoreboards[1].Id,
                TournamentId = tournaments[2].Id, // Spring Championships (completed)
            };
            matches.Add(pastMatch2);

            var pastMatch3 = new Match
            {
                Court = courts[2],
                CourtId = courts[2].Id,
                MatchTime = now.AddDays(-5),
                Player1 = players[4], // Carlos Rodriguez
                Player1Id = players[4].Id,
                Player2 = players[6], // Alexander Miller
                Player2Id = players[6].Id,
                Scoreboard = scoreboards[2],
                ScoreboardId = scoreboards[2].Id,
            };
            matches.Add(pastMatch3);

            // ONGOING MATCHES (Today's matches in progress)
            var ongoingMatch1 = new Match
            {
                Court = courts[3],
                CourtId = courts[3].Id,
                MatchTime = now.AddHours(-2),
                Player1 = players[0], // John Doe
                Player1Id = players[0].Id,
                Player2 = players[4], // Carlos Rodriguez
                Player2Id = players[4].Id,
                Scoreboard = scoreboards[3],
                ScoreboardId = scoreboards[3].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(ongoingMatch1);

            var ongoingMatch2 = new Match
            {
                Court = courts[4],
                CourtId = courts[4].Id,
                MatchTime = now.AddHours(-1),
                Player1 = players[3], // Emma Williams
                Player1Id = players[3].Id,
                Player2 = players[5], // Sofia Chen
                Player2Id = players[5].Id,
                Scoreboard = scoreboards[4],
                ScoreboardId = scoreboards[4].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(ongoingMatch2);

            // UPCOMING MATCHES (Future schedule)
            var upcomingMatch1 = new Match
            {
                Court = courts[0],
                CourtId = courts[0].Id,
                MatchTime = now.AddDays(1),
                Player1 = players[2], // Michael Johnson
                Player1Id = players[2].Id,
                Player2 = players[6], // Alexander Miller
                Player2Id = players[6].Id,
                Scoreboard = scoreboards[0],
                ScoreboardId = scoreboards[0].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(upcomingMatch1);

            var upcomingMatch2 = new Match
            {
                Court = courts[1],
                CourtId = courts[1].Id,
                MatchTime = now.AddDays(1).AddHours(3),
                Player1 = players[1], // Jane Smith
                Player1Id = players[1].Id,
                Player2 = players[7], // Olivia Brown
                Player2Id = players[7].Id,
                Scoreboard = scoreboards[1],
                ScoreboardId = scoreboards[1].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(upcomingMatch2);

            var upcomingMatch3 = new Match
            {
                Court = courts[0],
                CourtId = courts[0].Id,
                MatchTime = now.AddDays(15),
                Player1 = players[0], // John Doe
                Player1Id = players[0].Id,
                Player2 = players[6], // Alexander Miller
                Player2Id = players[6].Id,
                Scoreboard = scoreboards[0],
                ScoreboardId = scoreboards[0].Id,
                TournamentId = tournaments[0].Id, // Tournament A (upcoming)
            };
            matches.Add(upcomingMatch3);

            var upcomingMatch4 = new Match
            {
                Court = courts[1],
                CourtId = courts[1].Id,
                MatchTime = now.AddDays(16),
                Player1 = players[2], // Michael Johnson
                Player1Id = players[2].Id,
                Player2 = players[4], // Carlos Rodriguez
                Player2Id = players[4].Id,
                Scoreboard = scoreboards[1],
                ScoreboardId = scoreboards[1].Id,
                TournamentId = tournaments[0].Id, // Tournament A (upcoming)
            };
            matches.Add(upcomingMatch4);

            // Add 8 more ONGOING matches (for total of 10)
            var ongoingMatch3 = new Match
            {
                Court = courts[6], // Clay Court 2
                CourtId = courts[6].Id,
                MatchTime = now.AddHours(-3),
                Player1 = players[8], // Rafael Gomez
                Player1Id = players[8].Id,
                Player2 = players[10], // Lucas Martin
                Player2Id = players[10].Id,
                Scoreboard = scoreboards[5],
                ScoreboardId = scoreboards[5].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(ongoingMatch3);

            var ongoingMatch4 = new Match
            {
                Court = courts[7], // Clay Court 3
                CourtId = courts[7].Id,
                MatchTime = now.AddHours(-2.5),
                Player1 = players[9], // Naomi Tanaka
                Player1Id = players[9].Id,
                Player2 = players[11], // Isabella Rossi
                Player2Id = players[11].Id,
                Scoreboard = scoreboards[6],
                ScoreboardId = scoreboards[6].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(ongoingMatch4);

            var ongoingMatch5 = new Match
            {
                Court = courts[8], // Hard Court 1
                CourtId = courts[8].Id,
                MatchTime = now.AddHours(-1.5),
                Player1 = players[12], // Liam Wilson
                Player1Id = players[12].Id,
                Player2 = players[16], // David Kim
                Player2Id = players[16].Id,
                Scoreboard = scoreboards[7],
                ScoreboardId = scoreboards[7].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(ongoingMatch5);

            var ongoingMatch6 = new Match
            {
                Court = courts[9], // Hard Court 2
                CourtId = courts[9].Id,
                MatchTime = now.AddHours(-1),
                Player1 = players[13], // Ana Costa
                Player1Id = players[13].Id,
                Player2 = players[17], // Serena Davis
                Player2Id = players[17].Id,
                Scoreboard = scoreboards[8],
                ScoreboardId = scoreboards[8].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(ongoingMatch6);

            var ongoingMatch7 = new Match
            {
                Court = courts[10], // Indoor Court 1
                CourtId = courts[10].Id,
                MatchTime = now.AddHours(-2),
                Player1 = players[14], // Felix Hansen
                Player1Id = players[14].Id,
                Player2 = players[18], // Andres Gonzalez
                Player2Id = players[18].Id,
                Scoreboard = scoreboards[9],
                ScoreboardId = scoreboards[9].Id,
            };
            matches.Add(ongoingMatch7);

            var ongoingMatch8 = new Match
            {
                Court = courts[11], // Indoor Court 2
                CourtId = courts[11].Id,
                MatchTime = now.AddHours(-1.75),
                Player1 = players[15], // Marina Petrova
                Player1Id = players[15].Id,
                Player2 = players[19], // Priya Sharma
                Player2Id = players[19].Id,
                Scoreboard = scoreboards[10],
                ScoreboardId = scoreboards[10].Id,
            };
            matches.Add(ongoingMatch8);

            var ongoingMatch9 = new Match
            {
                Court = courts[5], // Indoor Practice Court
                CourtId = courts[5].Id,
                MatchTime = now.AddHours(-0.5),
                Player1 = players[1], // Jane Smith
                Player1Id = players[1].Id,
                Player2 = players[5], // Sofia Chen
                Player2Id = players[5].Id,
                Scoreboard = scoreboards[11],
                ScoreboardId = scoreboards[11].Id,
            };
            matches.Add(ongoingMatch9);

            var ongoingMatch10 = new Match
            {
                Court = courts[2], // Court 3
                CourtId = courts[2].Id,
                MatchTime = now.AddHours(-1.25),
                Player1 = players[6], // Alexander Miller
                Player1Id = players[6].Id,
                Player2 = players[10], // Lucas Martin
                Player2Id = players[10].Id,
                Scoreboard = scoreboards[0],
                ScoreboardId = scoreboards[0].Id,
            };
            matches.Add(ongoingMatch10);

            // Add 6 more UPCOMING matches (for total of 10)
            var upcomingMatch5 = new Match
            {
                Court = courts[0], // Court 1
                CourtId = courts[0].Id,
                MatchTime = now.AddDays(2),
                Player1 = players[12], // Liam Wilson
                Player1Id = players[12].Id,
                Player2 = players[18], // Andres Gonzalez
                Player2Id = players[18].Id,
                Scoreboard = scoreboards[1],
                ScoreboardId = scoreboards[1].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(upcomingMatch5);

            var upcomingMatch6 = new Match
            {
                Court = courts[3], // Center Court
                CourtId = courts[3].Id,
                MatchTime = now.AddDays(2).AddHours(3),
                Player1 = players[8], // Rafael Gomez
                Player1Id = players[8].Id,
                Player2 = players[14], // Felix Hansen
                Player2Id = players[14].Id,
                Scoreboard = scoreboards[2],
                ScoreboardId = scoreboards[2].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(upcomingMatch6);

            var upcomingMatch7 = new Match
            {
                Court = courts[6], // Clay Court 2
                CourtId = courts[6].Id,
                MatchTime = now.AddDays(3),
                Player1 = players[9], // Naomi Tanaka
                Player1Id = players[9].Id,
                Player2 = players[15], // Marina Petrova
                Player2Id = players[15].Id,
                Scoreboard = scoreboards[3],
                ScoreboardId = scoreboards[3].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(upcomingMatch7);

            var upcomingMatch8 = new Match
            {
                Court = courts[0], // Court 1
                CourtId = courts[0].Id,
                MatchTime = now.AddDays(17),
                Player1 = players[8], // Rafael Gomez
                Player1Id = players[8].Id,
                Player2 = players[16], // David Kim
                Player2Id = players[16].Id,
                Scoreboard = scoreboards[4],
                ScoreboardId = scoreboards[4].Id,
                TournamentId = tournaments[0].Id, // Tournament A (upcoming)
            };
            matches.Add(upcomingMatch8);

            var upcomingMatch9 = new Match
            {
                Court = courts[4], // Clay Court 1
                CourtId = courts[4].Id,
                MatchTime = now.AddDays(18),
                Player1 = players[10], // Lucas Martin
                Player1Id = players[10].Id,
                Player2 = players[18], // Andres Gonzalez
                Player2Id = players[18].Id,
                Scoreboard = scoreboards[5],
                ScoreboardId = scoreboards[5].Id,
                TournamentId = tournaments[0].Id, // Tournament A (upcoming)
            };
            matches.Add(upcomingMatch9);

            var upcomingMatch10 = new Match
            {
                Court = courts[3], // Center Court
                CourtId = courts[3].Id,
                MatchTime = now.AddDays(8),
                Player1 = players[11], // Isabella Rossi
                Player1Id = players[11].Id,
                Player2 = players[17], // Serena Davis
                Player2Id = players[17].Id,
                Scoreboard = scoreboards[6],
                ScoreboardId = scoreboards[6].Id,
                TournamentId = tournaments[1].Id, // Tournament B (upcoming)
            };
            matches.Add(upcomingMatch10);

            // ABOUT TO START (match starting in 5 minutes)
            var aboutToStartMatch = new Match
            {
                Court = courts[1], // Court 2
                CourtId = courts[1].Id,
                MatchTime = now.AddMinutes(5), // Starting in 5 minutes
                Player1 = players[7], // Olivia Brown
                Player1Id = players[7].Id,
                Player2 = players[19], // Priya Sharma
                Player2Id = players[19].Id,
                Scoreboard = scoreboards[5],
                ScoreboardId = scoreboards[5].Id,
                TournamentId = tournaments[3].Id, // Summer Open (ongoing)
            };
            matches.Add(aboutToStartMatch);

            context.Match.AddRange(matches);
            context.SaveChanges(); // Save matches to generate IDs

            // Add Sets and Games for PAST matches (completed)
            // Past Match 1: 2-0 (6-4, 6-2)
            var pastMatch1Set1 = new Set
            {
                Match = pastMatch1,
                SetNumber = 1,
                StartTime = pastMatch1.MatchTime.AddMinutes(5),
                EndTime = pastMatch1.MatchTime.AddMinutes(55),
                Player1Games = 6,
                Player2Games = 4,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(pastMatch1Set1);

            var pastMatch1Set2 = new Set
            {
                Match = pastMatch1,
                SetNumber = 2,
                StartTime = pastMatch1.MatchTime.AddMinutes(60),
                EndTime = pastMatch1.MatchTime.AddMinutes(100),
                Player1Games = 6,
                Player2Games = 2,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(pastMatch1Set2);

            // Add sample games for past match 1
            var pastMatch1Set1Game1 = new Game
            {
                PointsPlayer1 = new List<string> { "15", "30", "40" },
                PointsPlayer2 = new List<string> { "0", "15", "30" },
                IsCompleted = true,
                WinnerId = 1,
            };
            pastMatch1Set1.Games.Add(pastMatch1Set1Game1);

            // Past Match 2: 2-1 (6-3, 4-6, 6-4)
            var pastMatch2Set1 = new Set
            {
                Match = pastMatch2,
                SetNumber = 1,
                StartTime = pastMatch2.MatchTime.AddMinutes(5),
                EndTime = pastMatch2.MatchTime.AddMinutes(50),
                Player1Games = 6,
                Player2Games = 3,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(pastMatch2Set1);

            var pastMatch2Set2 = new Set
            {
                Match = pastMatch2,
                SetNumber = 2,
                StartTime = pastMatch2.MatchTime.AddMinutes(55),
                EndTime = pastMatch2.MatchTime.AddMinutes(100),
                Player1Games = 4,
                Player2Games = 6,
                IsCompleted = true,
                WinnerId = 2,
            };
            context.Set.Add(pastMatch2Set2);

            var pastMatch2Set3 = new Set
            {
                Match = pastMatch2,
                SetNumber = 3,
                StartTime = pastMatch2.MatchTime.AddMinutes(105),
                EndTime = pastMatch2.MatchTime.AddMinutes(170),
                Player1Games = 6,
                Player2Games = 4,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(pastMatch2Set3);

            // Past Match 3: 0-2 (3-6, 2-6)
            var pastMatch3Set1 = new Set
            {
                Match = pastMatch3,
                SetNumber = 1,
                StartTime = pastMatch3.MatchTime.AddMinutes(5),
                EndTime = pastMatch3.MatchTime.AddMinutes(45),
                Player1Games = 3,
                Player2Games = 6,
                IsCompleted = true,
                WinnerId = 2,
            };
            context.Set.Add(pastMatch3Set1);

            var pastMatch3Set2 = new Set
            {
                Match = pastMatch3,
                SetNumber = 2,
                StartTime = pastMatch3.MatchTime.AddMinutes(50),
                EndTime = pastMatch3.MatchTime.AddMinutes(85),
                Player1Games = 2,
                Player2Games = 6,
                IsCompleted = true,
                WinnerId = 2,
            };
            context.Set.Add(pastMatch3Set2);

            // ONGOING matches (in progress)
            // Ongoing Match 1: 1-0, third set in progress (6-4, 3-6, 2-3)
            var ongoingMatch1Set1 = new Set
            {
                Match = ongoingMatch1,
                SetNumber = 1,
                StartTime = ongoingMatch1.MatchTime.AddMinutes(5),
                EndTime = ongoingMatch1.MatchTime.AddMinutes(60),
                Player1Games = 6,
                Player2Games = 4,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(ongoingMatch1Set1);

            var ongoingMatch1Set2 = new Set
            {
                Match = ongoingMatch1,
                SetNumber = 2,
                StartTime = ongoingMatch1.MatchTime.AddMinutes(65),
                EndTime = ongoingMatch1.MatchTime.AddMinutes(120),
                Player1Games = 3,
                Player2Games = 6,
                IsCompleted = true,
                WinnerId = 2,
            };
            context.Set.Add(ongoingMatch1Set2);

            var ongoingMatch1Set3 = new Set
            {
                Match = ongoingMatch1,
                SetNumber = 3,
                StartTime = ongoingMatch1.MatchTime.AddMinutes(125),
                Player1Games = 2,
                Player2Games = 3,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch1Set3);

            // Current game in progress
            var currentGame = new Game
            {
                PointsPlayer1 = new List<string> { "15" },
                PointsPlayer2 = new List<string> { "15", "30" },
                IsCompleted = false,
            };
            ongoingMatch1Set3.Games.Add(currentGame);

            // Ongoing Match 2: First set in progress (4-3)
            var ongoingMatch2Set1 = new Set
            {
                Match = ongoingMatch2,
                SetNumber = 1,
                StartTime = ongoingMatch2.MatchTime.AddMinutes(5),
                Player1Games = 4,
                Player2Games = 3,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch2Set1);

            var ongoingMatch2CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "15", "30", "40" },
                PointsPlayer2 = new List<string> { "15", "30" },
                IsCompleted = false,
            };
            ongoingMatch2Set1.Games.Add(ongoingMatch2CurrentGame);

            // Ongoing Match 3: First set in progress (1-2)
            var ongoingMatch3Set1 = new Set
            {
                Match = ongoingMatch3,
                SetNumber = 1,
                StartTime = ongoingMatch3.MatchTime.AddMinutes(5),
                Player1Games = 1,
                Player2Games = 2,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch3Set1);

            var ongoingMatch3CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "0" },
                PointsPlayer2 = new List<string> { "15" },
                IsCompleted = false,
            };
            ongoingMatch3Set1.Games.Add(ongoingMatch3CurrentGame);

            // Ongoing Match 4: Second set in progress (6-3, 2-4)
            var ongoingMatch4Set1 = new Set
            {
                Match = ongoingMatch4,
                SetNumber = 1,
                StartTime = ongoingMatch4.MatchTime.AddMinutes(5),
                EndTime = ongoingMatch4.MatchTime.AddMinutes(65),
                Player1Games = 6,
                Player2Games = 3,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(ongoingMatch4Set1);

            var ongoingMatch4Set2 = new Set
            {
                Match = ongoingMatch4,
                SetNumber = 2,
                StartTime = ongoingMatch4.MatchTime.AddMinutes(70),
                Player1Games = 2,
                Player2Games = 4,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch4Set2);

            var ongoingMatch4CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "15", "30" },
                PointsPlayer2 = new List<string> { "15", "30", "40" },
                IsCompleted = false,
            };
            ongoingMatch4Set2.Games.Add(ongoingMatch4CurrentGame);

            // Ongoing Match 5: First set in progress (5-5)
            var ongoingMatch5Set1 = new Set
            {
                Match = ongoingMatch5,
                SetNumber = 1,
                StartTime = ongoingMatch5.MatchTime.AddMinutes(5),
                Player1Games = 5,
                Player2Games = 5,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch5Set1);

            var ongoingMatch5CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "15", "30", "40" },
                PointsPlayer2 = new List<string> { "0" },
                IsCompleted = false,
            };
            ongoingMatch5Set1.Games.Add(ongoingMatch5CurrentGame);

            // Ongoing Match 6: Third set in progress (7-6, 4-6, 1-0)
            var ongoingMatch6Set1 = new Set
            {
                Match = ongoingMatch6,
                SetNumber = 1,
                StartTime = ongoingMatch6.MatchTime.AddMinutes(5),
                EndTime = ongoingMatch6.MatchTime.AddMinutes(75),
                Player1Games = 7,
                Player2Games = 6,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(ongoingMatch6Set1);

            var ongoingMatch6Set2 = new Set
            {
                Match = ongoingMatch6,
                SetNumber = 2,
                StartTime = ongoingMatch6.MatchTime.AddMinutes(80),
                EndTime = ongoingMatch6.MatchTime.AddMinutes(135),
                Player1Games = 4,
                Player2Games = 6,
                IsCompleted = true,
                WinnerId = 2,
            };
            context.Set.Add(ongoingMatch6Set2);

            var ongoingMatch6Set3 = new Set
            {
                Match = ongoingMatch6,
                SetNumber = 3,
                StartTime = ongoingMatch6.MatchTime.AddMinutes(140),
                Player1Games = 1,
                Player2Games = 0,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch6Set3);

            var ongoingMatch6CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "15" },
                PointsPlayer2 = new List<string> { "0" },
                IsCompleted = false,
            };
            ongoingMatch6Set3.Games.Add(ongoingMatch6CurrentGame);

            // Ongoing Match 7: Second set in progress (6-2, 3-3)
            var ongoingMatch7Set1 = new Set
            {
                Match = ongoingMatch7,
                SetNumber = 1,
                StartTime = ongoingMatch7.MatchTime.AddMinutes(5),
                EndTime = ongoingMatch7.MatchTime.AddMinutes(55),
                Player1Games = 6,
                Player2Games = 2,
                IsCompleted = true,
                WinnerId = 1,
            };
            context.Set.Add(ongoingMatch7Set1);

            var ongoingMatch7Set2 = new Set
            {
                Match = ongoingMatch7,
                SetNumber = 2,
                StartTime = ongoingMatch7.MatchTime.AddMinutes(60),
                Player1Games = 3,
                Player2Games = 3,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch7Set2);

            var ongoingMatch7CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "15", "30" },
                PointsPlayer2 = new List<string> { "15", "30", "40" },
                IsCompleted = false,
            };
            ongoingMatch7Set2.Games.Add(ongoingMatch7CurrentGame);

            // Ongoing Match 8: First set in progress (2-2)
            var ongoingMatch8Set1 = new Set
            {
                Match = ongoingMatch8,
                SetNumber = 1,
                StartTime = ongoingMatch8.MatchTime.AddMinutes(5),
                Player1Games = 2,
                Player2Games = 2,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch8Set1);

            var ongoingMatch8CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "15", "30" },
                PointsPlayer2 = new List<string> { "15" },
                IsCompleted = false,
            };
            ongoingMatch8Set1.Games.Add(ongoingMatch8CurrentGame);

            // Ongoing Match 9: Just started (0-0)
            var ongoingMatch9Set1 = new Set
            {
                Match = ongoingMatch9,
                SetNumber = 1,
                StartTime = ongoingMatch9.MatchTime.AddMinutes(5),
                Player1Games = 0,
                Player2Games = 0,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch9Set1);

            var ongoingMatch9CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "0" },
                PointsPlayer2 = new List<string> { "0" },
                IsCompleted = false,
            };
            ongoingMatch9Set1.Games.Add(ongoingMatch9CurrentGame);

            // Ongoing Match 10: First set in progress (3-5)
            var ongoingMatch10Set1 = new Set
            {
                Match = ongoingMatch10,
                SetNumber = 1,
                StartTime = ongoingMatch10.MatchTime.AddMinutes(5),
                Player1Games = 3,
                Player2Games = 5,
                IsCompleted = false,
            };
            context.Set.Add(ongoingMatch10Set1);

            var ongoingMatch10CurrentGame = new Game
            {
                PointsPlayer1 = new List<string> { "0" },
                PointsPlayer2 = new List<string> { "15", "30" },
                IsCompleted = false,
            };
            ongoingMatch10Set1.Games.Add(ongoingMatch10CurrentGame);

            // Save all changes to the database
            context.SaveChanges();
        }
    }

}
