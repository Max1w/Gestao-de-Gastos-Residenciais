using GestaoGastosResidenciais.Aplicacao.DTOs.Transacao;

namespace GestaoGastosResidenciais.Aplicacao.Services.Transacao.Interface
{
    public interface ITransacaoServico
    {
		Task<TransacaoDTO> Cadastrar(TransacaoDTO transacao);
		Task<List<TransacaoDTO>> Consultar();
        Task<List<DadosDaConsultaPorCategorias>> ConsultarTotaisPorCategoria();
        Task<List<DadosDaConsultaPorPessoas>> ConsultarTotaisPorPessoa();
	}
}
