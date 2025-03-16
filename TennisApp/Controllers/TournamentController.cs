using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.DTOs;
using TennisApp.Models;

namespace TennisApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentController : ControllerBase
    {
        private readonly TennisAppContext _context;
        private readonly ILogger<TournamentController> _logger;

        public TournamentController(TennisAppContext context, ILogger<TournamentController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Tournament
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TournamentDto>>> GetTournaments()
        {
            try
            {
                var tournaments = await _context
                    .Tournament.Include(t => t.Host)
                    .Include(t => t.Winner)
                    .ToListAsync();

                return tournaments
                    .Select(t => new TournamentDto
                    {
                        Id = t.Id,
                        Name = t.Name,
                        StartDate = t.StartDate,
                        EndDate = t.EndDate,
                        HostId = t.HostId,
                        HostName = t.Host?.Name,
                        Description = t.Description,
                        Status = t.Status,
                        Type = t.Type,
                        MaxParticipants = t.MaxParticipants,
                        WinnerId = t.WinnerId,
                        WinnerName = t.Winner?.Name,
                    })
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tournaments");
                return StatusCode(500, $"Error loading tournaments: {ex.Message}");
            }
        }

        // GET: api/Tournament/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TournamentDetailDto>> GetTournament(int id)
        {
            try
            {
                var tournament = await _context
                    .Tournament.Include(t => t.Host)
                    .Include(t => t.Winner)
                    .Include(t => t.Matches)
                    .ThenInclude(m => m.Player1)
                    .Include(t => t.Matches)
                    .ThenInclude(m => m.Player2)
                    .Include(t => t.Matches)
                    .ThenInclude(m => m.Court)
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (tournament == null)
                {
                    return NotFound();
                }

                var tournamentDto = new TournamentDetailDto
                {
                    Id = tournament.Id,
                    Name = tournament.Name,
                    StartDate = tournament.StartDate,
                    EndDate = tournament.EndDate,
                    HostId = tournament.HostId,
                    HostName = tournament.Host?.Name,
                    Description = tournament.Description,
                    Status = tournament.Status,
                    Type = tournament.Type,
                    MaxParticipants = tournament.MaxParticipants,
                    DurationInDays = tournament.DurationInDays,
                    WinnerId = tournament.WinnerId,
                    WinnerName = tournament.Winner?.Name,
                    Matches = tournament
                        .Matches.Select(m => new MatchDto
                        {
                            Id = m.Id,
                            CourtId = m.CourtId,
                            CourtName = m.Court?.Name,
                            MatchTime = m.MatchTime,
                            Player1Id = m.Player1Id,
                            Player1Name = m.Player1?.Name,
                            Player2Id = m.Player2Id,
                            Player2Name = m.Player2?.Name,
                            ScoreboardId = m.ScoreboardId,
                            TournamentId = m.TournamentId,
                        })
                        .ToList(),
                };

                return tournamentDto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tournament with ID {Id}", id);
                return StatusCode(500, $"Error loading tournament: {ex.Message}");
            }
        }

        // POST: api/Tournament
        [HttpPost]
        public async Task<ActionResult<TournamentDto>> CreateTournament(
            CreateTournamentDto tournamentDto
        )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check that end date is after or equal to start date
                if (tournamentDto.EndDate < tournamentDto.StartDate)
                {
                    ModelState.AddModelError(
                        "EndDate",
                        "End date must be after or equal to start date"
                    );
                    return BadRequest(ModelState);
                }

                var tournament = new Tournament
                {
                    Name = tournamentDto.Name,
                    StartDate = DateTime.SpecifyKind(tournamentDto.StartDate, DateTimeKind.Utc),
                    EndDate = DateTime.SpecifyKind(tournamentDto.EndDate, DateTimeKind.Utc),
                    HostId = tournamentDto.HostId,
                    Description = tournamentDto.Description,
                    Status = tournamentDto.Status,
                    Type = tournamentDto.Type,
                    MaxParticipants = tournamentDto.MaxParticipants,
                };

                _context.Tournament.Add(tournament);
                await _context.SaveChangesAsync();

                var responseDto = new TournamentDto
                {
                    Id = tournament.Id,
                    Name = tournament.Name,
                    StartDate = tournament.StartDate,
                    EndDate = tournament.EndDate,
                    HostId = tournament.HostId,
                    Description = tournament.Description,
                    Status = tournament.Status,
                    Type = tournament.Type,
                    MaxParticipants = tournament.MaxParticipants,
                };

                return CreatedAtAction(
                    nameof(GetTournament),
                    new { id = tournament.Id },
                    responseDto
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating tournament");
                return StatusCode(500, $"Error creating tournament: {ex.Message}");
            }
        }

        // PUT: api/Tournament/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTournament(int id, UpdateTournamentDto tournamentDto)
        {
            try
            {
                if (id != tournamentDto.Id)
                {
                    return BadRequest("Tournament ID mismatch between URL and body");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check that end date is after or equal to start date
                if (tournamentDto.EndDate < tournamentDto.StartDate)
                {
                    ModelState.AddModelError(
                        "EndDate",
                        "End date must be after or equal to start date"
                    );
                    return BadRequest(ModelState);
                }

                // Get the tournament with its matches for validation
                var tournament = await _context
                    .Tournament.Include(t => t.Matches)
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (tournament == null)
                {
                    return NotFound();
                }

                // If the max participants is being reduced, make sure it's not less than current count
                if (tournamentDto.MaxParticipants.HasValue)
                {
                    var currentParticipantCount = tournament
                        .Matches.SelectMany(m => new[] { m.Player1Id, m.Player2Id })
                        .Where(pid => pid > 0)
                        .Distinct()
                        .Count();

                    if (tournamentDto.MaxParticipants.Value < currentParticipantCount)
                    {
                        ModelState.AddModelError(
                            "MaxParticipants",
                            $"Cannot reduce maximum participants below current count. Current participants: {currentParticipantCount}"
                        );
                        return BadRequest(ModelState);
                    }
                }

                // Update tournament properties
                tournament.Name = tournamentDto.Name;
                tournament.StartDate = DateTime.SpecifyKind(
                    tournamentDto.StartDate,
                    DateTimeKind.Utc
                );
                tournament.EndDate = DateTime.SpecifyKind(tournamentDto.EndDate, DateTimeKind.Utc);
                tournament.HostId = tournamentDto.HostId;
                tournament.Description = tournamentDto.Description;
                tournament.Status = tournamentDto.Status;
                tournament.Type = tournamentDto.Type;
                tournament.MaxParticipants = tournamentDto.MaxParticipants;

                _context.Entry(tournament).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TournamentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating tournament with ID {Id}", id);
                return StatusCode(500, $"Error updating tournament: {ex.Message}");
            }
        }

        // DELETE: api/Tournament/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTournament(int id)
        {
            try
            {
                var tournament = await _context
                    .Tournament.Include(t => t.Matches)
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (tournament == null)
                {
                    return NotFound();
                }

                _context.Tournament.Remove(tournament);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting tournament with ID {Id}", id);
                return StatusCode(500, $"Error deleting tournament: {ex.Message}");
            }
        }

        // GET: api/Tournament/5/Matches
        [HttpGet("{id}/Matches")]
        public async Task<ActionResult<IEnumerable<MatchDto>>> GetTournamentMatches(int id)
        {
            try
            {
                if (!TournamentExists(id))
                {
                    return NotFound();
                }

                var matches = await _context
                    .Match.Where(m => m.TournamentId == id)
                    .Include(m => m.Player1)
                    .Include(m => m.Player2)
                    .Include(m => m.Court)
                    .ToListAsync();

                return matches
                    .Select(m => new MatchDto
                    {
                        Id = m.Id,
                        CourtId = m.CourtId,
                        CourtName = m.Court?.Name,
                        MatchTime = m.MatchTime,
                        Player1Id = m.Player1Id,
                        Player1Name = m.Player1?.Name,
                        Player2Id = m.Player2Id,
                        Player2Name = m.Player2?.Name,
                        ScoreboardId = m.ScoreboardId,
                        TournamentId = m.TournamentId,
                    })
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving matches for tournament with ID {Id}", id);
                return StatusCode(500, $"Error retrieving matches: {ex.Message}");
            }
        }

        // POST: api/Tournament/5/AddMatch
        [HttpPost("{id}/AddMatch")]
        public async Task<ActionResult<MatchDto>> AddMatchToTournament(int id, int matchId)
        {
            try
            {
                // Get the tournament with eager loading of all related data needed
                var tournament = await _context
                    .Tournament.Include(t => t.Matches)
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (tournament == null)
                {
                    return NotFound("Tournament not found");
                }

                var match = await _context
                    .Match.Include(m => m.Player1)
                    .Include(m => m.Player2)
                    .Include(m => m.Court)
                    .FirstOrDefaultAsync(m => m.Id == matchId);

                if (match == null)
                {
                    return NotFound("Match not found");
                }

                // Check if the tournament has a participant limit
                if (tournament.MaxParticipants.HasValue)
                {
                    // Get existing unique player IDs in the tournament
                    var existingPlayerIds = tournament
                        .Matches.SelectMany(m => new[] { m.Player1Id, m.Player2Id })
                        .Where(pid => pid > 0)
                        .Distinct()
                        .ToHashSet();

                    // Get new player IDs from the match being added
                    var newPlayerIds = new List<int>();
                    if (match.Player1Id > 0 && !existingPlayerIds.Contains(match.Player1Id))
                        newPlayerIds.Add(match.Player1Id);

                    if (match.Player2Id > 0 && !existingPlayerIds.Contains(match.Player2Id))
                        newPlayerIds.Add(match.Player2Id);

                    // Log the calculation details for debugging
                    _logger.LogInformation(
                        "Tournament {TournamentId}: Existing players: {ExistingCount}, New players: {NewCount}, Max allowed: {MaxAllowed}",
                        id,
                        existingPlayerIds.Count,
                        newPlayerIds.Count,
                        tournament.MaxParticipants.Value
                    );

                    // Verify if adding these new players would exceed the limit
                    if (
                        existingPlayerIds.Count + newPlayerIds.Count
                        > tournament.MaxParticipants.Value
                    )
                    {
                        return BadRequest(
                            new
                            {
                                error = "Participant limit exceeded",
                                message = $"Adding this match would exceed the tournament's participant limit. "
                                    + $"Current participants: {existingPlayerIds.Count}, "
                                    + $"New players: {newPlayerIds.Count}, "
                                    + $"Maximum allowed: {tournament.MaxParticipants.Value}",
                                currentParticipants = existingPlayerIds.Count,
                                newPlayers = newPlayerIds.Count,
                                maxParticipants = tournament.MaxParticipants.Value,
                            }
                        );
                    }
                }

                match.TournamentId = id;
                await _context.SaveChangesAsync();

                // Return the updated match information
                var matchDto = new MatchDto
                {
                    Id = match.Id,
                    CourtId = match.CourtId,
                    CourtName = match.Court?.Name,
                    MatchTime = match.MatchTime,
                    Player1Id = match.Player1Id,
                    Player1Name = match.Player1?.Name,
                    Player2Id = match.Player2Id,
                    Player2Name = match.Player2?.Name,
                    ScoreboardId = match.ScoreboardId,
                    TournamentId = match.TournamentId,
                };

                return Ok(matchDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error adding match {MatchId} to tournament {TournamentId}",
                    matchId,
                    id
                );
                return StatusCode(500, $"Error adding match to tournament: {ex.Message}");
            }
        }

        // PUT: api/Tournament/5/UpdateStatus
        [HttpPut("{id}/UpdateStatus")]
        public async Task<IActionResult> UpdateTournamentStatus(
            int id,
            [FromBody] UpdateTournamentStatusDto statusDto
        )
        {
            try
            {
                var tournament = await _context.Tournament.FindAsync(id);
                if (tournament == null)
                {
                    return NotFound();
                }

                tournament.Status = statusDto.Status;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating status for tournament with ID {Id}", id);
                return StatusCode(500, $"Error updating tournament status: {ex.Message}");
            }
        }

        // PUT: api/Tournament/5/UpdateWinner
        [HttpPut("{id}/UpdateWinner")]
        public async Task<IActionResult> UpdateTournamentWinner(
            int id,
            [FromBody] UpdateTournamentWinnerDto winnerDto
        )
        {
            try
            {
                var tournament = await _context.Tournament.FindAsync(id);
                if (tournament == null)
                {
                    return NotFound();
                }

                tournament.WinnerId = winnerDto.WinnerId;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating winner for tournament with ID {Id}", id);
                return StatusCode(500, $"Error updating tournament winner: {ex.Message}");
            }
        }

        private bool TournamentExists(int id)
        {
            return _context.Tournament.Any(t => t.Id == id);
        }
    }
}
