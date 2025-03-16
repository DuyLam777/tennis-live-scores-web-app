using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubController : ControllerBase
    {
        private readonly TennisAppContext _context;
        private readonly ILogger<ClubController> _logger;
        private readonly JsonSerializerOptions _jsonOptions;

        public ClubController(TennisAppContext context, ILogger<ClubController> logger)
        {
            _context = context;
            _logger = logger;

            // Configure JSON serialization options to avoid reference handling metadata
            _jsonOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true,
            };
        }

        // GET: api/Club
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Club>>> GetClubs()
        {
            try
            {
                _logger.LogInformation("Fetching all clubs");

                if (_context.Club == null)
                {
                    _logger.LogError("Club DbSet is null");
                    return Problem("Entity set 'TennisAppContext.Club' is null.");
                }

                var clubs = await _context.Club.ToListAsync();
                _logger.LogInformation($"Retrieved {clubs.Count} clubs");

                // Return using custom serialization options
                return new JsonResult(clubs, _jsonOptions);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching clubs");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/Club/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Club>> GetClub(int id)
        {
            try
            {
                if (_context.Club == null)
                {
                    return Problem("Entity set 'TennisAppContext.Club' is null.");
                }

                var club = await _context.Club.FindAsync(id);

                if (club == null)
                {
                    return NotFound();
                }

                return new JsonResult(club, _jsonOptions);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching club with ID {id}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/Club
        [HttpPost]
        public async Task<ActionResult<Club>> CreateClub(Club club)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Club.Add(club);
                await _context.SaveChangesAsync();

                return new JsonResult(
                    CreatedAtAction(nameof(GetClub), new { id = club.Id }, club).Value,
                    _jsonOptions
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating club");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/Club/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClub(int id, Club club)
        {
            if (id != club.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Entry(club).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClubExists(id))
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

        // DELETE: api/Club/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClub(int id)
        {
            var club = await _context.Club.FindAsync(id);
            if (club == null)
            {
                return NotFound();
            }

            _context.Club.Remove(club);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClubExists(int id)
        {
            return (_context.Club?.Any(c => c.Id == id)).GetValueOrDefault();
        }
    }
}
