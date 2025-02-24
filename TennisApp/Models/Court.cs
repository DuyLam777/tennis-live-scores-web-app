using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TennisApp.Models;
public class Court
{
    public int Id { get; set; }

    [Required]
    public string? Name { get; set; }

    [DefaultValue(false)]
    public bool IsOccupied { get; set; }

    [Required]
    public bool IsIndoor { get; set; }
}