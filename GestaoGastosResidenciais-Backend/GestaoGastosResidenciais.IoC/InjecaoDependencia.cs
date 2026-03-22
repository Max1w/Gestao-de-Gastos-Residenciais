using GestaoGastosResidenciais.IoC.Configuracoes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC
{
    public static class InjecaoDependencia
    {
        public static IServiceCollection AddInjecaoDependencia(
            this IServiceCollection services, 
            IConfiguration configuration) 
        {
            services.AddInfraestrutura(configuration);
			services.AddAplicacao();
			services.AddRepositios();
			services.AddSeguranca(configuration);
            services.AddPoliticaCors();
			return services;
		}
    }
}
