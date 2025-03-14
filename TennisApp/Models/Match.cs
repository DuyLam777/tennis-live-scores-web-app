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
        [Required(ErrorMessage = "Court is required!")]
        public int CourtId { get; set; }

        [Required(ErrorMessage = "Match Time is required!")]
        [DataType(DataType.DateTime)]
        public DateTime MatchTime { get; set; }

        // Navigation property for Player1
        public Player? Player1 { get; set; }

        // Foreign key for Player1
        [Required(ErrorMessage = "Player 1 is required!")]
        public int Player1Id { get; set; }

        // Navigation property for Player2
        public Player? Player2 { get; set; }

        // Foreign key for Player2
        [Required(ErrorMessage = "Player 2 is required!")]
        public int Player2Id { get; set; }

        // Navigation property for Scoreboard
        public Scoreboard? Scoreboard { get; set; }

        // Foreign key for Scoreboard
        [Required(ErrorMessage = "Scoreboard is required!")]
        public int ScoreboardId { get; set; }

        // Navigation property for Tournament
        public Tournament? Tournament { get; set; }

        // Foreign key for Tournament (nullable because matches can exist outside tournaments)
        public int? TournamentId { get; set; }

        // Optional: List of sets (not used in the form)
        public List<Set> Sets { get; set; } = [];

        // Computed properties (for the index page)
        public string CourtName => Court?.Name ?? "N/A";
        public string Player1Name => Player1?.Name ?? "N/A";
        public string Player2Name => Player2?.Name ?? "N/A";
        public string ScoreboardIdString => Scoreboard?.Id.ToString() ?? "N/A";
    }
}
