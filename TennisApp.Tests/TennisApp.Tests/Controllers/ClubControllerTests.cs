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
    public class ClubControllerTests
    {
        private readonly Mock<ILogger<ClubController>> _mockLogger;
        private readonly TennisAppContext _context;
        private readonly ClubController _controller;

        public ClubControllerTests()
        {
            // Setup in-memory database
            var options = new DbContextOptionsBuilder<TennisAppContext>()
                .UseInMemoryDatabase(databaseName: "TestTennisAppDatabase")
                .Options;

            _context = new TennisAppContext(options);
            _mockLogger = new Mock<ILogger<ClubController>>();
            _controller = new ClubController(_context, _mockLogger.Object);

            // Ensure database is clean before each test
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();
        }

        [Fact]
        public async Task GetClubs_ReturnsAllClubs()
        {
            // Arrange
            var clubs = new List<Club>
            {
                new Club
                {
                    Id = 1,
                    Name = "Test Club 1",
                    Players = new List<Player>(),
                },
                new Club
                {
                    Id = 2,
                    Name = "Test Club 2",
                    Players = new List<Player>(),
                },
            };

            await _context.Club.AddRangeAsync(clubs);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetClubs();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Club>>>(result);
            var returnedClubs = Assert.IsAssignableFrom<List<Club>>(actionResult.Value);
            Assert.Equal(2, returnedClubs.Count);
        }

        [Fact]
        public async Task GetClub_WithValidId_ReturnsClub()
        {
            // Arrange
            var club = new Club
            {
                Id = 1,
                Name = "Test Club",
                Players = new List<Player>(),
            };
            await _context.Club.AddAsync(club);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.GetClub(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Club>>(result);
            var returnedClub = Assert.IsType<Club>(actionResult.Value);
            Assert.Equal(club.Id, returnedClub.Id);
            Assert.Equal(club.Name, returnedClub.Name);
        }

        [Fact]
        public async Task GetClub_WithInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.GetClub(999);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateClub_WithValidModel_CreatesClub()
        {
            // Arrange
            var club = new Club { Name = "New Club", Players = new List<Player>() };

            // Act
            var result = await _controller.CreateClub(club);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Club>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnedClub = Assert.IsType<Club>(createdAtActionResult.Value);
            Assert.Equal(club.Name, returnedClub.Name);
            Assert.Equal(1, await _context.Club.CountAsync());
        }

        [Fact]
        public async Task CreateClub_WithInvalidModel_ReturnsBadRequest()
        {
            // Arrange
            var club = new Club { Name = null }; // Name is required
            _controller.ModelState.AddModelError("Name", "Required");

            // Act
            var result = await _controller.CreateClub(club);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Club>>(result);
            Assert.IsType<BadRequestObjectResult>(actionResult.Result);
        }

        [Fact]
        public async Task UpdateClub_WithValidIdAndModel_UpdatesClub()
        {
            // Arrange
            var club = new Club
            {
                Id = 1,
                Name = "Test Club",
                Players = new List<Player>(),
            };
            await _context.Club.AddAsync(club);
            await _context.SaveChangesAsync();

            // Clear the change tracker to avoid entity tracking conflicts
            _context.ChangeTracker.Clear();

            var updatedClub = new Club
            {
                Id = 1,
                Name = "Updated Club",
                Players = new List<Player>(),
            };

            // Act
            var result = await _controller.UpdateClub(1, updatedClub);

            // Assert
            Assert.IsType<NoContentResult>(result);

            // Fetch the club from the database again to verify the update
            var clubInDb = await _context.Club.FindAsync(1);
            Assert.NotNull(clubInDb);
            Assert.Equal("Updated Club", clubInDb.Name);
        }

        [Fact]
        public async Task UpdateClub_WithMismatchedId_ReturnsBadRequest()
        {
            // Arrange
            var club = new Club
            {
                Id = 2,
                Name = "Test Club",
                Players = new List<Player>(),
            };

            // Act
            var result = await _controller.UpdateClub(1, club);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task UpdateClub_WithInvalidModel_ReturnsBadRequest()
        {
            // Arrange
            var club = new Club { Id = 1, Name = null }; // Name is required
            _controller.ModelState.AddModelError("Name", "Required");

            // Act
            var result = await _controller.UpdateClub(1, club);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task DeleteClub_WithValidId_RemovesClub()
        {
            // Arrange
            var club = new Club
            {
                Id = 1,
                Name = "Test Club",
                Players = new List<Player>(),
            };
            await _context.Club.AddAsync(club);
            await _context.SaveChangesAsync();

            // Act
            var result = await _controller.DeleteClub(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
            Assert.Equal(0, await _context.Club.CountAsync());
        }

        [Fact]
        public async Task DeleteClub_WithInvalidId_ReturnsNotFound()
        {
            // Act
            var result = await _controller.DeleteClub(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
