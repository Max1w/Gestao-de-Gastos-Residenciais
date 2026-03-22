using GestaoGastosResidenciais.Domain.Entidades.Base;

namespace GestaoGastosResidenciais.Domain.Interfaces.Base
{
    public interface IRepositorio<T>
		where T : EntidadeBase
	{
		T? BuscarPorId(int id);
		List<T> BuscarTudo();
		T Adicionar(T entidade);
		T Atualizar(T entidade);
		void Deletar(int id);
    }
}
