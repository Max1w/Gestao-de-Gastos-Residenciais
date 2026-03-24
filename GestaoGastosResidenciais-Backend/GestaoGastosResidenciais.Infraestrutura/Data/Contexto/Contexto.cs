using GestaoGastosResidenciais.Domain.Entidades;
using Microsoft.EntityFrameworkCore;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Contexto
{
	// ─── Contexto ───────────────────────────────────────────────────────────────────
	// Contexto principal do Entity Framework, expõe as tabelas do banco e aplica as configurações

	public class Contexto(DbContextOptions<Contexto> options)
        : DbContext(options)
    {
        public DbSet<UsuarioEntity> Usuarios => Set<UsuarioEntity>();
        public DbSet<CategoriaEntity> Categorias => Set<CategoriaEntity>();
        public DbSet<PessoaEntity> Pessoas => Set<PessoaEntity>();
        public DbSet<TransacaoEntity> Transacoes => Set<TransacaoEntity>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			// Aplica automaticamente todas as configurações do assembly (ConfiguracaoBase e suas filhas)
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(Contexto).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
