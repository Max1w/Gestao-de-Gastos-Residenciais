using GestaoGastosResidenciais.Aplicacao.DTOs.Transacao;
using GestaoGastosResidenciais.Aplicacao.Services.Transacao.Interface;
using GestaoGastosResidenciais.Domain.Constantes;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces.Base;
using Microsoft.EntityFrameworkCore;

namespace GestaoGastosResidenciais.Aplicacao.Services.Transacao
{
    public class TransacaoServico(
        IRepositorio<TransacaoEntity> repositorio) : ITransacaoServico
	{
		public async Task<TransacaoEntity> Alterar(TransacaoDTO transacao)
		{
			var entidade = new TransacaoEntity
			{
				Id = transacao.Id,
				DataTransacao = transacao.DataTransacao ?? DateTime.Now,
				Descricao = transacao.Descricao!,
				Tipo = (byte)transacao.Tipo,
				Valor = transacao.Valor,
				CategoriaId = transacao.CategoriaId,
				PessoaId = transacao.PessoaId,
			};

			await repositorio.Atualizar(entidade);

			return entidade;
		}

		public async Task<TransacaoEntity> Cadastrar(TransacaoDTO transacao)
		{
			var entidade = new TransacaoEntity
			{
				DataTransacao = transacao.DataTransacao ?? DateTime.Now,
				Descricao = transacao.Descricao!,
				Tipo = (byte)transacao.Tipo,
				Valor = transacao.Valor,
				CategoriaId = transacao.CategoriaId,
				PessoaId = transacao.PessoaId,
			};

			await repositorio.Adicionar(entidade);

			return entidade;
		}
		public async Task<List<TransacaoEntity>> Consultar()
		{
			return await Task.FromResult(
						repositorio.Consultar().ToList()
					);
		}

        public Task Deletar(int id)
		   => repositorio.Deletar(id);

		public async Task<List<DadosDaConsultaPorCategorias>> ConsultarTotaisPorCategoria()
		{
			var transacoes = await repositorio.Consultar()
				.Include(t => t.Categoria)
				.ToListAsync();

			return transacoes
				.GroupBy(t => new { t.CategoriaId, t.Categoria.Descricao })
				.Select(g => new DadosDaConsultaPorCategorias
				{
					CategoriaId = g.Key.CategoriaId,
					NomeCategoria = g.Key.Descricao,
					TotalReceita = g.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor),
					TotalDespesa = g.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
					SaldoLiquido = g.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor)
								 - g.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
				})
				.OrderBy(x => x.NomeCategoria)
				.ToList();
		}

		public async Task<List<DadosDaConsultaPorPessoas>> ConsultarTotaisPorPessoa()
		{
			var transacoes = await repositorio.Consultar()
				.Include(t => t.Pessoa)
				.ToListAsync();

			return transacoes
				.GroupBy(t => new { t.PessoaId, t.Pessoa.Nome })
				.Select(g => new DadosDaConsultaPorPessoas
				{
					PessoaId = g.Key.PessoaId,
					NomePessoa = g.Key.Nome,
					TotalReceita = g.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor),
					TotalDespesa = g.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
					SaldoLiquido = g.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor)
								 - g.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
				})
				.OrderBy(x => x.NomePessoa)
				.ToList();
		}
	}
}
