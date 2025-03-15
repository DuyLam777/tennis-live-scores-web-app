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

        public ClubController(TennisAppContext context, ILogger<ClubController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Club
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Club>>> GetClubs()
        {
            return await _context.Club.ToListAsync();
        }

        // GET: api/Club/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Club>> GetClub(int id)
        {
            var club = await _context.Club.FindAsync(id);

            if (club == null)
            {
                return NotFound();
            }

            return club;
        }

        // POST: api/Club
        [HttpPost]
        public async Task<ActionResult<Club>> CreateClub(Club club)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Club.Add(club);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClub), new { id = club.Id }, club);
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

            // Fetch the existing entity from the database
            var existingClub = await _context.Club.FindAsync(id);
            if (existingClub == null)
            {
                return NotFound();
            }

            // Update the properties of the existing entity
            existingClub.Name = club.Name;
            existingClub.Players = club.Players;

            try
            {
                // Save the changes
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
            return _context.Club.Any(c => c.Id == id);
        }
    }
}
