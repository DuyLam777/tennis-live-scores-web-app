public class Scoreboard
{
    // Remove this if its not needed for the webapp, but it is needed for the mobile app
    public int Id { get; set; }
    public string Name { get; set; } // e.g., "Court 1 Scoreboard"
    public string BluetoothDeviceId { get; set; } // For BLE connection
    public int BatteryLevel { get; set; } // Percentage
    public DateTime LastConnected { get; set; }
    public int ClubId { get; set; } // Foreign key to Club
}