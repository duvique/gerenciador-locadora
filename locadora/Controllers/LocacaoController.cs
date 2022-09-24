using locadora.Entities;
using locadora.Servicos.Locacao;
using locadora.Servicos.Locacao;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace locadora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocacaoController : ControllerBase
    {
        private readonly IServicoLocacao _service;
        private readonly IHttpContextAccessor _httpContext;

        public LocacaoController(IServicoLocacao service, IHttpContextAccessor httpContext)
        {
            _service = service;
            _httpContext = httpContext;
        }

        [HttpGet]
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Locacao>>> GetLocacoes()
        {
            return await _service.GetLocacoes();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Locacao>> GetLocacao(int id)
        {
            var Locacao = await _service.GetLocacao(id);

            if (Locacao == null)
            {
                return NotFound();
            }

            return Locacao;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocacao(int id, Locacao Locacao)
        {
            if (id != Locacao.Id)
            {
                return BadRequest(new { message = "Invalid Id" });
            }

            return Ok(await _service.UpdateLocacao(id, Locacao));
        }

        [HttpPost]
        public async Task<ActionResult<Locacao>> PostLocacao(Locacao Locacao)
        {
            var novaLocacao = await _service.InsertLocacao(Locacao);

            return Created($"{_httpContext.HttpContext?.Request.Host.Value}/api/locacao/{novaLocacao.Id}", novaLocacao);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocacao(int id)
        {
            var Locacao = await _service.DeleteLocacao(id);

            if (Locacao == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
