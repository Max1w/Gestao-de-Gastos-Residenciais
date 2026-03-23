using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface
{
    public interface IPessoaServico
    {
		Task<PessoaEntity> Alterar(PessoaDTO pessoa);
		Task<PessoaEntity> Cadastrar(PessoaDTO pessoa);
		Task<List<PessoaEntity>> Consultar();
		Task Deletar(int id);
	}
}
