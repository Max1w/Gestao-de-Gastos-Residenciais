using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Aplicacao.Mapeamente.Interface;
using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Aplicacao.Mapeamente
{
	public class PessoaMapeamento : 
		IParser<PessoaEntity, PessoaDTO>, 
		IParser<PessoaDTO, PessoaEntity>
	{
		// Entity -> DTO
		public PessoaEntity Parse(PessoaDTO origin)
		{
			if (origin == null) return null;

			return new PessoaEntity
			{
				Id = origin.Id,
				Nome = origin.Nome,
				Idade = origin.Idade
			};
		}

		public List<PessoaEntity> ParseList(List<PessoaDTO> origin)
		{
			if (origin == null) return null;
			return origin.Select(item => Parse(item)).ToList();
		}

		// DTO -> Entity
		public PessoaDTO Parse(PessoaEntity origin)
		{
			if (origin == null) return null;

			return new PessoaDTO
			{
				Id = origin.Id,
				Nome = origin.Nome,
				Idade = origin.Idade ?? 0
			};
		}

		public List<PessoaDTO> ParseList(List<PessoaEntity> origin)
		{
			if (origin == null) return null;
			return origin.Select(item => Parse(item)).ToList();
		}
	}
}
