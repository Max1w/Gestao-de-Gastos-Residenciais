using GestaoGastosResidenciais.Aplicacao.Services.Versao.Interface;

namespace GestaoGastosResidenciais.Aplicacao.Services.Versao
{
    public class VersaoServico : IVersaoServico
	{
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
