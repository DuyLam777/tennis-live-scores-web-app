
using System.ComponentModel.DataAnnotations;

namespace TennisApp.Models;
public class Club
{
    public int Id { get; set; }

    [Required]
    [MaxLength(40)]
    public string? Name { get; set; }

    public List<Player> Players { get; set; } = [];

}