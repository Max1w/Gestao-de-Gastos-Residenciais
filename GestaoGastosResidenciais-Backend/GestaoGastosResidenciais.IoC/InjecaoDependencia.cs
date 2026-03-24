using GestaoGastosResidenciais.IoC.Configuracoes;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC
{
	// ─── InjecaoDependencia ───────────────────────────────────────────────────────────────────
	// Ponto central de registro de todas as dependências da aplicação
	// Chamado no Program.cs para configurar o container de DI

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
