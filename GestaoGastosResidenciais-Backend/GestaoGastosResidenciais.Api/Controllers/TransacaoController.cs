using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Aplicacao.DTOs.Transacao;
using GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface;
using GestaoGastosResidenciais.Aplicacao.Services.Transacao.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{

	// ─── TransacaoController ───────────────────────────────────────────────────────────────────
	// Controller responsável pelo CRUD de transações e consultas de totais

	[Route("api/transacao")]
	[Authorize]
	[ApiController]
    public class TransacaoController : PadraoApiController
	{
        private readonly ITransacaoServico _transacao;

        public TransacaoController(ITransacaoServico transacao)
            => _transacao = transacao;

		// Cadastra uma nova transação e retorna os dados cadastrados
		[HttpPost]
		[Route("cadastrar")]
		public async Task<IActionResult> Cadastrar([FromBody] TransacaoDTO transacao)
		{
			try
			{
				var resultado = await _transacao.Cadastrar(transacao);

				if (resultado == null)
					return NotFound();

				return Ok(resultado);
			}
			catch (Exception e)
			{
				return Erro(e.Message);
			}
		}

		// Atualiza uma transação existente e retorna os dados atualizados
		[HttpPost]
		[Route("alterar")]
		public async Task<IActionResult> Alterar([FromBody] TransacaoDTO transacao)
		{
			try
			{
				var resultado = await _transacao.Alterar(transacao);

				if (resultado == null)
					return NotFound();

				return Ok(resultado);
			}
			catch (Exception e)
			{
				return Erro(e.Message);
			}
		}

		// Retorna todas as transações cadastradas
		[HttpGet]
		[Route("consultar")]
		public async Task<IActionResult> Consultar()
		{
			try
			{
				var resultado = await _transacao.Consultar();
				return Ok(resultado);
			}
			catch (Exception e)
			{
				return BadRequest(new { Message = "Ocorreu um erro ao obter os dados das transações." });
			}
		}

		// Remove uma transação pelo id
		[HttpDelete]
		[Route("remover/{id}")]
		public async Task<IActionResult> Deletar(int id)
		{
			try
			{
				if (id == 0)
					return BadRequest(new { Message = "O ID da transação é inválido." });

				await _transacao.Deletar(id);
				return NoContent();
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}

		// Retorna o total de receitas, despesas e saldo líquido agrupados por categoria
		[HttpGet]
		[Route("consultarTotaisPorCategoria")]
		public async Task<IActionResult> ConsultarPorCategoria()
		{
			try
			{
				var resultado = await _transacao.ConsultarTotaisPorCategoria();
				return Ok(resultado);
			}
			catch (Exception)
			{
				return BadRequest(new { Message = "Ocorreu um erro ao obter os dados das transações." });
			}
		}

		// Retorna o total de receitas, despesas e saldo líquido agrupados por pessoa
		[HttpGet]
		[Route("consultarTotaisPorPessoa")]
		public async Task<IActionResult> ConsultarPorPessoa()
		{
			try
			{
				var resultado = await _transacao.ConsultarTotaisPorPessoa();
				return Ok(resultado);
			}
			catch (Exception)
			{
				return BadRequest(new { Message = "Ocorreu um erro ao obter os dados das transações." });
			}
		}
	}
}
