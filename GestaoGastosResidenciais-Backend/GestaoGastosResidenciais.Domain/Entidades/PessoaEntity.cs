using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Entidades
{
    public class PessoaEntity : EntidadeBase
	{

		#region Campos
		public string? Nome { get; set; }
        public int? Idade { get; set; }
		#endregion

		#region Navegação
		public ICollection<TransacaoEntity> Transacoes { get; set; } = new List<TransacaoEntity>();
		#endregion
	}
}
