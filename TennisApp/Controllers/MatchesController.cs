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

        public MatchesController(
            TennisAppContext context,
            ILogger<MatchesController> logger,
            WebSocketHandler webSocketHandler
        )
        {
            _context = context;
            _logger = logger;
            _webSocketHandler = webSocketHandler;
        }

        [HttpPost]
        public async Task<ActionResult<MatchDto>> CreateMatch(
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

                // If TournamentId is provided, validate it exists
                Tournament? tournament = null;
                if (createMatchDto.TournamentId.HasValue)
                {
                    tournament = await _context.Tournament.FindAsync(
                        createMatchDto.TournamentId.Value
                    );
                    if (tournament == null)
                    {
                        _logger.LogWarning(
                            "Tournament not found: {TournamentId}",
                            createMatchDto.TournamentId.Value
                        );
                        return NotFound(
                            $"Tournament with ID {createMatchDto.TournamentId.Value} not found"
                        );
                    }
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
                    TournamentId = createMatchDto.TournamentId, // Associate with tournament if specified
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

                // Return a DTO instead of the entity with circular references
                var matchDto = new MatchDto
                {
                    Id = match.Id,
                    CourtId = match.CourtId,
                    CourtName = court.Name,
                    MatchTime = match.MatchTime,
                    Player1Id = match.Player1Id,
                    Player1Name = player1.Name,
                    Player2Id = match.Player2Id,
                    Player2Name = player2.Name,
                    ScoreboardId = match.ScoreboardId,
                    TournamentId = match.TournamentId,
                };

                return CreatedAtAction(nameof(GetMatch), new { id = match.Id }, matchDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating match");
                return BadRequest($"Error creating match: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MatchDetailDto>> GetMatch(int id)
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

            // Create a DTO with no circular references
            var matchDto = new MatchDetailDto
            {
                Id = match.Id,
                MatchTime = match.MatchTime,
                CourtId = match.CourtId,
                CourtName = match.Court?.Name,
                IsIndoor = match.Court?.IsIndoor ?? false,
                Player1Id = match.Player1Id,
                Player1Name = match.Player1?.Name,
                Player2Id = match.Player2Id,
                Player2Name = match.Player2?.Name,
                ScoreboardId = match.ScoreboardId,
                TournamentId = match.TournamentId,
                Sets = match
                    .Sets.Select(s => new SetDto
                    {
                        Id = s.Id,
                        SetNumber = s.SetNumber,
                        Player1Games = s.Player1Games ?? 0,
                        Player2Games = s.Player2Games ?? 0,
                        IsCompleted = s.IsCompleted,
                        WinnerId = s.WinnerId,
                        StartTime = s.StartTime ?? default(DateTime),
                        EndTime = s.EndTime,
                        Games = s
                            .Games.Select(g => new GameDto
                            {
                                Id = g.Id,
                                IsCompleted = g.IsCompleted,
                                WinnerId = g.WinnerId,
                            })
                            .ToList(),
                    })
                    .ToList(),
            };

            return matchDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMatch(int id, UpdateMatchDto updateMatchDto)
        {
            if (id != updateMatchDto.Id)
            {
                return BadRequest();
            }

            // Get the existing match
            var match = await _context
                .Match.Include(m => m.Sets)
                .ThenInclude(s => s.Games)
                .Include(m => m.Court)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return NotFound();
            }

            // Check if this match is completed (all sets completed)
            bool wasMatchCompleted = match.Sets.Count > 0 && match.Sets.All(s => s.IsCompleted);

            // Check if court has changed
            bool courtChanged = match.CourtId != updateMatchDto.CourtId;

            try
            {
                // Update basic match properties
                match.MatchTime = updateMatchDto.MatchTime;
                match.Player1Id = updateMatchDto.Player1Id;
                match.Player2Id = updateMatchDto.Player2Id;

                // If court changed, update occupation status on both old and new courts
                if (courtChanged)
                {
                    // Free up the old court
                    var oldCourt = await _context.Court.FindAsync(match.CourtId);
                    if (oldCourt != null)
                    {
                        oldCourt.IsOccupied = false;
                        _context.Entry(oldCourt).State = EntityState.Modified;
                    }

                    // Mark the new court as occupied
                    var newCourt = await _context.Court.FindAsync(updateMatchDto.CourtId);
                    if (newCourt != null)
                    {
                        newCourt.IsOccupied = true;
                        _context.Entry(newCourt).State = EntityState.Modified;
                    }

                    match.CourtId = updateMatchDto.CourtId;
                }

                // Update the sets based on the DTO
                if (updateMatchDto.Sets != null)
                {
                    // Handle updates or additions of sets
                    foreach (var setDto in updateMatchDto.Sets)
                    {
                        var existingSet = match.Sets.FirstOrDefault(s => s.Id == setDto.Id);

                        if (existingSet != null)
                        {
                            // Update existing set
                            existingSet.Player1Games = setDto.Player1Games;
                            existingSet.Player2Games = setDto.Player2Games;
                            existingSet.IsCompleted = setDto.IsCompleted;
                            existingSet.WinnerId = setDto.WinnerId;
                            existingSet.EndTime =
                                setDto.IsCompleted && !existingSet.IsCompleted
                                    ? DateTime.UtcNow
                                    : existingSet.EndTime;

                            // Update games if provided
                            if (setDto.Games != null)
                            {
                                foreach (var gameDto in setDto.Games)
                                {
                                    var existingGame = existingSet.Games.FirstOrDefault(g =>
                                        g.Id == gameDto.Id
                                    );

                                    if (existingGame != null)
                                    {
                                        // Update existing game
                                        existingGame.IsCompleted = gameDto.IsCompleted;
                                        // Fix for nullable WinnerId
                                        if (gameDto.WinnerId.HasValue)
                                        {
                                            existingGame.WinnerId = gameDto.WinnerId.Value;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // Check if match is now completed (all sets completed)
                bool isMatchNowCompleted =
                    match.Sets.Count > 0 && match.Sets.All(s => s.IsCompleted);

                // If match just completed, free up the court
                if (!wasMatchCompleted && isMatchNowCompleted)
                {
                    var court = await _context.Court.FindAsync(match.CourtId);
                    if (court != null)
                    {
                        court.IsOccupied = false;
                        _context.Entry(court).State = EntityState.Modified;
                    }
                }

                await _context.SaveChangesAsync();

                // Broadcast court availability updates if match completion or court change affected courts
                if ((wasMatchCompleted != isMatchNowCompleted) || courtChanged)
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
                .ThenInclude(s => s.Games)
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

            // Remove all games and sets associated with this match
            foreach (var set in match.Sets)
            {
                _context.Game.RemoveRange(set.Games);
            }
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
        public async Task<ActionResult<SetDto>> AddSetToMatch(int matchId)
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
            var setDto = new SetDto
            {
                Id = newSet.Id,
                SetNumber = newSet.SetNumber,
                Player1Games = newSet.Player1Games ?? 0,
                Player2Games = newSet.Player2Games ?? 0,
                IsCompleted = newSet.IsCompleted,
                WinnerId = newSet.WinnerId,
                StartTime = newSet.StartTime ?? default(DateTime),
                EndTime = newSet.EndTime,
                Games = newSet
                    .Games.Select(g => new GameDto
                    {
                        Id = g.Id,
                        IsCompleted = g.IsCompleted,
                        WinnerId = g.WinnerId,
                    })
                    .ToList(),
            };

            return Ok(setDto);
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
    }
}
