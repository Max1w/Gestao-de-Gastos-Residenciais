using GestaoGastosResidenciais.Aplicacao.DTOs.Usuario;
using GestaoGastosResidenciais.Aplicacao.Services.Usuario.Interface;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{
	[Route("api/usuario")]
	[ApiController]
	public class UsuarioController : PadraoApiController
    {
        private readonly IUsuarioServico _usuarioService;

		public UsuarioController(IUsuarioServico usuarioService)
			=> _usuarioService = usuarioService;

		[HttpPost]
		[Route("cadastrar")]
		public async Task<IActionResult> Cadastrar(UsuarioDTO usuario)
		{
			try
			{
				ArgumentNullException.ThrowIfNullOrWhiteSpace(usuario.Usuario);
				ArgumentNullException.ThrowIfNullOrWhiteSpace(usuario.Senha);

				_usuarioService.Cadastrar(usuario);
				return Ok(new { mensagem = "Usuário cadastrado com sucesso." });
			}
			catch (ArgumentException ex)
			{
				return BadRequest(new { message = ex.Message });
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = "Erro interno ao cadastrar usuário.", erro = ex.Message });
			}
		}
	}
}
