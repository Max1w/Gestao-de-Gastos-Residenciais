using GestaoGastosResidenciais.Domain.Interfaces.Base;
using GestaoGastosResidenciais.Infraestrutura.Repositorios.Base;
using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC.Configuracoes
{
    public static class ConfiguracaoRepositorio
    {
		// ─── ConfiguracaoRepositorio ───────────────────────────────────────────────────────────────────
		// Registra o repositório genérico para todas as entidades do sistema

		public static IServiceCollection AddRepositios(
			this IServiceCollection services)
		{
			services.AddScoped(typeof(IRepositorio<>), typeof(Repositorio<>));
			return services;
		}
	}
}
