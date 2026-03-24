using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;

namespace GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface
{
    public interface IPessoaServico
    {
		Task<PessoaDTO> Alterar(PessoaDTO pessoa);
		Task<PessoaDTO> Cadastrar(PessoaDTO pessoa);
		Task<List<PessoaDTO>> Consultar();
		Task Deletar(int id);
		Task<PessoaDTO> BuscarPorId(int id);

	}
}
