using GestaoGastosResidenciais.Aplicacao.DTOs.Transacao;
using GestaoGastosResidenciais.Aplicacao.Mapeamente;
using GestaoGastosResidenciais.Aplicacao.Services.Categoria;
using GestaoGastosResidenciais.Aplicacao.Services.Categoria.Interface;
using GestaoGastosResidenciais.Aplicacao.Services.Pessoa;
using GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface;
using GestaoGastosResidenciais.Aplicacao.Services.Transacao.Interface;
using GestaoGastosResidenciais.Domain.Constantes;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces.Base;
using GestaoGastosResidenciais.Infraestrutura.Repositorios.Base;
using Microsoft.EntityFrameworkCore;
using System;

namespace GestaoGastosResidenciais.Aplicacao.Services.Transacao
{
	// ─── TransacaoServico ───────────────────────────────────────────────────────────────────
	// Camada de serviço do CRUD de transações e consultas de totais agrupados

	public class TransacaoServico : ITransacaoServico
	{
		private readonly IRepositorio<TransacaoEntity> _repositorio;
		private readonly IPessoaServico _pessoaServico;
		private readonly ICategoriaServico _categoriaServico;
		private readonly TransacaoMapeamento _mapeamento;

		public TransacaoServico(
			IRepositorio<TransacaoEntity> repositorio,
			IPessoaServico pessoaServico,
			ICategoriaServico categoriaServico
		)
		{
			_repositorio = repositorio;
			_pessoaServico = pessoaServico;
			_categoriaServico = categoriaServico;
			_mapeamento = new TransacaoMapeamento();
		}

		// Mapeia o DTO para entidade e persiste no banco
		public async Task<TransacaoDTO> Cadastrar(TransacaoDTO transacao)
		{
			await ValidarSeEhMaiorDeIdade(transacao);
			await ValidarTipoDeTransacao(transacao);

			var entity = _mapeamento.Parse(transacao);
			await _repositorio.Adicionar(entity);
			return _mapeamento.Parse(entity);
		}

		// Validar a maior idade da pessoa selecionada
		private async Task ValidarSeEhMaiorDeIdade(TransacaoDTO transacao)
        {
            var pessoa = await _pessoaServico.BuscarPorId(transacao.PessoaId);

            if ((pessoa.Idade < 18) && (transacao.Tipo == TipoTransacao.Receita))
                throw new InvalidOperationException("A pessoa selecionada possui menos de 18 anos. Por favor, lance apenas despesas ou selecione outra pessoa.");
        }

		// restringir a utilização de categorias conforme o valor definido no campo finalidade.
		private async Task ValidarTipoDeTransacao(TransacaoDTO transacao)
        {
            var categoriaEntidade = await _categoriaServico.BuscarPorId(transacao.CategoriaId);
            var finalidade = (FinalidadeCategoria)categoriaEntidade.Finalidade;

            bool incompativel = (transacao.Tipo == TipoTransacao.Receita && finalidade == FinalidadeCategoria.Despesa) ||
                                (transacao.Tipo == TipoTransacao.Despesa && finalidade == FinalidadeCategoria.Receita);

            if (incompativel)
                throw new InvalidOperationException("Categoria incompatível com o tipo da transação.");
        }

		// Retorna todas as transações cadastradas
		public async Task<List<TransacaoDTO>> Consultar()
		{
			var lista = await _repositorio.Consultar().ToListAsync();
			return _mapeamento.ParseList(lista);
		}

		// Agrupa as transações por categoria e calcula receita, despesa e saldo líquido
		public async Task<List<DadosDaConsultaPorCategorias>> ConsultarTotaisPorCategoria()
		{
			var categoria = await _categoriaServico.Consultar();
			var transacoes = await _repositorio.Consultar().ToListAsync();

			return categoria.Select(c => {
				var tx = transacoes.Where(t => t.CategoriaId == c.Id).ToList();
				return new DadosDaConsultaPorCategorias
				{
					CategoriaId = c.Id,
					NomeCategoria = c.Descricao,
					TotalReceita = tx.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor),
					TotalDespesa = tx.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
					SaldoLiquido = tx.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor)
									- tx.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
				};
			}).OrderBy(x => x.NomeCategoria).ToList();
		}

		// Agrupa as transações por pessoa e calcula receita, despesa e saldo líquido
		public async Task<List<DadosDaConsultaPorPessoas>> ConsultarTotaisPorPessoa()
		{
			var pessoas = await _pessoaServico.Consultar();
			var transacoes = await _repositorio.Consultar().ToListAsync();

			return pessoas.Select(p => {
				var tx = transacoes.Where(t => t.PessoaId == p.Id).ToList();
				return new DadosDaConsultaPorPessoas
				{
					PessoaId = p.Id,
					NomePessoa = p.Nome,
					TotalReceita = tx.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor),
					TotalDespesa = tx.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
					SaldoLiquido = tx.Where(t => t.Tipo == (byte)TipoTransacao.Receita).Sum(t => t.Valor)
								 - tx.Where(t => t.Tipo == (byte)TipoTransacao.Despesa).Sum(t => t.Valor),
				};
			}).OrderBy(x => x.NomePessoa).ToList();
		}
	}
}
