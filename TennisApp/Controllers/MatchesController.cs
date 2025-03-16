using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.DTOs;
using TennisApp.Models;
using TennisApp.WebSockets;

namespace TennisApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly TennisAppContext _context;
        private readonly ILogger<MatchesController> _logger;
        private readonly WebSocketHandler _webSocketHandler;
        private readonly JsonSerializerOptions _jsonOptions;

        public MatchesController(
            TennisAppContext context,
            ILogger<MatchesController> logger,
            WebSocketHandler webSocketHandler
        )
        {
            _context = context;
            _logger = logger;
            _webSocketHandler = webSocketHandler;

            // Configure JSON serializer to handle circular references
            _jsonOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true,
                MaxDepth = 64,
            };
        }

        [HttpPost]
        public async Task<ActionResult<object>> CreateMatch(
            [FromBody] CreateMatchDto createMatchDto
        )
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

                // Mark the court as occupied
                court.IsOccupied = true;

                var match = new Match
                {
                    Court = court,
                    MatchTime = DateTime.SpecifyKind(createMatchDto.MatchTime, DateTimeKind.Utc),
                    Player1 = player1,
                    Player2 = player2,
                    Scoreboard = scoreboard,
                };

                // Create an initial set for the match
                var initialSet = new Set
                {
                    Match = match,
                    SetNumber = 1,
                    StartTime = DateTime.UtcNow,
                    IsCompleted = false,
                };

                // Create a new game for the set
                var firstGame = initialSet.NewGame();

                // Add the set to the match's Sets collection
                match.Sets.Add(initialSet);

                _context.Match.Add(match);
                await _context.SaveChangesAsync();

                // Broadcast court availability update since a court is now occupied
                await _webSocketHandler.BroadcastCourtAvailabilityAsync();

                _logger.LogInformation("Match created successfully with ID: {ID}", match.Id);

                // Return a simplified DTO instead of the entity with circular references
                return CreatedAtAction(
                    nameof(GetMatch),
                    new { id = match.Id },
                    new
                    {
                        Id = match.Id,
                        MatchTime = match.MatchTime,
                        Player1Id = match.Player1Id,
                        Player2Id = match.Player2Id,
                        CourtId = match.CourtId,
                        ScoreboardId = match.ScoreboardId,
                    }
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating match");
                return BadRequest($"Error creating match: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetMatch(int id)
        {
            var match = await _context
                .Match.Include(m => m.Court)
                .Include(m => m.Player1)
                .Include(m => m.Player2)
                .Include(m => m.Scoreboard)
                .Include(m => m.Sets)
                .ThenInclude(s => s.Games)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return NotFound();
            }

            // Create a simplified response with no circular references
            var matchData = new
            {
                Id = match.Id,
                MatchTime = match.MatchTime,
                Court = match.Court != null
                    ? new
                    {
                        Id = match.Court.Id,
                        Name = match.Court.Name,
                        IsOccupied = match.Court.IsOccupied,
                        IsIndoor = match.Court.IsIndoor,
                    }
                    : null,
                Player1 = match.Player1 != null
                    ? new { Id = match.Player1.Id, Name = match.Player1.Name }
                    : null,
                Player2 = match.Player2 != null
                    ? new { Id = match.Player2.Id, Name = match.Player2.Name }
                    : null,
                Scoreboard = match.Scoreboard != null ? new { Id = match.Scoreboard.Id } : null,
                Sets = match
                    .Sets.Select(s => new
                    {
                        Id = s.Id,
                        SetNumber = s.SetNumber,
                        Player1Games = s.Player1Games,
                        Player2Games = s.Player2Games,
                        IsCompleted = s.IsCompleted,
                        WinnerId = s.WinnerId,
                        StartTime = s.StartTime,
                        EndTime = s.EndTime,
                        Games = s
                            .Games.Select(g => new
                            {
                                Id = g.Id,
                                // Remove GameNumber property as it doesn't exist in your Game class
                                IsCompleted = g.IsCompleted,
                                WinnerId = g.WinnerId,
                            })
                            .ToList(),
                    })
                    .ToList(),
            };

            return matchData;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMatch(int id, Match match)
        {
            if (id != match.Id)
            {
                return BadRequest();
            }

            // Check if this match is completed (all sets completed)
            bool isMatchCompleted = match.Sets.Count > 0 && match.Sets.All(s => s.IsCompleted);

            // Get the existing match to check for status changes
            var existingMatch = await _context
                .Match.AsNoTracking()
                .Include(m => m.Sets)
                .Include(m => m.Court)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (existingMatch == null)
            {
                return NotFound();
            }

            // Check if existing match was NOT completed and new match IS completed
            bool matchJustCompleted =
                !existingMatch.Sets.All(s => s.IsCompleted) && isMatchCompleted;

            // Or if the court has changed
            bool courtChanged = existingMatch.CourtId != match.CourtId;

            try
            {
                // If match just completed, free up the court
                if (matchJustCompleted)
                {
                    var court = await _context.Court.FindAsync(match.CourtId);
                    if (court != null)
                    {
                        court.IsOccupied = false;
                        _context.Entry(court).State = EntityState.Modified;
                    }
                }
                // If court changed, update occupation status on both old and new courts
                else if (courtChanged)
                {
                    // Free up the old court
                    var oldCourt = await _context.Court.FindAsync(existingMatch.CourtId);
                    if (oldCourt != null)
                    {
                        oldCourt.IsOccupied = false;
                        _context.Entry(oldCourt).State = EntityState.Modified;
                    }

                    // Mark the new court as occupied
                    var newCourt = await _context.Court.FindAsync(match.CourtId);
                    if (newCourt != null)
                    {
                        newCourt.IsOccupied = true;
                        _context.Entry(newCourt).State = EntityState.Modified;
                    }
                }

                // Update the match
                _context.Entry(match).State = EntityState.Modified;

                // For sets and games, we need special handling since they're collections
                // This approach assumes the complete match object is sent in the update
                _context.Set.RemoveRange(_context.Set.Where(s => s.Match!.Id == id));

                foreach (var set in match.Sets)
                {
                    set.Match = match;
                    _context.Set.Add(set);
                }

                await _context.SaveChangesAsync();

                // Broadcast court availability updates if match completion or court change affected courts
                if (matchJustCompleted || courtChanged)
                {
                    await _webSocketHandler.BroadcastCourtAvailabilityAsync();
                }

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            var match = await _context
                .Match.Include(m => m.Court)
                .Include(m => m.Sets)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return NotFound();
            }

            bool courtWasOccupied = match.Court?.IsOccupied ?? false;

            // If the court was occupied by this match, mark it as available
            if (courtWasOccupied && match.Court != null)
            {
                match.Court.IsOccupied = false;
            }

            // Remove all sets associated with this match
            _context.Set.RemoveRange(match.Sets);

            // Remove the match
            _context.Match.Remove(match);
            await _context.SaveChangesAsync();

            // Broadcast court availability update if a court was freed
            if (courtWasOccupied)
            {
                await _webSocketHandler.BroadcastCourtAvailabilityAsync();
            }

            return NoContent();
        }

        // Add endpoint for adding a new set to a match
        [HttpPost("{matchId}/sets")]
        public async Task<ActionResult<object>> AddSetToMatch(int matchId)
        {
            var match = await _context
                .Match.Include(m => m.Sets)
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                return NotFound("Match not found");
            }

            // Create a new set with the next set number
            int nextSetNumber = match.Sets.Count + 1;
            var newSet = new Set
            {
                Match = match,
                SetNumber = nextSetNumber,
                StartTime = DateTime.UtcNow,
                IsCompleted = false,
            };

            // Create an initial game for the set
            newSet.NewGame();

            // Add the set to the match
            match.Sets.Add(newSet);

            await _context.SaveChangesAsync();

            // Return a DTO without circular references
            var setData = new
            {
                Id = newSet.Id,
                SetNumber = newSet.SetNumber,
                Player1Games = newSet.Player1Games,
                Player2Games = newSet.Player2Games,
                IsCompleted = newSet.IsCompleted,
                StartTime = newSet.StartTime,
            };

            return Ok(setData);
        }

        [HttpPut("complete/{id}")]
        public async Task<IActionResult> CompleteMatch(int id)
        {
            var match = await _context
                .Match.Include(m => m.Court)
                .Include(m => m.Sets)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return NotFound();
            }

            // Mark all incomplete sets as completed
            foreach (var set in match.Sets.Where(s => !s.IsCompleted))
            {
                set.IsCompleted = true;
                set.EndTime = DateTime.UtcNow;
            }

            // Free up the court
            if (match.Court != null)
            {
                match.Court.IsOccupied = false;
            }

            await _context.SaveChangesAsync();

            // Broadcast court availability update
            await _webSocketHandler.BroadcastCourtAvailabilityAsync();

            return NoContent();
        }

        private bool MatchExists(int id)
        {
            return _context.Match.Any(e => e.Id == id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAllMatches()
        {
            _logger.LogInformation("Retrieving all matches");
            try
            {
                var matches = await _context.Match
                    .Include(m => m.Court)
                    .Include(m => m.Player1)
                    .Include(m => m.Player2)
                    .Include(m => m.Sets)
                    .ToListAsync();

                // Create simplified response objects without circular references
                var matchesData = matches.Select(match => new
                {
                    Id = match.Id,
                    MatchTime = match.MatchTime,
                    Court = match.Court != null
                        ? new
                        {
                            Id = match.Court.Id,
                            Name = match.Court.Name,
                            IsIndoor = match.Court.IsIndoor,
                        }
                        : null,
                    Player1 = match.Player1 != null
                        ? new { Id = match.Player1.Id, Name = match.Player1.Name, Country = match.Player1.Country }
                        : null,
                    Player2 = match.Player2 != null
                        ? new { Id = match.Player2.Id, Name = match.Player2.Name, Country = match.Player2.Country }
                        : null,
                    Sets = match.Sets.Select(s => new
                    {
                        Id = s.Id,
                        SetNumber = s.SetNumber,
                        Player1Games = s.Player1Games,
                        Player2Games = s.Player2Games,
                        IsCompleted = s.IsCompleted,
                        WinnerId = s.WinnerId,
                    }).ToList(),
                });

                return Ok(matchesData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all matches");
                return StatusCode(500, $"Error retrieving matches: {ex.Message}");
            }
        }
    }
}
