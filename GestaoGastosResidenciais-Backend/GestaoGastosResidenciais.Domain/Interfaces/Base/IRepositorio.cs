using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Interfaces.Base
{
    public interface IRepositorio<T>
		where T : EntidadeBase
	{
		Task<T?> BuscarPorId(int id);
		IQueryable<T> Consultar();
		Task<T> Adicionar(T entidade);
		Task<T> Atualizar(T entidade);
		Task Deletar(int id);
    }
}
