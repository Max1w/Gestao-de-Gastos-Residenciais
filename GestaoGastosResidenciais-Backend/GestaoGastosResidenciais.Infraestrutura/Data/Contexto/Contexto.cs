using GestaoGastosResidenciais.Domain.Entidades;
using Microsoft.EntityFrameworkCore;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Contexto
{
    public class Contexto(DbContextOptions<Contexto> options)
        : DbContext(options)
    {
        public DbSet<UsuarioEntity> Usuarios => Set<UsuarioEntity>();
        public DbSet<CategoriaEntity> Categorias => Set<CategoriaEntity>();
        public DbSet<PessoaEntity> Pessoas => Set<PessoaEntity>();
        public DbSet<TransacaoEntity> Transacoes => Set<TransacaoEntity>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(Contexto).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
