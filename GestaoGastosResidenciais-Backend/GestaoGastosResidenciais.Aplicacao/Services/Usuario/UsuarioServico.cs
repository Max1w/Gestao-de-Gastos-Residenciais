using GestaoGastosResidenciais.Aplicacao.DTOs.Usuario;
using GestaoGastosResidenciais.Aplicacao.Services.Usuario.Interface;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces;
using GestaoGastosResidenciais.Domain.Interfaces.Base;

namespace GestaoGastosResidenciais.Aplicacao.Services.Usuario
{
	// ─── UsuarioServico ───────────────────────────────────────────────────────────────────
	// Camada de serviço de cadastro de usuários, aplica hash na senha antes de persistir

	public class UsuarioServico(
		IRepositorio<UsuarioEntity> usuarioRepositorio,
		IHashSenha hash) : IUsuarioServico
    {
		// Mapeia o DTO para entidade, hasheia a senha e persiste no banco
		public void Cadastrar(UsuarioDTO usuario)
        {
            var entidade = new UsuarioEntity
            {
                Username = usuario.Usuario,
                SenhaHash = hash.HashearSenha(usuario.Senha!)
            };

			var existeUsuario = usuarioRepositorio.Consultar()
					.FirstOrDefault(x => (x.Username == entidade.Username));

			if (existeUsuario != null)
				throw new ArgumentException("Usuário já cadastrado!");

			usuarioRepositorio.Adicionar(entidade);
		}
    }
}
