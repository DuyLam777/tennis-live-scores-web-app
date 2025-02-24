using System.ComponentModel.DataAnnotations;

namespace TennisApp.Models
{
    public class Venue
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
        
        [Required]
        public string? Address { get; set; }

        public List<Court> Courts { get; set; } = [];
    }
}