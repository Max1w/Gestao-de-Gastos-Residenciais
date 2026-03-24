using GestaoGastosResidenciais.Domain.Interfaces;

namespace GestaoGastosResidenciais.Infraestrutura.Seguranca
{
	// ─── HashSenha ───────────────────────────────────────────────────────────────────
	// Responsável por hashear e verificar senhas usando BCrypt

	public class HashSenha : IHashSenha
	{
		// Gera o hash da senha usando BCrypt
		public string HashearSenha(string senha)
		{
			return BCrypt.Net.BCrypt.HashPassword(senha);
		}

		// Verifica se a senha informada corresponde ao hash armazenado
		public bool VerificarSenha(string senha, string hash)
		{
			return BCrypt.Net.BCrypt.Verify(senha, hash);
		}
	}
}
