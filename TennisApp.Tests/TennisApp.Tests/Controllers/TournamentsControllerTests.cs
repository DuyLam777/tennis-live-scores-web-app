using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using TennisApp.Controllers;
using TennisApp.Data;
using TennisApp.Models;
using Xunit;

namespace TennisApp.Tests.Controllers
{
    public class TournamentControllerTests
    {
        private readonly Mock<ILogger<TournamentController>> _loggerMock;
        private readonly TennisAppContext _context;
        private readonly TournamentController _controller;

        public TournamentControllerTests()
        {
            // Set up in-memory database for testing
            var options = new DbContextOptionsBuilder<TennisAppContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new TennisAppContext(options);
            _loggerMock = new Mock<ILogger<TournamentController>>();
            _controller = new TournamentController(_context, _loggerMock.Object);

            // Seed the database with test data
            SeedDatabase();
        }

        private void SeedDatabase()
        {
            // Add a test club
            var club = new Club
            {
                Id = 1,
                Name = "Test Tennis Club",
                Players = [],
            };
            _context.Club.Add(club);

            // Add test players
            var player1 = new Player
            {
                Id = 1,
                Name = "John Doe",
                Country = "Belgium",
            };
            var player2 = new Player
            {
                Id = 2,
                Name = "Jane Smith",
                Country = "Netherlands",
            };
            _context.Player.AddRange(player1, player2);

            // Add test court
            var court = new Court
            {
                Id = 1,
                Name = "Center Court",
                IsOccupied = false,
                IsIndoor = true,
            };
            _context.Court.Add(court);

            // Add test tournaments
            var tournaments = new List<Tournament>
            {
                new Tournament
                {
                    Id = 1,
                    Name = "Spring Open",
                    StartDate = new DateTime(2025, 4, 1),
                    EndDate = new DateTime(2025, 4, 5),
                    HostId = 1,
                    Status = TournamentStatus.Upcoming,
                    Type = TournamentType.Singles,
                },
                new Tournament
                {
                    Id = 2,
                    Name = "Summer Championship",
                    StartDate = new DateTime(2025, 7, 15),
                    EndDate = new DateTime(2025, 7, 20),
                    HostId = 1,
                    Status = TournamentStatus.Upcoming,
                    Type = TournamentType.Doubles,
                },
            };
            _context.Tournament.AddRange(tournaments);

            // Add test match
            var match = new Models.Match
            {
                Id = 1,
                TournamentId = 1,
                Player1Id = 1,
                Player2Id = 2,
                CourtId = 1,
                MatchTime = new DateTime(2025, 4, 1, 10, 0, 0),
            };
            _context.Match.Add(match);

            _context.SaveChanges();
        }

        [Fact]
        public async Task GetTournaments_ReturnsAllTournaments()
        {
            // Act
            var result = await _controller.GetTournaments();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Tournament>>>(result);
            var tournaments = Assert.IsAssignableFrom<IEnumerable<Tournament>>(actionResult.Value);
            Assert.Equal(2, tournaments.Count());
        }

        [Fact]
        public async Task GetTournament_WithValidId_ReturnsTournament()
        {
            // Act
            var result = await _controller.GetTournament(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Tournament>>(result);
            var tournament = Assert.IsType<Tournament>(actionResult.Value);
            Assert.Equal("Spring Open", tournament.Name);
            Assert.Equal(TournamentStatus.Upcoming, tournament.Status);
            Assert.Single(tournament.Matches);
        }

        [Fact]
        public async Task GetTournament_WithInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.GetTournament(999);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateTournament_WithValidModel_ReturnsTournament()
        {
            // Arrange
            var tournament = new Tournament
            {
                Name = "Fall Tournament",
                StartDate = new DateTime(2025, 9, 1),
                EndDate = new DateTime(2025, 9, 5),
                HostId = 1,
                Status = TournamentStatus.Upcoming,
                Type = TournamentType.Singles,
            };

            // Act
            var result = await _controller.CreateTournament(tournament);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Tournament>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnedTournament = Assert.IsType<Tournament>(createdAtActionResult.Value);
            Assert.Equal("Fall Tournament", returnedTournament.Name);
            Assert.Equal(DateTimeKind.Utc, returnedTournament.StartDate.Kind);
            Assert.Equal(DateTimeKind.Utc, returnedTournament.EndDate.Kind);
        }

        [Fact]
        public async Task CreateTournament_WithEndDateBeforeStartDate_ReturnsBadRequest()
        {
            // Arrange
            var tournament = new Tournament
            {
                Name = "Invalid Tournament",
                StartDate = new DateTime(2025, 9, 10),
                EndDate = new DateTime(2025, 9, 5),
                HostId = 1,
                Status = TournamentStatus.Upcoming,
                Type = TournamentType.Singles,
            };

            // Act
            var result = await _controller.CreateTournament(tournament);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Tournament>>(result);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);
            var modelState = Assert.IsType<SerializableError>(badRequestResult.Value);
            Assert.True(modelState.ContainsKey("EndDate"));
        }

        [Fact]
        public async Task UpdateTournament_WithValidModel_ReturnsNoContent()
        {
            // Arrange
            var tournament = await _context.Tournament.FindAsync(1);
            Assert.NotNull(tournament);
            tournament.Name = "Updated Spring Open";
            tournament.Status = TournamentStatus.Ongoing;

            // Act
            var result = await _controller.UpdateTournament(1, tournament);

            // Assert
            Assert.IsType<NoContentResult>(result);
            var updatedTournament = await _context.Tournament.FindAsync(1);
            Assert.NotNull(updatedTournament);
            Assert.Equal("Updated Spring Open", updatedTournament.Name);
            Assert.Equal(TournamentStatus.Ongoing, updatedTournament.Status);
        }

        [Fact]
        public async Task UpdateTournament_WithInvalidId_ReturnsBadRequest()
        {
            // Arrange
            var tournament = await _context.Tournament.FindAsync(1);
            Assert.NotNull(tournament);
            tournament.Name = "Updated Spring Open";

            // Act
            var result = await _controller.UpdateTournament(999, tournament);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task UpdateTournament_WithEndDateBeforeStartDate_ReturnsBadRequest()
        {
            // Arrange
            var tournament = await _context.Tournament.FindAsync(1);
            Assert.NotNull(tournament);
            tournament.StartDate = new DateTime(2025, 4, 10);
            tournament.EndDate = new DateTime(2025, 4, 5);

            // Act
            var result = await _controller.UpdateTournament(1, tournament);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var modelState = Assert.IsType<SerializableError>(badRequestResult.Value);
            Assert.True(modelState.ContainsKey("EndDate"));
        }

        [Fact]
        public async Task DeleteTournament_WithValidId_ReturnsNoContent()
        {
            // Act
            var result = await _controller.DeleteTournament(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
            var deletedTournament = await _context.Tournament.FindAsync(1);
            Assert.Null(deletedTournament);
        }

        [Fact]
        public async Task DeleteTournament_WithInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.DeleteTournament(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetTournamentMatches_WithValidId_ReturnsMatches()
        {
            // Act
            var result = await _controller.GetTournamentMatches(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Models.Match>>>(result);
            var matches = Assert.IsAssignableFrom<IEnumerable<Models.Match>>(actionResult.Value);
            Assert.Single(matches);
        }

        [Fact]
        public async Task GetTournamentMatches_WithInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.GetTournamentMatches(999);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task AddMatchToTournament_WithValidIds_ReturnsOk()
        {
            // Arrange
            var match = new Models.Match
            {
                Id = 2,
                Player1Id = 1,
                Player2Id = 2,
                CourtId = 1,
                MatchTime = new DateTime(2025, 7, 15, 10, 0, 0),
            };
            _context.Match.Add(match);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.AddMatchToTournament(2, 2);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedMatch = Assert.IsType<Models.Match>(okResult.Value);
            Assert.Equal(2, returnedMatch.TournamentId);
        }

        [Fact]
        public async Task AddMatchToTournament_WithInvalidTournamentId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.AddMatchToTournament(999, 1);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("Tournament not found", notFoundResult.Value);
        }

        [Fact]
        public async Task AddMatchToTournament_WithInvalidMatchId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.AddMatchToTournament(1, 999);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("Match not found", notFoundResult.Value);
        }

        [Fact]
        public async Task UpdateTournamentStatus_WithValidId_UpdatesStatus()
        {
            // Act
            var result = await _controller.UpdateTournamentStatus(1, TournamentStatus.Ongoing);

            // Assert
            Assert.IsType<NoContentResult>(result);
            var tournament = await _context.Tournament.FindAsync(1);
            Assert.NotNull(tournament);
            Assert.Equal(TournamentStatus.Ongoing, tournament.Status);
        }

        [Fact]
        public async Task UpdateTournamentStatus_WithInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.UpdateTournamentStatus(999, TournamentStatus.Ongoing);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
