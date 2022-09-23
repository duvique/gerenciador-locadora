using locadora.Database;
using FilmeModel = locadora.Entities.Filme;

namespace locadora.Servicos.Filme
{
    public interface IServicoFilme
    {
        public Task<List<FilmeModel>> GetFilmes();
        public Task<FilmeModel> GetFilme(int id);

        public Task<FilmeModel> InsertFilme(FilmeModel filme);

        public Task<FilmeModel> UpdateFilme(int id, FilmeModel filme);
    }
}
