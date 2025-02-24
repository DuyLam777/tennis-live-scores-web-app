using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TennisApp.Models;

public class User
{
    public int Id { get; set; }

    [DataType(DataType.EmailAddress)]
    public string? Email { get; set; }

    [DataType(DataType.Password)]
    public string? Password { get; set; }
    public UserRole Role { get; set; } // Player, ClubAdmin, SystemAdmin
}

public enum UserRole
{
    [Display(Name = "Player")]
    Player,
    [Display(Name = "Club")]
    Club,
    [Display(Name = "System Admin")]
    SystemAdmin
}