using locadora.Database;
using FilmeModel = locadora.Entities.Filme;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using locadora.Helpers;

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
                var insertInfo =  await _context.Filmes.AddAsync(filme);

                if(insertInfo.State == EntityState.Added)
                {
                    await _context.SaveChangesAsync();
                }

                return insertInfo.Entity;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<FilmeModel> UpdateFilme(int id, FilmeModel filme)
        {
            try
            {

                var filmeParaAtualizar = await _context.Filmes.FindAsync(id);
                if (filmeParaAtualizar is not null)
                {
                    Mapper.Map(filmeParaAtualizar, filme, _context);
                    await _context.SaveChangesAsync();
                }

                return filmeParaAtualizar;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
