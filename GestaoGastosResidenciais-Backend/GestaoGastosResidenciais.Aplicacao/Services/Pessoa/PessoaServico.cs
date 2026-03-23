using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces.Base;

namespace GestaoGastosResidenciais.Aplicacao.Services.Pessoa
{
    public class PessoaServico(
        IRepositorio<PessoaEntity> repositorio) : IPessoaServico
    {
        public async Task<PessoaEntity> Alterar(PessoaDTO pessoa)
        {
            var entidade = new PessoaEntity
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade,
            };

			await repositorio.Atualizar(entidade);

			return entidade;
		}

        public async Task<PessoaEntity> Cadastrar(PessoaDTO pessoa)
        {
			var entidade = new PessoaEntity
			{
				Nome = pessoa.Nome,
				Idade = pessoa.Idade,
			};

			await repositorio.Adicionar(entidade);

			return entidade;
		}

        public async Task<List<PessoaEntity>> Consultar()
        {
			return await Task.FromResult(
						repositorio.Consultar().ToList()
					);
		}

        public Task Deletar(int id)
			=> repositorio.Deletar(id);


		// Se o front envia-se a data de nascimento, seria utilizado este código
		// para calcular a idade

		//private static int CalcularIdade(PessoaRequisicao pessoa)
		//{
		//	var hoje = DateTime.Today;
		//	var idade = hoje.Year - pessoa.DataNascimento.Year;

		//	if (pessoa.DataNascimento.Date > hoje.AddYears(-idade))
		//	{
		//		idade--;
		//	}

		//	return idade;
		//}
	}
}
