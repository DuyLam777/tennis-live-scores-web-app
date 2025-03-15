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
    public class ScoreboardsControllerTests
    {
        private readonly TennisAppContext _context;
        private readonly ScoreboardsController _controller;

        public ScoreboardsControllerTests()
        {
            // Setup in-memory database
            var options = new DbContextOptionsBuilder<TennisAppContext>()
                .UseInMemoryDatabase(databaseName: "TestScoreboardsDatabase")
                .Options;

            _context = new TennisAppContext(options);
            _controller = new ScoreboardsController(_context);

            // Ensure database is clean before each test
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        [Fact]
        public async Task GetScoreboards_ReturnsAllScoreboards()
        {
            // Arrange
            var scoreboards = new List<Scoreboard>
            {
                new Scoreboard
                {
                    Id = 1,
                    BatteryLevel = 80,
                    LastConnected = DateTime.UtcNow,
                },
                new Scoreboard
                {
                    Id = 2,
                    BatteryLevel = 50,
                    LastConnected = DateTime.UtcNow,
                },
            };

            await _context.Scoreboard.AddRangeAsync(scoreboards);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetScoreboards();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Scoreboard>>>(result);
            var returnedScoreboards = Assert.IsAssignableFrom<List<Scoreboard>>(actionResult.Value);
            Assert.Equal(2, returnedScoreboards.Count);
        }

        [Fact]
        public async Task GetScoreboards_ReturnsEmptyList_WhenNoScoreboardsExist()
        {
            // Act
            var result = await _controller.GetScoreboards();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Scoreboard>>>(result);
            var returnedScoreboards = Assert.IsAssignableFrom<List<Scoreboard>>(actionResult.Value);
            Assert.Empty(returnedScoreboards);
        }
    }
}
