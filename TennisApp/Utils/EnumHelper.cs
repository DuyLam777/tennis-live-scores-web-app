using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TennisApp.Utils;
public class EnumHelper
{
    public static string GetDisplayName(Enum value)
    {
        var field = value.GetType().GetField(value.ToString());
        var attribute = field?.GetCustomAttributes(typeof(DisplayAttribute), false)
                             .OfType<DisplayAttribute>()
                             .FirstOrDefault();
        return attribute?.Name ?? value.ToString();
    }
}