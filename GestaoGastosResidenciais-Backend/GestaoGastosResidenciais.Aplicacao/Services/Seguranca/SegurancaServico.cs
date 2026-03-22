using GestaoGastosResidenciais.Aplicacao.DTOs.Seguranca;
using GestaoGastosResidenciais.Aplicacao.Services.Seguranca.Interfaces;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces;
using GestaoGastosResidenciais.Domain.Interfaces.Base;
using Microsoft.EntityFrameworkCore;

namespace GestaoGastosResidenciais.Aplicacao.Services.Seguranca
{
    public class SegurancaServico(
        IRepositorio<UsuarioEntity> usuarioRepositorio,
		IHashSenha hashSenha,
		IServicoToken servicoToken) : ISegurancaServico
    {
        public async Task<AutenticacaoResposta> Logar(LoginRequisicao credenciais)
        {
			var usuario = await usuarioRepositorio.Consultar()
				.FirstOrDefaultAsync(u => u.Username == credenciais.Usuario);

			if ((usuario == null) || (!hashSenha.VerificarSenha(credenciais.Senha, usuario.SenhaHash!)))
				throw new ArgumentException("Usuário ou senha inválidos.");

			var token = servicoToken.GerarToken(usuario);
			var tokenDeAtualizacao = servicoToken.GerarTokenDeAtualizacao();

			usuario.TokenDeAtualizacao = tokenDeAtualizacao;
			usuario.ExpiracaoTokenAtualizacao = DateTime.UtcNow.AddDays(1);

			await usuarioRepositorio.Atualizar(usuario);

			return new AutenticacaoResposta
			{
				NomeDoUsuario = usuario.Username!,
				CodigoDoUsuario = usuario.Id,
				Token = token,
				TokenDeAtualizacao = tokenDeAtualizacao
			};
		}

		public async Task<AutenticacaoResposta?> RenovarToken(string tokenDeAtualizacao)
		{
			if (string.IsNullOrWhiteSpace(tokenDeAtualizacao))
				return null;

			var usuario = await usuarioRepositorio.Consultar()
				.FirstOrDefaultAsync(u => u.TokenDeAtualizacao == tokenDeAtualizacao);

			if ((usuario == null) || (usuario.ExpiracaoTokenAtualizacao <= DateTime.UtcNow))
				return null;

			var novoToken = servicoToken.GerarToken(usuario);
			var novoTokenDeAtualizacao = servicoToken.GerarTokenDeAtualizacao();

			usuario.TokenDeAtualizacao = novoTokenDeAtualizacao;
			usuario.ExpiracaoTokenAtualizacao = DateTime.UtcNow.AddDays(1);

			await usuarioRepositorio.Atualizar(usuario);

			return new AutenticacaoResposta
			{
				NomeDoUsuario = usuario.Username!,
				CodigoDoUsuario = usuario.Id,
				Token = novoToken,
				TokenDeAtualizacao = novoTokenDeAtualizacao
			};
		}
	}
}
