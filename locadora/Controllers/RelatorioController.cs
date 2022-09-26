using locadora.Entities;
using locadora.Servicos.Relatorio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace locadora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelatorioController : ControllerBase
    {
        private readonly IServicoRelatorio _service;


        public RelatorioController (IServicoRelatorio servico)
        {
            _service = servico;
        }


        [HttpGet]
        [Route("clientesEmAtraso")]
        public async Task<ActionResult<List<Cliente>>> GetClientesAtrasados()
        {
            return Ok(await _service.ClientesEmAtraso());
        }

        [HttpGet]
        [Route("filmesNaoAlugados")]
        public async Task<ActionResult<List<Cliente>>> GetFilmesNaoAlugados()
        {
            return Ok(await _service.FilmesNaoAlugados());
        }


        [HttpGet]
        [Route("cincoMaisAlugados")]
        public async Task<ActionResult<List<Cliente>>> GetCincoFilmesMaisAlugados()
        {
            return Ok(await _service.CincoFilmesMaisAlugados());
        }

        [HttpGet]
        [Route("tresMenosAlugadosSemana")]
        public async Task<ActionResult<List<Cliente>>> GetTresFilmesMenosAlugadosSemana()
        {
            return Ok(await _service.TresFilmesMenosAlugadosNaSemana());
        }
        
        [HttpGet]
        [Route("segundoClienteMaisAlugou")]
        public async Task<ActionResult<List<Cliente>>> GetSegundoClienteQueMaisAlugou()
        {
            return Ok(await _service.SegundoClienteQueMaisAlugou());
        }
    }
}
