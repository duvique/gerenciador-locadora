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
        public FilmeController(LocadoraContext context)
        {
            _service = new ServicoFilme(context);
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
        public async Task<Filme> PostFilme(Filme filme)
        {
            return (await _service.InsertFilme(filme));
        }


    }
}
