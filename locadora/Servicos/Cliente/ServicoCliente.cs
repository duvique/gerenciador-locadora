using locadora.Database;
using locadora.Helpers;
using Microsoft.EntityFrameworkCore;
using System.IO;
using ClienteModel = locadora.Entities.Cliente;

namespace locadora.Servicos.Cliente
{
    public class ServicoCliente : IServicoCliente
    {
        private readonly LocadoraContext _context;

        public ServicoCliente(LocadoraContext context)
        {
            _context = context;
        }

        #region CRUD
        public async Task<ClienteModel> GetCliente(int id)
        {
            try
            {
                return await _context.Clientes.FirstOrDefaultAsync(f => f.Id == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<ClienteModel>> GetClientes()
        {
            try
            {
                return await _context.Clientes.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ClienteModel> InsertCliente(ClienteModel Cliente)
        {
            try
            {
                var insertInfo = await _context.Clientes.AddAsync(Cliente);

                if (insertInfo.State == EntityState.Added)
                {
                    await _context.SaveChangesAsync();
                }

                return insertInfo.Entity;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<ClienteModel> UpdateCliente(int id, ClienteModel Cliente)
        {
            try
            {

                var ClienteParaAtualizar = await _context.Clientes.FindAsync(id);
                if (ClienteParaAtualizar is not null)
                {
                    Mapper.Map(ClienteParaAtualizar, Cliente, _context);
                    await _context.SaveChangesAsync();
                }

                return ClienteParaAtualizar;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ClienteModel?> DeleteCliente(int id)
        {
            try
            {

                var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Id == id);

                if (cliente is not null)
                {
                    _context.Clientes.Remove(cliente);
                    await _context.SaveChangesAsync();

                }

                return cliente;

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
    }
}
