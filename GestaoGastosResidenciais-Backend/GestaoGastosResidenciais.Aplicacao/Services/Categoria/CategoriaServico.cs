using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces.Base;

namespace GestaoGastosResidenciais.Aplicacao.Services.Categoria
{
	// ─── CategoriaServico ───────────────────────────────────────────────────────────────────
	// Camada de serviço do CRUD de categorias, converte DTOs em entidades e acessa o repositório

	public class CategoriaServico(
        IRepositorio<CategoriaEntity> repositorio) : ICategoriaServico
	{
		// Mapeia o DTO para entidade e atualiza no banco
		public async Task<CategoriaEntity> Alterar(CategoriaDTO categoria)
        {
			var entidade = new CategoriaEntity
			{
				Id = categoria.Id,
				Descricao = categoria.Descricao,
				Finalidade = (byte)categoria.Finalidade,
			};

			await repositorio.Atualizar(entidade);

			return entidade;
		}

		// Mapeia o DTO para entidade e persiste no banco
		public async Task<CategoriaEntity> Cadastrar(CategoriaDTO categoria)
		{
			var entidade = new CategoriaEntity
			{
				Descricao = categoria.Descricao,
				Finalidade = (byte)categoria.Finalidade,
			};

			await repositorio.Adicionar(entidade);

			return entidade;
		}

		// Retorna todas as categorias cadastradas
		public async Task<List<CategoriaEntity>> Consultar()
		{
			return await Task.FromResult(
						repositorio.Consultar().ToList()
					);
		}

		// Remove a categoria pelo id
		public Task Deletar(int id)
			=> repositorio.Deletar(id);
	}
}
