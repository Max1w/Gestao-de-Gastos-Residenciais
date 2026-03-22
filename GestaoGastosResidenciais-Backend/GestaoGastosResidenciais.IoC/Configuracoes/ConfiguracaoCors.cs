using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC.Configuracoes
{
    public static class ConfiguracaoCors
    {
        public static IServiceCollection AddPoliticaCors(
			this IServiceCollection services)
		{
			services.AddCors(options =>
			{
				options.AddPolicy("GestaoGastosFront", policy =>
				{
					policy
						.WithOrigins(
							"http://localhost:5173"
						)
						.AllowAnyHeader()
						.AllowAnyMethod()
						.AllowCredentials();
				});
			});
			return services;
		}
	}
}
