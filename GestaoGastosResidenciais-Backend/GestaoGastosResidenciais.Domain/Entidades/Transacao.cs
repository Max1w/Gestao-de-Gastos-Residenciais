using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Entidades
{
    public class Transacao : EntidadeBase
    {
		#region Campos
		public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public byte Tipo { get; set; }
        public DateTime DataTransacao { get; set; }
		#endregion

		#region FK
		public int CategoriaId { get; set; }
		public int PessoaId { get; set; }
		#endregion

		#region Navegação
		public Categoria Categoria { get; set; } = null!;
		public Pessoa Pessoa { get; set; } = null!;
		#endregion
	}
}
