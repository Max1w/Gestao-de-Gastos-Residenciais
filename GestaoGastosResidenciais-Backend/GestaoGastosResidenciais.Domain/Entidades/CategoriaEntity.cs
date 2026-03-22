using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Entidades
{
    public class CategoriaEntity : EntidadeBase
	{
		#region Campos
		public string? Descricao { get; set; }
        public byte Finalidade { get; set; }
		#endregion

		#region Navegação
		public ICollection<TransacaoEntity> Transacoes { get; set; } = new List<TransacaoEntity>();
		#endregion
	}
}
