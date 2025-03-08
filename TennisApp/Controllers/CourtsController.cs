using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourtsController : ControllerBase
    {
        private readonly TennisAppContext _context;

        public CourtsController(TennisAppContext context)
        {
            _context = context;
        }

        // GET: api/courts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Court>>> GetCourts()
        {
            return await _context.Court.ToListAsync();
        }
    }
}
