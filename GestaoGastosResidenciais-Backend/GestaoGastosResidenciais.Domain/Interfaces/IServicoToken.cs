using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Domain.Interfaces
{
    public interface IServicoToken
    {
		string GerarToken(UsuarioEntity usuario);
		string GerarTokenDeAtualizacao();
	}
}
