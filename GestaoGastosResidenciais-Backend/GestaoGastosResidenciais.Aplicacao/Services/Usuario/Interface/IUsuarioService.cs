using GestaoGastosResidenciais.Aplicacao.DTOs.Usuario;

namespace GestaoGastosResidenciais.Aplicacao.Services.Usuario.Interface
{
    public interface IUsuarioService
    {
        void Cadastrar(UsuarioRequisicao usuario);
    }
}
