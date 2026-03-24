using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Aplicacao.Mapeamente.Interface;
using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Aplicacao.Mapeamente
{
	public class CategoriaMapeamento 
		: IParser<CategoriaEntity, CategoriaDTO>, IParser<CategoriaDTO, CategoriaEntity>
	{
		// DTO -> Entity
		public CategoriaEntity Parse(CategoriaDTO origin)
		{
			if (origin == null) return null!;

			return new CategoriaEntity
			{
				Id = origin.Id,
				Descricao = origin.Descricao,
				Finalidade = (byte)origin.Finalidade
			};
		}

		public List<CategoriaEntity> ParseList(List<CategoriaDTO> origin)
		{
			if (origin == null) return null!;

			return origin.Select(item => Parse(item)).ToList();
		}

		// Entity -> DTO
		public CategoriaDTO Parse(CategoriaEntity origin)
		{
			if (origin == null) return null!;

			return new CategoriaDTO
			{
				Id = origin.Id,
				Descricao = origin.Descricao,
				Finalidade = (Domain.Constantes.FinalidadeCategoria)origin.Finalidade
			};
		}

		public List<CategoriaDTO> ParseList(List<CategoriaEntity> origin)
		{
			if (origin == null) return null!;

			return origin.Select(item => Parse(item)).ToList();
		}
	}
}
