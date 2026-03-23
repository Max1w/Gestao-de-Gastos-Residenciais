namespace GestaoGastosResidenciais.Aplicacao.DTOs.Transacao
{
    public class DadosDaConsultaPorCategorias
    {
		public int CategoriaId { get; set; }
		public string? NomeCategoria { get; set; }
		public decimal TotalReceita { get; set; }
		public decimal TotalDespesa { get; set; }
		public decimal SaldoLiquido { get; set; }
	}
}
