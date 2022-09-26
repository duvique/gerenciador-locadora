using locadora.Database;
using locadora.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace locadora.Servicos.Relatorio
{
    public class ServicoRelatorio : IServicoRelatorio
    {
        private readonly LocadoraContext _context;
        public ServicoRelatorio(LocadoraContext context)
        {
            _context = context;     
        }
        public async Task<IEnumerable<Object>> ClientesEmAtraso()
        {


            try
            {

                var clientes =  await _context.Locacoes
                   .Include(l => l.Cliente)
                   .Select(l => new { Cliente = l.Cliente, DataDevolucao =  l.DataDevolucao})
                   .Where(obj => DateTime.Today > obj.DataDevolucao)
                   .GroupBy(c => c.Cliente.Id)
                   .Select(group => new { atrasos = group.Count(), Cliente = group.FirstOrDefault().Cliente })
                   .OrderByDescending(x => x.atrasos)
                   .ToListAsync();
                ;

                return clientes;
            }
            catch (Exception)
            {
                // Logs etc
                throw;
            }
        }

        public async Task<IEnumerable<Entities.Filme>> FilmesNaoAlugados()
        {


            try
            {
                var filmes = await _context.Filmes
                    .Where(f =>
                        !_context.Locacoes
                            .Select(l => l.FilmeId)
                            .Contains(f.Id)
                    )
                    .ToListAsync();

                return filmes;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Object>> CincoFilmesMaisAlugados()
        {
            try
            {
                var filmes = await _context.Locacoes
                    .Include(l => l.Filme)
                    .Select(l => l.Filme)
                    .GroupBy(f => f.Id)
                    .Select(g => new { locacoes = g.Count(), Filme = g.FirstOrDefault() })
                    .OrderByDescending(group => group.locacoes)
                    .Take(5)
                    .ToListAsync();
                    

                return filmes;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<IEnumerable<Object>> TresFilmesMenosAlugadosNaSemana()
        {
            try
            {
                var filmes = await _context.Locacoes
                    .Where(l => l.DataLocacao >= DateTime.Now.Date.AddDays(-7))
                    .Include(l => l.Filme)
                    .Select(l => l.Filme)
                    .GroupBy(f => f.Id)
                    .Select(g => new { locacoes = g.Count(), Filme = g.FirstOrDefault() })
                    .OrderBy(group => group.locacoes)
                    .Take(3)
                    .ToListAsync();


                return filmes;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Object> SegundoClienteQueMaisAlugou()
        {
            try
            {
                var cliente = await _context.Locacoes
                    .Include(l => l.Cliente)
                    .Select(l => l.Cliente)
                    .GroupBy(c => c.Id)
                    .Select(g => new { locacoes = g.Count(), Cliente = g.FirstOrDefault() })
                    .OrderBy(group => group.locacoes)
                    .Skip(1)
                    .FirstOrDefaultAsync();


                return cliente;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
