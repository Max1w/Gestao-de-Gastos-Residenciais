using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{
    [Route("api/categoria")]
    [ApiController]
    public class CategoriaController : PadraoApiController
    {
        private readonly ICategoriaServico _categoria;

        public CategoriaController(ICategoriaServico categoria)
            => _categoria = categoria;

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
