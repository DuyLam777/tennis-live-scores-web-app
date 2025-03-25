using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;
using TennisApp.WebSockets;

namespace TennisApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourtsController : ControllerBase
    {
        private readonly TennisAppContext _context;
        private readonly IWebSocketHandler _webSocketHandler;

        public CourtsController(TennisAppContext context, IWebSocketHandler webSocketHandler)
        {
            _context = context;
            _webSocketHandler = webSocketHandler;
        }

        // GET: api/Courts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Court>>> GetCourts()
        {
            return await _context.Court.ToListAsync();
        }

        // GET: api/Courts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Court>> GetCourt(int id)
        {
            var court = await _context.Court.FindAsync(id);

            if (court == null)
            {
                return NotFound();
            }

            return court;
        }

        // PUT: api/Courts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourt(int id, Court court)
        {
            if (id != court.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Fetch the existing entity from the database
            var existingCourt = await _context.Court.FindAsync(id);
            if (existingCourt == null)
            {
                return NotFound();
            }

            // Update the properties of the existing entity
            existingCourt.Name = court.Name;
            existingCourt.IsOccupied = court.IsOccupied;
            existingCourt.IsIndoor = court.IsIndoor;

            try
            {
                // Save the changes
                await _context.SaveChangesAsync();

                // Broadcast the updated court availability
                await _webSocketHandler.BroadcastCourtAvailabilityAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourtExists(id))
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

        // POST: api/Courts
        [HttpPost]
        public async Task<ActionResult<Court>> PostCourt(Court court)
        {
            _context.Court.Add(court);
            await _context.SaveChangesAsync();

            // Broadcast court availability update when new court is added
            await _webSocketHandler.BroadcastCourtAvailabilityAsync();

            return CreatedAtAction("GetCourt", new { id = court.Id }, court);
        }

        // DELETE: api/Courts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourt(int id)
        {
            var court = await _context.Court.FindAsync(id);
            if (court == null)
            {
                return NotFound();
            }

            _context.Court.Remove(court);
            await _context.SaveChangesAsync();

            // Broadcast court availability update when court is deleted
            await _webSocketHandler.BroadcastCourtAvailabilityAsync();

            return NoContent();
        }

        // PATCH: api/Courts/5/toggleOccupation
        [HttpPatch("{id}/toggleOccupation")]
        public async Task<IActionResult> ToggleCourtOccupation(int id)
        {
            var court = await _context.Court.FindAsync(id);
            if (court == null)
            {
                return NotFound();
            }

            // Toggle the occupation status
            court.IsOccupied = !court.IsOccupied;
            await _context.SaveChangesAsync();

            // Broadcast court availability update
            await _webSocketHandler.BroadcastCourtAvailabilityAsync();

            return NoContent();
        }

        private bool CourtExists(int id)
        {
            return _context.Court.Any(e => e.Id == id);
        }
    }
}
