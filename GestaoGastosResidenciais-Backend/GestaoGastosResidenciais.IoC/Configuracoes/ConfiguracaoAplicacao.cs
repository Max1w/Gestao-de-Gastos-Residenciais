using GestaoGastosResidenciais.Aplicacao.Services.Versao;
using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC.Configuracoes
{
    public static class ConfiguracaoAplicacao
    {
		public static IServiceCollection AddAplicacao(
			this IServiceCollection services)
		{
			typeof(VersaoService).Assembly.GetExportedTypes()
				.Where(tipo => tipo.IsClass && !tipo.IsAbstract && tipo.GetInterfaces().Any())
				.ToList()
				.ForEach(tipo =>
				{
					foreach (var inter in tipo.GetInterfaces())
					{
						if (inter.Name == "I" + tipo.Name)
						{
							services.AddScoped(inter, tipo);
							break;
						}
					}
				});
			return services;
		}
	}
}
