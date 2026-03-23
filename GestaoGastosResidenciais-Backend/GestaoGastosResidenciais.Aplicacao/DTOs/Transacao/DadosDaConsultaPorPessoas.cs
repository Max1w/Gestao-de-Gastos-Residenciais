namespace GestaoGastosResidenciais.Aplicacao.DTOs.Transacao
{
    public class DadosDaConsultaPorPessoas
    {
		public int PessoaId { get; set; }
		public string? NomePessoa { get; set; }
		public decimal TotalReceita { get; set; }
		public decimal TotalDespesa { get; set; }
		public decimal SaldoLiquido { get; set; }
	}
}
