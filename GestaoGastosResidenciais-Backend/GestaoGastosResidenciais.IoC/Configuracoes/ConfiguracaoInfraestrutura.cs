using GestaoGastosResidenciais.Infraestrutura.Data.Contexto;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC.Configuracoes
{
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
