public class Court
{
    public int Id { get; set; }
    public string Name { get; set; } // e.g., "Court 1"
    public bool IsOccupied { get; set; }
    public int ClubId { get; set; } // Foreign key to Club
}