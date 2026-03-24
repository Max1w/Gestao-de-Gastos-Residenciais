using GestaoGastosResidenciais.Domain.Constantes;
using System.ComponentModel.DataAnnotations;

namespace GestaoGastosResidenciais.Aplicacao.DTOs.Transacao
{
    public class TransacaoDTO
    {
        public int Id { get; set; }

		[MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
		public string? Descricao { get; set; }

		[Required(ErrorMessage = "O valor é obrigatório.")]
		[Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
		public decimal Valor { get; set; }

		[Required(ErrorMessage = "O tipo da transação é obrigatório.")]
		[EnumDataType(typeof(TipoTransacao), ErrorMessage = "O tipo informado é inválido.")]
		public TipoTransacao Tipo { get; set; }

        public DateTime? DataTransacao { get; set; }

		[Required(ErrorMessage = "A categoria é obrigatória.")]
        [Range(1, int.MaxValue, ErrorMessage = "O ID da categoria é inválido.")]
		public int CategoriaId { get; set; }

		[Required(ErrorMessage = "A pessoa é obrigatória.")]
		[Range(1, int.MaxValue, ErrorMessage = "O ID da pessoa é inválido.")]
		public int PessoaId { get; set; }
    }
}
