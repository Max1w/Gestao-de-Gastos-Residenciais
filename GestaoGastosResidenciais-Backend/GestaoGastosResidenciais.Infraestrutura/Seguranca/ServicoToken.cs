using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GestaoGastosResidenciais.Infraestrutura.Seguranca
{
	// ─── ServicoToken ───────────────────────────────────────────────────────────────────
	// Responsável por gerar tokens JWT e tokens de atualização

	public class ServicoToken(IConfiguration configuration) : IServicoToken
	{
		// Gera um token JWT com id e username do usuário, válido por 1 hora

		public string GerarToken(UsuarioEntity usuario)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.Username!)
            };

			var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"] ?? throw new InvalidOperationException("JWT Secret não configurada")));
			var credencias = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: configuration["Jwt:Issuer"],
				audience: configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddHours(1),
				signingCredentials: credencias);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
    }
}
