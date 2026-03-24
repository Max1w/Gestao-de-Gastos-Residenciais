using GestaoGastosResidenciais.Domain.Constantes;
using System.ComponentModel.DataAnnotations;

namespace GestaoGastosResidenciais.Aplicacao.DTOs.Categoria
{
	public class CategoriaDTO
    {
        public int Id { get; set; }

		[Required(ErrorMessage = "A descrição é obrigatória.")]
		[MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
		public string? Descricao { get; set; }

		[Required(ErrorMessage = "A finalidade da categoria é obrigatória.")]
		[EnumDataType(typeof(FinalidadeCategoria), ErrorMessage = "A finalidade informada é inválida.")]
		public FinalidadeCategoria Finalidade { get; set; }
    }
}
