using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Controllers;
using TennisApp.Data;
using TennisApp.Models;
using Xunit;

namespace TennisApp.Tests.Controllers
{
    public class PlayersControllerTests
    {
        private readonly TennisAppContext _context;
        private readonly PlayersController _controller;

        public PlayersControllerTests()
        {
            // Setup in-memory database
            var options = new DbContextOptionsBuilder<TennisAppContext>()
                .UseInMemoryDatabase(databaseName: "TestPlayersDatabase")
                .Options;

            _context = new TennisAppContext(options);
            _controller = new PlayersController(_context);

            // Ensure database is clean before each test
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        [Fact]
        public async Task GetPlayers_ReturnsAllPlayers()
        {
            // Arrange
            var players = new List<Player>
            {
                new Player
                {
                    Id = 1,
                    Name = "Player 1",
                    Country = "Belgium",
                    DateOfBirth = new DateOnly(1990, 1, 1),
                    gender = Gender.Male,
                },
                new Player
                {
                    Id = 2,
                    Name = "Player 2",
                    Country = "Netherlands",
                    DateOfBirth = new DateOnly(1995, 5, 5),
                    gender = Gender.Female,
                },
            };

            await _context.Player.AddRangeAsync(players);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetPlayers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Player>>>(result);
            var returnedPlayers = Assert.IsAssignableFrom<List<Player>>(actionResult.Value);
            Assert.Equal(2, returnedPlayers.Count);
        }

        [Fact]
        public async Task GetPlayers_ReturnsEmptyList_WhenNoPlayersExist()
        {
            // Act
            var result = await _controller.GetPlayers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Player>>>(result);
            var returnedPlayers = Assert.IsAssignableFrom<List<Player>>(actionResult.Value);
            Assert.Empty(returnedPlayers);
        }
    }
}
