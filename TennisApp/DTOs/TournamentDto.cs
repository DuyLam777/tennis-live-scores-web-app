using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TennisApp.Models;

namespace TennisApp.DTOs
{
    // Base DTO for Tournament responses
    public class TournamentDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int HostId { get; set; }
        public string? HostName { get; set; }
        public string? Description { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TournamentStatus Status { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TournamentType Type { get; set; }
        public int? MaxParticipants { get; set; }

        // Winner information
        public int? WinnerId { get; set; }
        public string? WinnerName { get; set; }
    }

    // Detailed Tournament DTO including matches
    public class TournamentDetailDto : TournamentDto
    {
        public int DurationInDays { get; set; }
        public List<MatchDto> Matches { get; set; } = new List<MatchDto>();
    }

    // DTO for creating a new tournament
    public class CreateTournamentDto
    {
        [Required(ErrorMessage = "Tournament name is required!")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Start date is required!")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End date is required!")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Host club is required!")]
        public int HostId { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TournamentStatus Status { get; set; } = TournamentStatus.Upcoming;

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TournamentType Type { get; set; } = TournamentType.Singles;
        public int? MaxParticipants { get; set; }
    }

    // DTO for updating an existing tournament
    public class UpdateTournamentDto : CreateTournamentDto
    {
        public int Id { get; set; }
    }

    // DTO for updating tournament status
    public class UpdateTournamentStatusDto
    {
        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TournamentStatus Status { get; set; }
    }

    // DTO for updating tournament winner
    public class UpdateTournamentWinnerDto
    {
        public int? WinnerId { get; set; }
    }
}
