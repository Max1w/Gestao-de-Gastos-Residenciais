using GestaoGastosResidenciais.Aplicacao.DTOs.Seguranca;
using GestaoGastosResidenciais.Aplicacao.Services.Seguranca.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;

namespace GestaoGastosResidenciais.Api.Controllers
{
	// ─── SegurancaController ───────────────────────────────────────────────────────────────────
	// Controller responsável pela autenticação do sistema (login e logout)

	[Route("api/seguranca")]
	[Authorize]
	[ApiController]
	public class SegurancaController : PadraoApiController
	{
		private readonly ISegurancaServico _servicoSeguranca;

		public SegurancaController(ISegurancaServico servicoSeguranca)
			=>_servicoSeguranca = servicoSeguranca;

		// Autentica o usuário, armazena o token em cookie HttpOnly e retorna os dados do usuário
		[HttpPost("login")]
		public async Task<IActionResult> Logar([FromBody] LoginDTO requisicao)
		{
			AutenticacaoResposta? resposta;
			try
			{
				resposta = await _servicoSeguranca.Logar(requisicao);
			}
			catch (ArgumentException)
			{
				return Unauthorized(new { mensagem = "Usuário ou senha inválidos." });
			}

			Response.Cookies.Append("TokenAuth", resposta.Token, new CookieOptions
			{
				HttpOnly = true,
				Secure = !Request.Host.Host.Contains("localhost"),
				SameSite = SameSiteMode.Strict,
				MaxAge = TimeSpan.FromHours(8)
			});

			return Sucesso(
				new
				{
					mensagem = "Login realizado com sucesso",
					usuario = new
					{
						resposta.NomeDoUsuario,
						resposta.CodigoDoUsuario,
						resposta.Token,
						resposta.TokenDeAtualizacao
					}
				}
			);
		}

		// Remove o cookie de autenticação encerrando a sessão do usuário
		[HttpPost("logout")]
		public IActionResult Logout()
		{
			Response.Cookies.Delete("TokenAuth");
			return Ok(
				new
				{
					mensagem = "Logout realizado com sucesso"
				}
			);
		}
	}
}

