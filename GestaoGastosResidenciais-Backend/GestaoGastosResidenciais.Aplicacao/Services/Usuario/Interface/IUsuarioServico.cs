using GestaoGastosResidenciais.Aplicacao.DTOs.Usuario;

namespace GestaoGastosResidenciais.Aplicacao.Services.Usuario.Interface
{
    public interface IUsuarioServico
    {
        void Cadastrar(UsuarioDTO usuario);
    }
}
