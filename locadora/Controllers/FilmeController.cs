using FluentValidation.AspNetCore;
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
        private readonly IServicoFilme _service;
        private readonly IHttpContextAccessor _httpContext;
        public FilmeController(IServicoFilme servico, IHttpContextAccessor httpContext)
        {
            _service = servico;
            _httpContext = httpContext;
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Filme>> Get(int id)
        {
            var filme = await _service.GetFilme(id);

            if (filme == null)
            {
                return NotFound();
            }

            return filme;
        }

        [HttpGet]
        [Route("list")]
        public async Task<List<Filme>> GetFilmes()
        {
            return await _service.GetFilmes();
        }

        [HttpPost]
        public async Task<ActionResult<Filme>> PostFilme(Filme filme)
        {
            var novoFilme = await _service.InsertFilme(filme);
            return Created($"{_httpContext.HttpContext?.Request.Host.Value}/api/filme/{novoFilme.Id}", novoFilme);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Filme>> PutFilme([FromRoute] int id, Filme filme)
        {
            if (id != filme.Id)
            {
                return BadRequest(new { message = "Invalid Movie Id" });
            }

            return Ok(await _service.UpdateFilme(id, filme));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilme(int id)
        {
            var filme = await _service.DeleteFilme(id);

            if (filme == null)
            {
                return NotFound();
            }

            return Ok();
        }


    }
}
