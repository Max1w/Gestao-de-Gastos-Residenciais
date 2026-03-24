using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface
{
    public interface ICategoriaServico
    {
		Task<CategoriaDTO> Cadastrar(CategoriaDTO categoria);
		Task<List<CategoriaDTO>> Consultar();
		Task<CategoriaDTO> BuscarPorId(int id);
	}
}
