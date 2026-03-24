namespace GestaoGastosResidenciais.Aplicacao.DTOs.Seguranca
{
	public class AutenticacaoResposta
	{
		public string NomeDoUsuario { get; set; } = string.Empty;
		public int CodigoDoUsuario { get; set; }
		public string Token { get; set; } = string.Empty;
	}
}
