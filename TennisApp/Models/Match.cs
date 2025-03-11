using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisApp.Models
{
    public class Match
    {
        public int Id { get; set; }

        // Navigation property for Court
        public Court? Court { get; set; }

        // Foreign key for Court
        // [Required(ErrorMessage = "Court is required!")]
        // [Range(1, int.MaxValue, ErrorMessage = "Please select a valid court.")]
        public int CourtId { get; set; }

        [Required(ErrorMessage = "Match Time is required!")]
        [DataType(DataType.DateTime)]
        public DateTime MatchTime { get; set; }

        // Navigation property for Player1
        public Player? Player1 { get; set; }

        // Foreign key for Player1
        // [Required(ErrorMessage = "Player 1 is required!")]
        // [Range(1, int.MaxValue, ErrorMessage = "Please select a valid player.")]
        public int Player1Id { get; set; }

        // Navigation property for Player2
        public Player? Player2 { get; set; }

        // Foreign key for Player2
        // [Required(ErrorMessage = "Player 2 is required!")]
        // [Range(1, int.MaxValue, ErrorMessage = "Please select a valid player.")]
        public int Player2Id { get; set; }

        // Navigation property for Scoreboard
        public Scoreboard? Scoreboard { get; set; }

        // Foreign key for Scoreboard
        // [Required(ErrorMessage = "Scoreboard is required!")]
        // [Range(1, int.MaxValue, ErrorMessage = "Please select a valid scoreboard.")]
        public int ScoreboardId { get; set; }

        // Optional: List of sets (not used in the form)
        public List<Set> Sets { get; set; } = [];
    }
}
