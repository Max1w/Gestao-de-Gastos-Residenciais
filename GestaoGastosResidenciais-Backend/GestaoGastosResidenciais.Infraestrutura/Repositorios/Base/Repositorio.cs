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

		public IQueryable<T> Consultar()
		   => _dbSet.AsQueryable();

		public async Task<T?> BuscarPorId(int id)
		    => await _dbSet.FindAsync(id);

		public async Task<T> Adicionar(T entidade)
        {
            _contexto.Add(entidade);
			await _contexto.SaveChangesAsync();
            return entidade;
        }

        public async Task<T> Atualizar(T entidade)
        {
            var existe = await BuscarPorId(entidade.Id);
			if (existe == null)
				throw new KeyNotFoundException($"O registro com ID {entidade.Id} não foi encontrado.");

            _contexto.Entry(existe).CurrentValues.SetValues(entidade);
			await _contexto.SaveChangesAsync(); 
            return entidade;
		}

		public async Task Deletar(int id)
        {
			var existe = await BuscarPorId(id);
			if (existe == null)
				throw new KeyNotFoundException($"O registro com ID {id} não foi encontrado.");

			_contexto.Remove(existe);
			await _contexto.SaveChangesAsync();
			return;
		}
    }
}
