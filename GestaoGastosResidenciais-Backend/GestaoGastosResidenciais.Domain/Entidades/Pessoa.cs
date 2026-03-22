using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Entidades
{
    public class Pessoa : EntidadeBase
	{

		#region Campos
		public string? Nome { get; set; }
        public int? Idade { get; set; }
		#endregion

		#region Navegação
		public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
		#endregion
	}
}
