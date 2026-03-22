using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Entidades
{
    public class Usuario : EntidadeBase
	{

		#region Campos
		public int Id { get; set; }

		public string? Username { get; set; }

		public string? SenhaHash { get; set; }

		public string? TokenDeAtualizacao { get; set; }

		public DateTime? ExpiracaoTokenAtualizacao { get; set; }

		#endregion
	}
}
