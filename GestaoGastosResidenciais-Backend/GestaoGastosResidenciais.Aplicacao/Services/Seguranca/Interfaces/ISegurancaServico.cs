using GestaoGastosResidenciais.Aplicacao.DTOs.Seguranca;

namespace GestaoGastosResidenciais.Aplicacao.Services.Seguranca.Interfaces
{
    public interface ISegurancaServico
    {
		Task<AutenticacaoResposta> Logar(LoginRequisicao credenciais);
		Task<AutenticacaoResposta?> RenovarToken(string tokenDeAtualizacao);
	}
}
