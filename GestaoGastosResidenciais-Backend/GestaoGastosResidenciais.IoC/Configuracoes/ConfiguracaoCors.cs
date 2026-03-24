using Microsoft.Extensions.DependencyInjection;

namespace GestaoGastosResidenciais.IoC.Configuracoes
{
	// ─── ConfiguracaoCors ───────────────────────────────────────────────────────────────────
	// Configura a política de CORS permitindo requisições do frontend

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
