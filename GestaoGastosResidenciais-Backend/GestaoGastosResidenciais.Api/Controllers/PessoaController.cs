using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{
	// ─── PessoaController ───────────────────────────────────────────────────────────────────
	// Controller responsável pelo CRUD de pessoas

	[Route("api/pessoa")]
	[Authorize]
	[ApiController]
    public class PessoaController : PadraoApiController
	{
		private readonly IPessoaServico _pessoa;

		public PessoaController(IPessoaServico pessoa)
			=> _pessoa = pessoa;

		// Cadastra uma nova pessoa e retorna os dados cadastrados
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

		// Atualiza uma pessoa existente e retorna os dados atualizados
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

		// Retorna todas as pessoas cadastradas
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

		// Remove uma pessoa pelo id (também remove as transações vinculadas)
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
