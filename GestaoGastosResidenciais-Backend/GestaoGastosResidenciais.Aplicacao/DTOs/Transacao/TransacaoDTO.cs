using GestaoGastosResidenciais.Domain.Constantes;

namespace GestaoGastosResidenciais.Aplicacao.DTOs.Transacao
{
    public class TransacaoDTO
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public DateTime? DataTransacao { get; set; }

        public int CategoriaId { get; set; }
        public int PessoaId { get; set; }
    }
}
