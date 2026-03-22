using GestaoGastosResidenciais.Domain.Entidades.Base;
using GestaoGastosResidenciais.Domain.Interfaces.Base;
using GestaoGastosResidenciais.Infraestrutura.Data.Contexto;
using Microsoft.EntityFrameworkCore;

namespace GestaoGastosResidenciais.Infraestrutura.Repositorios.Base
{
    public class Repositorio<T> : IRepositorio<T>
        where T : EntidadeBase
    {
        private readonly Contexto _contexto;
        private readonly DbSet<T> _dbSet;

        public Repositorio(Contexto contexto)
        {
            _contexto = contexto;
			_dbSet = contexto.Set<T>();
		}

		public List<T> BuscarTudo()
		   => _dbSet.ToList();

		public T? BuscarPorId(int id)
		    => _dbSet.Find(id);

		public T Adicionar(T entidade)
        {
            _contexto.Add(entidade);
            _contexto.SaveChanges();
            return entidade;
        }

        public T Atualizar(T entidade)
        {
            var existe = BuscarPorId(entidade.Id);
			if (existe == null)
				throw new KeyNotFoundException($"O registro com ID {entidade.Id} não foi encontrado.");

            _contexto.Entry(existe).CurrentValues.SetValues(entidade);
            _contexto.SaveChanges(); 
            return entidade;
		}

		public void Deletar(int id)
        {
			var existe = BuscarPorId(id);
			if (existe == null)
				throw new KeyNotFoundException($"O registro com ID {id} não foi encontrado.");

			_contexto.Remove(existe);
			_contexto.SaveChanges();
			return;
		}
    }
}
