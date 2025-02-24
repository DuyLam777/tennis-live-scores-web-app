public class Club
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public List<Court> Courts { get; set; } = new();
    public List<Scoreboard> Scoreboards { get; set; } = new();
}