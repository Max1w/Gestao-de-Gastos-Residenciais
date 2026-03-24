using GestaoGastosResidenciais.Aplicacao.Services.Versao.Interface;

namespace GestaoGastosResidenciais.Aplicacao.Services.Versao
{
	// ─── VersaoServico ───────────────────────────────────────────────────────────────────
	// Lê a versão do assembly em tempo de execução e retorna formatada

	public class VersaoServico : IVersaoServico
	{
		// Retorna a versão do assembly no formato "vMajor.Minor.Build [projeto]"
		// Omite o Build se for 0 (ex: "v1.0 [Api]")
		public string Consultar(object item, string projeto)
		{
			ArgumentNullException.ThrowIfNull(item, nameof(item));
			var assembly = item.GetType().Assembly;
			var version = assembly.GetName().Version;

			if (version == null)
				throw new Exception($"Versão não encontrada no assembly [{assembly.FullName}].");

			if (version.Build > 0)
				return $"v{version.Major}.{version.Minor}.{version.Build} [{projeto}]";

			return $"v{version.Major}.{version.Minor} [{projeto}]";
		}
	}
}
