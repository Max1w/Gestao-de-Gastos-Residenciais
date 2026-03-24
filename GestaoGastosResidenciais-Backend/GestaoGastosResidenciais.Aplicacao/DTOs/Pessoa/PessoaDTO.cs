using System.ComponentModel.DataAnnotations;

namespace GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa
{
	public class PessoaDTO
    {
        public int Id { get; set; }

		[Required(ErrorMessage = "O nome é obrigatório.")]
		[MaxLength(200, ErrorMessage = "A descrição deve ter no máximo 200 caracteres.")]
		public string? Nome { get; set; }

		[Required(ErrorMessage = "A idade é obrigatória.")]
		[Range(0, 120, ErrorMessage = "A idade deve estar entre 0 e 120 anos.")]
		public int Idade { get; set; }
    }
}
