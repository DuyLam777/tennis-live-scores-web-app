using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TennisApp.Data
{
    public class TennisAppContextFactory : IDesignTimeDbContextFactory<TennisAppContext>
    {
        public TennisAppContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TennisAppContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=tennisappdb;Username=postgres;Password=password");

            return new TennisAppContext(optionsBuilder.Options);
        }
    }
}