using GestaoGastosResidenciais.Infraestrutura.Data.Contexto;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC.Configuracoes
{
	// ─── ConfiguracaoInfraestrutura ───────────────────────────────────────────────────────────────────
	// Configura o contexto do Entity Framework com SQL Server

	public static class ConfiguracaoInfraestrutura
    {
        public static IServiceCollection AddInfraestrutura(
            this IServiceCollection services,
            IConfiguration configuration) 
        {
			services.AddDbContext<Contexto>(options =>
				options.UseSqlServer(
					configuration.GetConnectionString("DefaultConnection")
				));
			return services;
		}
    }
}
