using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;
using TennisApp.DTOs;

namespace TennisApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly TennisAppContext _context;
        private readonly ILogger<MatchesController> _logger;

        public MatchesController(TennisAppContext context, ILogger<MatchesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<Match>> CreateMatch([FromBody] CreateMatchDto createMatchDto)
        {
            _logger.LogInformation("Received request to create match: {@Match}", createMatchDto);

            try
            {
                // Validate that the related entities exist
                var court = await _context.Court.FindAsync(createMatchDto.CourtId);
                var player1 = await _context.Player.FindAsync(createMatchDto.Player1Id);
                var player2 = await _context.Player.FindAsync(createMatchDto.Player2Id);
                var scoreboard = await _context.Scoreboard.FindAsync(createMatchDto.ScoreboardId);

                if (court == null || player1 == null || player2 == null || scoreboard == null)
                {
                    _logger.LogWarning("One or more related entities not found");
                    return NotFound("One or more related entities not found");
                }

                var match = new Match
                {
                    Court = court,
                    MatchTime = DateTime.SpecifyKind(createMatchDto.MatchTime, DateTimeKind.Utc),
                    Player1 = player1,
                    Player2 = player2,
                    Scoreboard = scoreboard
                };

                _context.Match.Add(match);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Match created successfully: {@Match}", match);
                return CreatedAtAction(nameof(GetMatch), new { id = match.Id }, match);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating match");
                return BadRequest($"Error creating match: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Match>> GetMatch(int id)
        {
            var match = await _context.Match
                .Include(m => m.Court)
                .Include(m => m.Player1)
                .Include(m => m.Player2)
                .Include(m => m.Scoreboard)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return NotFound();
            }

            return match;
        }
    }
}