using GestaoGastosResidenciais.Aplicacao.DTOs.Transacao;
using GestaoGastosResidenciais.Aplicacao.Mapeamente.Interface;
using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Aplicacao.Mapeamente
{
	public class TransacaoMapeamento : 
		IParser<TransacaoEntity, TransacaoDTO>, 
		IParser<TransacaoDTO, TransacaoEntity>
	{
		// Entity -> DTO
		public TransacaoEntity Parse(TransacaoDTO origin)
		{
			if (origin == null) return null;

			return new TransacaoEntity
			{
				Id = origin.Id,
				Descricao = origin.Descricao,
				Valor = origin.Valor,
				Tipo = (byte)origin.Tipo,
				DataTransacao = origin.DataTransacao ?? DateTime.Now,
				CategoriaId = origin.CategoriaId,
				PessoaId = origin.PessoaId
			};
		}

		public List<TransacaoEntity> ParseList(List<TransacaoDTO> origin)
		{
			if (origin == null) return null;
			return origin.Select(item => Parse(item)).ToList();
		}

		// DTO -> Entity
		public TransacaoDTO Parse(TransacaoEntity origin)
		{
			if (origin == null) return null;

			return new TransacaoDTO
			{
				Id = origin.Id,
				Descricao = origin.Descricao,
				Valor = origin.Valor,
				Tipo = (Domain.Constantes.TipoTransacao)origin.Tipo,
				DataTransacao = origin.DataTransacao,
				CategoriaId = origin.CategoriaId,
				PessoaId = origin.PessoaId
			};
		}

		public List<TransacaoDTO> ParseList(List<TransacaoEntity> origin)
		{
			if (origin == null) return null;
			return origin.Select(item => Parse(item)).ToList();
		}
	}
}
