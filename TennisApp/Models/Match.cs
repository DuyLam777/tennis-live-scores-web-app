namespace TennisApp.Models
{
    public class Match
    {
        public int MatchId { get; set; }
        public DateTime MatchTime { get; set; }
        public required Player Player1 { get; set; }
        public required Player Player2 { get; set; }
        public int Player1Score { get; set; }
        public int Player2Score { get; set; }
    }

}