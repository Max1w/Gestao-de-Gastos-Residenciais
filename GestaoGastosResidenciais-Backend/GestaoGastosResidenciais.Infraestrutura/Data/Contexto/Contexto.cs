using GestaoGastosResidenciais.Domain.Entidades;
using Microsoft.EntityFrameworkCore;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Contexto
{
    public class Contexto(DbContextOptions<Contexto> options)
        : DbContext(options)
    {
        public DbSet<Usuario> Usuarios => Set<Usuario>();
        public DbSet<Categoria> Categorias => Set<Categoria>();
        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
        public DbSet<Transacao> Transacoes => Set<Transacao>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(Contexto).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
