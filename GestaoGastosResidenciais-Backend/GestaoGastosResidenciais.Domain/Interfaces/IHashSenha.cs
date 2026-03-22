namespace GestaoGastosResidenciais.Domain.Interfaces
{
    public interface IHashSenha
    {
		string HashearSenha(string senha);
		bool VerificarSenha(string senha, string hash);
	}
}
