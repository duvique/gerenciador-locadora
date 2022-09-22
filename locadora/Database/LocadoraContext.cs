
using locadora.Entities;
using Microsoft.EntityFrameworkCore;

namespace locadora.Database
{
    public class LocadoraContext : DbContext
    {
        public LocadoraContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Filme> Filmes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Filme>().ToTable("Filme");
        }
    }
}
