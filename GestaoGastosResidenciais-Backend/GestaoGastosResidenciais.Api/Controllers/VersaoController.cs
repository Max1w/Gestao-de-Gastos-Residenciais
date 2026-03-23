using GestaoGastosResidenciais.Aplicacao.Services.Versao.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GestaoGastosResidenciais.Api.Controllers
{
	[Route("api/[controller]")]
	[AllowAnonymous]
	[ApiController]
	public class VersaoController : PadraoApiController
	{
		private IVersaoServico _versao;

		public VersaoController(IVersaoServico versao)
		{
			_versao = versao;
		}

		public IActionResult Get()
			=> Sucesso(_versao.Consultar(this, "Api"));
	}
}
