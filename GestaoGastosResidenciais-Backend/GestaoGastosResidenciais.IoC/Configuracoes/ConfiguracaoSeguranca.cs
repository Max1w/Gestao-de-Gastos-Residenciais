using GestaoGastosResidenciais.Aplicacao.Services.Seguranca;
using GestaoGastosResidenciais.Aplicacao.Services.Seguranca.Interfaces;
using GestaoGastosResidenciais.Domain.Interfaces;
using GestaoGastosResidenciais.Infraestrutura.Seguranca;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GestaoGastosResidenciais.IoC.Configuracoes
{
	// ─── ConfiguracaoSeguranca ───────────────────────────────────────────────────────────────────
	// Configura autenticação JWT, leitura do token via cookie e registra os serviços de segurança

	public static class ConfiguracaoSeguranca
    {
        public static IServiceCollection AddSeguranca(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var secret = configuration["Jwt:Secret"]
				?? throw new InvalidOperationException("Jwt:Secret não configurado.");

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = configuration["Jwt:Issuer"],
						ValidAudience = configuration["Jwt:Audience"],
						IssuerSigningKey = new SymmetricSecurityKey(
							Encoding.UTF8.GetBytes(secret)),
						ClockSkew = TimeSpan.Zero
					};

					options.Events = new JwtBearerEvents
					{
						OnMessageReceived = context =>
						{
							var tokenCookie = context.Request.Cookies["TokenAuth"];
							if (!string.IsNullOrEmpty(tokenCookie))
							{
								context.Token = tokenCookie;
							}
							return Task.CompletedTask;
						},
						OnAuthenticationFailed = context =>
						{
							Console.WriteLine("=== Falha na Autenticação: JWT ===");
							Console.WriteLine(context.Exception?.ToString());
							return Task.CompletedTask;
						}
					};
				});

			services.AddAuthorization();

			services.AddScoped<IHashSenha, HashSenha>();
			services.AddScoped<IServicoToken, ServicoToken>();
			services.AddScoped<ISegurancaServico, SegurancaServico>();

			return services;
		}
    }
}
