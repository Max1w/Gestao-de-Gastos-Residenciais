using GestaoGastosResidenciais.Aplicacao.DTOs.Seguranca;
using GestaoGastosResidenciais.Aplicacao.Services.Seguranca.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;

namespace GestaoGastosResidenciais.Api.Controllers
{
	[Route("api/auth")]
	[ApiController]
	public class SegurancaController : PadraoApiController
	{
		private readonly ISegurancaServico _servicoSeguranca;

		public SegurancaController(ISegurancaServico servicoSeguranca)
			=>_servicoSeguranca = servicoSeguranca;

		[HttpPost("login")]
		public async Task<IActionResult> Logar([FromBody] LoginRequisicao requisicao)
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

		[HttpPost("refresh")]
		public async Task<IActionResult> Renovar([FromBody] RenovarTokenRequisicao requisicao)
		{
			var resposta = await _servicoSeguranca.RenovarToken(requisicao.TokenDeAtualizacao);

			if (resposta == null) return Unauthorized(new { mensagem = "Token de atualização inválido ou expirado" });

			Response.Cookies.Append("TokenAuth", resposta.Token, new CookieOptions
			{
				HttpOnly = true,
				Secure = !Request.Host.Host.Contains("localhost"),
				SameSite = SameSiteMode.Strict
			});

			return Ok(
				new
				{
					mensagem = "Sessão renovada com sucesso",
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

