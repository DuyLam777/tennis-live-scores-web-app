using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisApp.Data;
using TennisApp.Models;

namespace TennisApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreboardsController : ControllerBase
    {
        private readonly TennisAppContext _context;

        public ScoreboardsController(TennisAppContext context)
        {
            _context = context;
        }

        // GET: api/scoreboards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Scoreboard>>> GetScoreboards()
        {
            return await _context.Scoreboard.ToListAsync();
        }
    }
}
