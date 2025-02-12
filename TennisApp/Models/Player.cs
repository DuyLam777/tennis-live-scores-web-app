namespace TennisApp.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public required string Name { get; set; }
        public required string Country { get; set; }
        public int Age { get; set; }
        public Gender gender { get; set; }
    }

    public enum Gender
    {
        Female, Male
    }
}