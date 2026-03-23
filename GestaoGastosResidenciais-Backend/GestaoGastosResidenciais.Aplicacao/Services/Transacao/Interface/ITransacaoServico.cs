using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Aplicacao.DTOs.Transacao;
using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Aplicacao.Services.Transacao.Interface
{
    public interface ITransacaoServico
    {
		Task<TransacaoEntity> Alterar(TransacaoDTO pessoa);
		Task<TransacaoEntity> Cadastrar(TransacaoDTO pessoa);
		Task<List<TransacaoEntity>> Consultar();
        Task<List<DadosDaConsultaPorCategorias>> ConsultarTotaisPorCategoria();
        Task<List<DadosDaConsultaPorPessoas>> ConsultarTotaisPorPessoa();
        Task Deletar(int id);
	}
}
