using System.ComponentModel.DataAnnotations;

namespace GestaoGastosResidenciais.Aplicacao.DTOs.Usuario
{
    public class UsuarioDTO
    {
		[Required(ErrorMessage = "O usuario é obrigatório.")]
		[MaxLength(20, ErrorMessage = "A descrição deve ter no máximo 20 caracteres.")]
		public string? Usuario { get; set; }

		public string? Senha { get; set; }
	}
}
