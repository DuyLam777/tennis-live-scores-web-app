using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TennisApp.Models
{
    public class Match
    {
        public int Id { get; set; }

        [Required]
        public Court? Court { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime MatchTime { get; set; }
        
        [Required]
        public Player? Player1 { get; set; }
        
        [Required]
        public Player? Player2 { get; set; }
        
        public List<Set> Sets { get; set; } = [];

        [Required]
        public Scoreboard? Scoreboard { get; set; }
    }

}