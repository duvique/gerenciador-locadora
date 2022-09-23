using locadora.Database;
using locadora.Entities;
using locadora.Servicos.Filme;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace locadora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmeController : ControllerBase
    {
        private readonly ServicoFilme _service;
        private readonly IHttpContextAccessor _httpContext;
        public FilmeController(LocadoraContext context, IHttpContextAccessor httpContext)
        {
            _service = new ServicoFilme(context);
            _httpContext = httpContext;
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<Filme> Get(int id)
        {
            return (await _service.GetFilme(id));
        }

        [HttpGet]
        [Route("list")]
        public async Task<List<Filme>> GetFilmes()
        {
            return (await _service.GetFilmes());
        }

        [HttpPost]
        public async Task<ActionResult<Filme>> PostFilme(Filme filme)
        {
            var novoFilme = await _service.InsertFilme(filme);
            return Created($"{_httpContext.HttpContext?.Request.Host.Value}/api/filme/{novoFilme.Id}", novoFilme);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<Filme> PutFilme([FromRoute] int id, [FromBody] Filme filme)
        {
            return (await _service.UpdateFilme(id, filme));
        }


    }
}
