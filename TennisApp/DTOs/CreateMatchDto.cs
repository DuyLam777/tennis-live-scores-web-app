namespace TennisApp.DTOs
{
    public class CreateMatchDto
    {
        public int CourtId { get; set; }
        public DateTime MatchTime { get; set; } // The time needs to be pushed in UTC format (example: "2024-03-20T15:00:00Z")
        public int Player1Id { get; set; }
        public int Player2Id { get; set; }
        public int ScoreboardId { get; set; }
    }
}