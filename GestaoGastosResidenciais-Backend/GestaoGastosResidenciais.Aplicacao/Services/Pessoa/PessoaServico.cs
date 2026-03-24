using GestaoGastosResidenciais.Aplicacao.DTOs.Pessoa;
using GestaoGastosResidenciais.Aplicacao.Mapeamente;
using GestaoGastosResidenciais.Aplicacao.Services.Pessoa.Interface;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces.Base;

namespace GestaoGastosResidenciais.Aplicacao.Services.Pessoa
{
	// ─── PessoaServico ───────────────────────────────────────────────────────────────────
	// Camada de serviço do CRUD de pessoas, converte DTOs em entidades e acessa o repositório

	public class PessoaServico : IPessoaServico
    {
		private readonly IRepositorio<PessoaEntity> _repositorio;
		private readonly PessoaMapeamento _mapeamento;

		public PessoaServico(IRepositorio<PessoaEntity> repositorio)
		{
			_repositorio = repositorio;
			_mapeamento = new PessoaMapeamento();
		}

		// Mapeia o DTO para entidade e atualiza no banco
		public async Task<PessoaDTO> Alterar(PessoaDTO pessoa)
		{
			var entity = _mapeamento.Parse(pessoa);
			await _repositorio.Atualizar(entity);
			return _mapeamento.Parse(entity);
		}

		// Mapeia o DTO para entidade e persiste no banco
		public async Task<PessoaDTO> Cadastrar(PessoaDTO pessoa)
		{
			var entity = _mapeamento.Parse(pessoa);
			await _repositorio.Adicionar(entity);
			return _mapeamento.Parse(entity);
		}

		// Retorna todas as pessoas cadastradas
		public Task<List<PessoaDTO>> Consultar()
		{
			var lista = _repositorio.Consultar().ToList();
			return Task.FromResult(_mapeamento.ParseList(lista));
		}

		public Task<PessoaDTO> BuscarPorId(int id)
		{
			var entity = _repositorio.Consultar().FirstOrDefault(p => p.Id == id);

			if (entity == null)
				throw new KeyNotFoundException($"Pessoa com id {id} não encontrada.");

			return Task.FromResult(_mapeamento.Parse(entity));
		}

		// Remove a pessoa pelo id
		public Task Deletar(int id)
			=> _repositorio.Deletar(id);

        // Se o front enviasse a data de nascimento, seria utilizado este código
        // para calcular a idade

        //private static int CalcularIdade(PessoaRequisicao pessoa)
        //{
        //	var hoje = DateTime.Today;
        //	var idade = hoje.Year - pessoa.DataNascimento.Year;

        //	if (pessoa.DataNascimento.Date > hoje.AddYears(-idade))
        //	{
        //		idade--;
        //	}

        //	return idade;
        //}
    }
}
