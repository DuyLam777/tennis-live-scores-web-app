public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public UserRole Role { get; set; } // Player, ClubAdmin, SystemAdmin
}

public enum UserRole
{
    Player,
    ClubAdmin,
    SystemAdmin
}