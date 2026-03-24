using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{

	// ─── CategoriaController ───────────────────────────────────────────────────────────────────
	// Controller responsável pelo CRUD de categorias

	[Route("api/categoria")]
	[Authorize]
	[ApiController]
    public class CategoriaController : PadraoApiController
    {
        private readonly ICategoriaServico _categoria;

		public CategoriaController(ICategoriaServico categoria)
            => _categoria = categoria;

		// Cadastra uma nova categoria e retorna os dados cadastrados
		[HttpPost]
        [Route("cadastrar")] 
        public async Task<IActionResult> Cadastrar([FromBody] CategoriaDTO categoria)
        {
            try
            {
				var resultado = await _categoria.Cadastrar(categoria);

				if (resultado == null)
					return NotFound();

				return Ok(resultado);
			}
            catch (Exception e)
            {
                return Erro(e.Message);
            }
        }

		// Atualiza uma categoria existente e retorna os dados atualizados
		[HttpPut]
		[Route("alterar")]
		public async Task<IActionResult> Alterar([FromBody] CategoriaDTO categoria)
		{
			try
			{
				var resultado = await _categoria.Alterar(categoria);

				if (resultado == null)
					return NotFound();

				return Ok(resultado);
			}
			catch (Exception e)
			{
				return Erro(e.Message);
			}
		}

		// Retorna todas as categorias cadastradas
		[HttpGet]
		[Route("consultar")]
		public async Task<IActionResult> Consultar()
		{
			try
			{
				var resultado = await _categoria.Consultar();
				return Ok(resultado);
			}
			catch (Exception e)
			{
				return BadRequest(new { Message = "Ocorreu um erro ao obter as categorias." });
			}
		}

		// Remove uma categoria pelo id (também remove as transações vinculadas)
		[HttpDelete]
		[Route("remover/{id}")]
		public async Task<IActionResult> Deletar(int id)
		{
			try
			{
				if (id == 0)
					return BadRequest(new { Message = "O ID da categoria é inválido." });

				await _categoria.Deletar(id);
				return NoContent();
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}
	}
}
