namespace GestaoGastosResidenciais.Api.Respostas
{
    public record MensagemRespostaResponse
    {
		public string Mensagem { get; set; }
		public string? Detalhes { get; set; }

		public MensagemRespostaResponse(string mensagem, string? detalhes = null)
		{
			Mensagem = mensagem;
			Detalhes = detalhes;
		}
	}
}
