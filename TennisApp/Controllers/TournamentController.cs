using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
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
        public async Task<ActionResult<IEnumerable<Tournament>>> GetTournaments()
        {
            return await _context.Tournament.Include(t => t.Host).ToListAsync();
        }

        // GET: api/Tournament/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tournament>> GetTournament(int id)
        {
            var tournament = await _context
                .Tournament.Include(t => t.Host)
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

            return tournament;
        }

        // POST: api/Tournament
        [HttpPost]
        public async Task<ActionResult<Tournament>> CreateTournament(Tournament tournament)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check that end date is after or equal to start date
            if (tournament.EndDate < tournament.StartDate)
            {
                ModelState.AddModelError(
                    "EndDate",
                    "End date must be after or equal to start date"
                );
                return BadRequest(ModelState);
            }

            _context.Tournament.Add(tournament);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTournament), new { id = tournament.Id }, tournament);
        }

        // PUT: api/Tournament/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTournament(int id, Tournament tournament)
        {
            if (id != tournament.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check that end date is after or equal to start date
            if (tournament.EndDate < tournament.StartDate)
            {
                ModelState.AddModelError(
                    "EndDate",
                    "End date must be after or equal to start date"
                );
                return BadRequest(ModelState);
            }

            try
            {
                _context.Entry(tournament).State = EntityState.Modified;
                await _context.SaveChangesAsync();
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

            return NoContent();
        }

        // DELETE: api/Tournament/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTournament(int id)
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

        // GET: api/Tournament/5/Matches
        [HttpGet("{id}/Matches")]
        public async Task<ActionResult<IEnumerable<Match>>> GetTournamentMatches(int id)
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

            return matches;
        }

        // POST: api/Tournament/5/AddMatch
        [HttpPost("{id}/AddMatch")]
        public async Task<ActionResult<Match>> AddMatchToTournament(int id, int matchId)
        {
            if (!TournamentExists(id))
            {
                return NotFound("Tournament not found");
            }

            var match = await _context.Match.FindAsync(matchId);
            if (match == null)
            {
                return NotFound("Match not found");
            }

            match.TournamentId = id;
            await _context.SaveChangesAsync();

            return Ok(match);
        }

        // PUT: api/Tournament/5/UpdateStatus
        [HttpPut("{id}/UpdateStatus")]
        public async Task<IActionResult> UpdateTournamentStatus(
            int id,
            [FromBody] TournamentStatus status
        )
        {
            var tournament = await _context.Tournament.FindAsync(id);
            if (tournament == null)
            {
                return NotFound();
            }

            tournament.Status = status;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TournamentExists(int id)
        {
            return _context.Tournament.Any(t => t.Id == id);
        }
    }
}
