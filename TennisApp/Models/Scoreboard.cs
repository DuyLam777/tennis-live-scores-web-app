using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisApp.Models;

public class Scoreboard
{
    // Remove this if its not needed for the webapp, but it is needed for the mobile app
    public int Id { get; set; }

    public int BatteryLevel { get; set; } // Percentage (0 - 100)

    [DataType(DataType.DateTime)]
    public DateTime LastConnected { get; set; }
}
