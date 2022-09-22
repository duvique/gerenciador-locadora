using locadora.Database;
using FilmeModel = locadora.Entities.Filme;
using Microsoft.EntityFrameworkCore;

namespace locadora.Servicos.Filme
{
    public class ServicoFilme : IServicoFilme
    {
        private readonly LocadoraContext _context;

        public ServicoFilme(LocadoraContext context)
        {
            _context = context;
        }
        public async Task<Entities.Filme> GetFilme(int id)
        {
            try
            {
                return await _context.Filmes.FirstOrDefaultAsync(f => f.Id == id);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<Entities.Filme>> GetFilmes()
        {
            try
            {
                return await _context.Filmes.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<FilmeModel> InsertFilme(FilmeModel filme)
        {
            try
            {
                /// Unfinished
                var filmeAdicionado =  await _context.Filmes.AddAsync(filme);

                return filmeAdicionado.Entity;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
