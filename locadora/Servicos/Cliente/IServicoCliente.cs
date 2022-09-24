using System.IO;
using ClienteModel = locadora.Entities.Cliente;

namespace locadora.Servicos.Cliente
{
    public interface IServicoCliente
    {
        public Task<List<ClienteModel>> GetClientes();
        public Task<ClienteModel> GetCliente(int id);
        public Task<ClienteModel> InsertCliente(ClienteModel cliente);

        public Task<ClienteModel> UpdateCliente(int id, ClienteModel cliente);

        public Task<ClienteModel> DeleteCliente(int id);
    }
}
