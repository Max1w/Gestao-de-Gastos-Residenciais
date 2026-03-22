using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Entidades
{
    public class Categoria : EntidadeBase
	{
		#region Campos
		public string? Descricao { get; set; }
        public byte Finalidade { get; set; }
		#endregion

		#region Navegação
		public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
		#endregion
	}
}
