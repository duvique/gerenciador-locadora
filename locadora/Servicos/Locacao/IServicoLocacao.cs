using LocacaoModel = locadora.Entities.Locacao;
namespace locadora.Servicos.Locacao
{
    public interface IServicoLocacao
    {
        public Task<List<LocacaoModel>> GetLocacoes();
        public Task<LocacaoModel> GetLocacao(int id);
        public Task<LocacaoModel> InsertLocacao(LocacaoModel locacao);

        public Task<LocacaoModel> UpdateLocacao(int id, LocacaoModel locacao);

        public Task<LocacaoModel> DeleteLocacao(int id);
    }
}
