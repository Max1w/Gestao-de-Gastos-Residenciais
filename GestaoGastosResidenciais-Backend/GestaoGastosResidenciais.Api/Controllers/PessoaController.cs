using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{
    [Route("api/pessoa")]
    [ApiController]
    public class PessoaController : PadraoApiController
	{
		private readonly IPessoaServico _pessoa;

		public PessoaController(IPessoaServico pessoa)
			=> _pessoa = pessoa;

		[HttpPost]
		[Route("cadastrar")]
		public async Task<IActionResult> Cadastrar([FromBody] PessoaDTO pessoa)
		{
			try
			{
				var resultado = await _pessoa.Cadastrar(pessoa);

				if (resultado == null)
					return NotFound();

				return Ok(resultado);
			}
			catch (Exception e)
			{
				return Erro(e.Message);
			}
		}

		[HttpPut]
		[Route("alterar")]
		public async Task<IActionResult> Alterar([FromBody] PessoaDTO pessoa)
		{
			try
			{
				var resultado = await _pessoa.Alterar(pessoa);

				if (resultado == null)
					return NotFound();

				return Ok(resultado);
			}
			catch (Exception e)
			{
				return Erro(e.Message);
			}
		}

		[HttpGet]
		[Route("consultar")]
		public async Task<IActionResult> Consultar()
		{
			try
			{
				var resultado = await _pessoa.Consultar();
				return Ok(resultado);
			}
			catch (Exception e)
			{
				return BadRequest(new { Message = "Ocorreu um erro ao obter os dados das pessoas." });
			}
		}

		[HttpDelete]
		[Route("remover/{id}")]
		public async Task<IActionResult> Deletar(int id)
		{
			try
			{
				if (id == 0)
					return BadRequest(new { Message = "O ID da pessoa é inválido." });

				await _pessoa.Deletar(id);
				return NoContent();
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}
	}
}
