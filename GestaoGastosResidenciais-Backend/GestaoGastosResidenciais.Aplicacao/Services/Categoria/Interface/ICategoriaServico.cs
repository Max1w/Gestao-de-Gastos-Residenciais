using GestaoGastosResidenciais.Aplicacao.DTOs.Categoria;
using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface
{
    public interface ICategoriaServico
    {
		Task<CategoriaEntity> Alterar(CategoriaDTO categoria);
        Task<CategoriaEntity> Cadastrar(CategoriaDTO categoria);
		Task<List<CategoriaEntity>> Consultar();
        Task Deletar(int id);
    }
}
