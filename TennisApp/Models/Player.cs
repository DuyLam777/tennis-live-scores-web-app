using System.ComponentModel.DataAnnotations;

namespace TennisApp.Models
{
    public class Player
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        [StringLength(50)]
        public string? Country { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateOnly DateOfBirth { get; set; }

        [Required]
        public Gender gender { get; set; }
    }

    public enum Gender
    {
        Female,
        Male,
    }
}
