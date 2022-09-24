using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using locadora.Database;
using locadora.Entities;
using locadora.Servicos.Cliente;

namespace locadora.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IServicoCliente _service;

        public ClienteController(IServicoCliente service)
        {
            _service = service;
        }

        [HttpGet]
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetCliente()
        {
            return await _service.GetClientes();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _service.GetCliente(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if(id != cliente.Id)
            {
                return BadRequest(new { message = "Invalid Client Id" });
            }

            return Ok(await _service.UpdateCliente(id, cliente));
        } 

        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            var addedClient = await _service.InsertCliente(cliente);

            return CreatedAtAction("GetCliente", new { id = cliente.Id }, addedClient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var cliente = await _service.DeleteCliente(id);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok();
        }

    }
}
