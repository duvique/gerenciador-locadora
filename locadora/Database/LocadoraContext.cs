
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
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Locacao> Locacoes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Filme>().ToTable("Filme");
            modelBuilder.Entity<Cliente>().ToTable("Cliente")
                .HasIndex((c) => c.CPF)
                .IsUnique();
            modelBuilder.Entity<Locacao>().ToTable("Locacao");
        }


    }
}
