using GestaoGastosResidenciais.Api.Respostas;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PadraoApiController : ControllerBase
	{
		protected IActionResult AcessoNegado(string mensagem)
		{
			return StatusCode(403, new MensagemRespostaResponse(mensagem));
		}

		protected IActionResult RequisicaoInvalida(string mensagem, string erro = null!)
		{
			if (string.IsNullOrEmpty(erro))
				return BadRequest(new { Message = mensagem });
			return BadRequest(new { Message = mensagem, Error = erro });
		}

		protected IActionResult Erro(string mensagem, Exception ex = null!)
		{
#if DEBUG
			var resposta = new MensagemRespostaResponse(mensagem, string.Concat(ex?.Message, "\r\n", ex?.StackTrace));
#else
			var resposta = new MensagemRespostaResponse(mensagem);
#endif

			return StatusCode(statusCode: 500, value: resposta);
		}

		protected IActionResult Sucesso(object objeto)
		{
			return Ok(objeto);
		}

		protected IActionResult Sucesso()
		{
			return Ok();
		}
	}
}
