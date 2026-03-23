using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces.Base;

namespace GestaoGastosResidenciais.Aplicacao.Services.Categoria
{
    public class CategoriaServico(
        IRepositorio<CategoriaEntity> repositorio) : ICategoriaServico
	{
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

		public async Task<List<CategoriaEntity>> Consultar()
		{
			return await Task.FromResult(
						repositorio.Consultar().ToList()
					);
		}

        public Task Deletar(int id)
			=> repositorio.Deletar(id);
	}
}
