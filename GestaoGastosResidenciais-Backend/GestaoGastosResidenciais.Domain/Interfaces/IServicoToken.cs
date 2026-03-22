using GestaoGastosResidenciais.Domain.Entidades;

namespace GestaoGastosResidenciais.Domain.Interfaces
{
    public interface IServicoToken
    {
		string GerarToken(Usuario usuario);
		string GerarTokenDeAtualizacao();
	}
}
