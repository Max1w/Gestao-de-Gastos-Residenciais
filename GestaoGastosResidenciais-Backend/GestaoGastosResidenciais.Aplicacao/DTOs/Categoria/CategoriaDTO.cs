using GestaoGastosResidenciais.Domain.Constantes;

namespace GestaoGastosResidenciais.Aplicacao.DTOs.Categoria
{
	public class CategoriaDTO
    {
        public int Id { get; set; }
		public string? Descricao { get; set; }
        public FinalidadeCategoria Finalidade { get; set; }
    }
}
