using System.ComponentModel.DataAnnotations;
using TennisApp.DTOs;

namespace TennisApp.DTOs
{
    public class CreateMatchDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Court is required!")]
        public int CourtId { get; set; }

        [Required(ErrorMessage = "Match Time is required!")]
        public DateTime MatchTime { get; set; }

        [Required(ErrorMessage = "Player 1 is required!")]
        public int Player1Id { get; set; }

        [Required(ErrorMessage = "Player 2 is required!")]
        public int Player2Id { get; set; }

        [Required(ErrorMessage = "Scoreboard is required!")]
        public int ScoreboardId { get; set; }

        // Optional tournament ID
        public int? TournamentId { get; set; }
    }

    public class MatchDto
    {
        public int Id { get; set; }
        public int CourtId { get; set; }
        public string? CourtName { get; set; }
        public DateTime MatchTime { get; set; }
        public int Player1Id { get; set; }
        public string? Player1Name { get; set; }
        public int Player2Id { get; set; }
        public string? Player2Name { get; set; }
        public int ScoreboardId { get; set; }
        public int? TournamentId { get; set; }
    }

    // DTO for detailed match information including sets and games
    public class MatchDetailDto : MatchDto
    {
        public bool IsIndoor { get; set; }
        public List<SetDto> Sets { get; set; } = new List<SetDto>();
    }

    // DTO for updating a match
    public class UpdateMatchDto
    {
        public int Id { get; set; }

        [Required]
        public int CourtId { get; set; }

        [Required]
        public DateTime MatchTime { get; set; }

        [Required]
        public int Player1Id { get; set; }

        [Required]
        public int Player2Id { get; set; }

        [Required]
        public int ScoreboardId { get; set; }

        public int? TournamentId { get; set; }

        public List<SetDto>? Sets { get; set; }
    }

    // DTO for set information
    public class SetDto
    {
        public int Id { get; set; }
        public int SetNumber { get; set; }
        public int Player1Games { get; set; }
        public int Player2Games { get; set; }
        public bool IsCompleted { get; set; }
        public int? WinnerId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public List<GameDto> Games { get; set; } = new List<GameDto>();
    }

    // DTO for game information
    public class GameDto
    {
        public int Id { get; set; }
        public bool IsCompleted { get; set; }
        public int? WinnerId { get; set; }
    }

    // DTO for creating a new set
    public class CreateSetDto
    {
        [Required]
        public int MatchId { get; set; }
    }
}
