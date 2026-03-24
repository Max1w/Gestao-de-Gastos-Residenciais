using GestaoGastosResidenciais.Aplicacao.DTOs.Seguranca;
using GestaoGastosResidenciais.Aplicacao.Services.Seguranca.Interfaces;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces;
using GestaoGastosResidenciais.Domain.Interfaces.Base;
using Microsoft.EntityFrameworkCore;

namespace GestaoGastosResidenciais.Aplicacao.Services.Seguranca
{
	// ─── SegurancaServico ───────────────────────────────────────────────────────────────────
	// Camada de serviço de autenticação, valida credenciais e gera tokens de acesso

	public class SegurancaServico(
        IRepositorio<UsuarioEntity> usuarioRepositorio,
		IHashSenha hashSenha,
		IServicoToken servicoToken) : ISegurancaServico
    {

		// Valida usuário e senha, gera token de acesso
		public async Task<AutenticacaoResposta> Logar(LoginDTO credenciais)
        {
			var usuario = await usuarioRepositorio.Consultar()
				.FirstOrDefaultAsync(u => u.Username == credenciais.Usuario);

			if ((usuario == null) || (!hashSenha.VerificarSenha(credenciais.Senha, usuario.SenhaHash!)))
				throw new ArgumentException("Usuário ou senha inválidos.");

			var token = servicoToken.GerarToken(usuario);

			await usuarioRepositorio.Atualizar(usuario);

			return new AutenticacaoResposta
			{
				NomeDoUsuario = usuario.Username!,
				CodigoDoUsuario = usuario.Id,
				Token = token,
			};
		}
	}
}
