using GestaoGastosResidenciais.Domain.Interfaces;

namespace GestaoGastosResidenciais.Infraestrutura.Seguranca
{
    public class HashSenha : IHashSenha
	{
		public string HashearSenha(string senha)
		{
			return BCrypt.Net.BCrypt.HashPassword(senha);
		}

		public bool VerificarSenha(string senha, string hash)
		{
			return BCrypt.Net.BCrypt.Verify(senha, hash);
		}
	}
}
