using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.Mapeamente;
using GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces.Base;

namespace GestaoGastosResidenciais.Aplicacao.Services.Categoria
{
	// ─── CategoriaServico ───────────────────────────────────────────────────────────────────
	// Camada de serviço do CRUD de categorias, converte DTOs em entidades e acessa o repositório

	public class CategoriaServico : ICategoriaServico
	{
		private readonly IRepositorio<CategoriaEntity> _repositorio;
		private readonly CategoriaMapeamento _mapeamento;

        public CategoriaServico(IRepositorio<CategoriaEntity> repositorio)
        {
            _repositorio = repositorio;
            _mapeamento = new CategoriaMapeamento();
        }

        // Mapeia o DTO para entidade e persiste no banco
        public async Task<CategoriaDTO> Cadastrar(CategoriaDTO categoria)
		{
			var entity = _mapeamento.Parse(categoria);
			await _repositorio.Adicionar(entity);
			return _mapeamento.Parse(entity);
		}

		// Retorna todas as categorias cadastradas
		public Task<List<CategoriaDTO>> Consultar()
		{
			var lista = _repositorio.Consultar().ToList();
			return Task.FromResult(_mapeamento.ParseList(lista));
		}

		public Task<CategoriaDTO> BuscarPorId(int id)
		{
			var entity = _repositorio.Consultar().FirstOrDefault(x => x.Id == id);

			if (entity is null)
				throw new KeyNotFoundException($"Categoria com id {id} não encontrada.");

			return Task.FromResult(_mapeamento.Parse(entity));
		}
	}
}
