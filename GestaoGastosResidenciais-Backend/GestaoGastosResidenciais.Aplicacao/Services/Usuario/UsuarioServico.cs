using GestaoGastosResidenciais.Aplicacao.DTOs.Usuario;
using GestaoGastosResidenciais.Aplicacao.Services.Usuario.Interface;
using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Domain.Interfaces;
using GestaoGastosResidenciais.Domain.Interfaces.Base;

namespace GestaoGastosResidenciais.Aplicacao.Services.Usuario
{
    public class UsuarioServico(
		IRepositorio<UsuarioEntity> usuarioRepositorio,
		IHashSenha hash) : IUsuarioServico
    {
        public void Cadastrar(UsuarioDTO usuario)
        {
            var entidade = new UsuarioEntity
            {
                Username = usuario.Usuario,
                SenhaHash = hash.HashearSenha(usuario.Senha!)
            };

			usuarioRepositorio.Adicionar(entidade);
		}
    }
}
