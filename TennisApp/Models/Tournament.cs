using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisApp.Models
{
    public class Tournament
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tournament name is required!")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Start date is required!")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End date is required!")]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        // Navigation property for Club (host/organizer)
        public Club? Host { get; set; }

        // Foreign key for Host Club
        [Required(ErrorMessage = "Host club is required!")]
        public int HostId { get; set; }

        // Description of the tournament
        [MaxLength(500)]
        public string? Description { get; set; }

        // Status of the tournament (e.g., Upcoming, Ongoing, Completed)
        [Required]
        public TournamentStatus Status { get; set; } = TournamentStatus.Upcoming;

        // Collection of matches in this tournament
        public List<Match> Matches { get; set; } = [];

        // Maximum number of participants
        public int? MaxParticipants { get; set; }

        // Tournament type (e.g., Singles, Doubles, Mixed)
        [Required]
        public TournamentType Type { get; set; } = TournamentType.Singles;

        // Winner information
        public int? WinnerId { get; set; }
        public Player? Winner { get; set; }

        // Computed property for number of registered players/teams
        [NotMapped]
        public int RegisteredCount =>
            Matches
                .Select(m => m.Player1Id)
                .Union(Matches.Select(m => m.Player2Id))
                .Distinct()
                .Count();

        // Computed property for tournament duration in days
        [NotMapped]
        public int DurationInDays => (EndDate - StartDate).Days + 1;
    }

    public enum TournamentStatus
    {
        Upcoming,
        Ongoing,
        Completed,
        Cancelled,
    }

    public enum TournamentType
    {
        Singles,
        Doubles,
        Mixed,
    }
}
