using locadora.Database;
using locadora.Helpers;
using Microsoft.EntityFrameworkCore;
using LocacaoModel = locadora.Entities.Locacao;

namespace locadora.Servicos.Locacao
{
    public class ServicoLocacao : IServicoLocacao
    {
        private readonly LocadoraContext _context;

        public ServicoLocacao(LocadoraContext context)
        {
            _context = context;
        }

        #region CRUD
        public async Task<LocacaoModel> GetLocacao(int id)
        {
            try
            {
                return await _context.Locacoes.FirstOrDefaultAsync(l => l.Id == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<LocacaoModel>> GetLocacoes()
        {
            try
            {
                return await _context.Locacoes.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<LocacaoModel> InsertLocacao(LocacaoModel locacao)
        {
            try
            {

                var filme = await _context.Filmes.FindAsync(locacao.FilmeId);
                var cliente = await _context.Clientes.IgnoreAutoIncludes().SingleOrDefaultAsync(c => c.Id == locacao.ClienteId);

                if (filme is null || cliente is null)
                {
                    throw new HttpException(System.Net.HttpStatusCode.NotFound, $"O {(filme is null ? "filme" : "cliente")} informado não existe");
                }

                locacao.DataDevolucao = locacao.DataLocacao?.AddDays(filme.Lancamento > 0 ? 2 : 3);

                var insertInfo = await _context.Locacoes.AddAsync(locacao);

                if (insertInfo.State == EntityState.Added)
                {
                    await _context.SaveChangesAsync();
                }

                cliente.Locacoes = null;
                return locacao;
            }
            catch (Exception e)
            {
                throw;
            }
        }

        public async Task<LocacaoModel> UpdateLocacao(int id, LocacaoModel locacao)
        {
            try
            {
                
                var locacaoParaAtualizar = await _context.Locacoes.FindAsync(id);

                if (locacaoParaAtualizar is not null)
                {

                    Mapper.Map(locacaoParaAtualizar, locacao, _context);
                    if(locacaoParaAtualizar.DataDevolucao < locacaoParaAtualizar.DataLocacao)
                    {
                        throw new Exception("Data de devolução inválida");
                    }
                    await _context.SaveChangesAsync();
                }

                return locacaoParaAtualizar;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<LocacaoModel> DeleteLocacao(int id)
        {
            try
            {

                var Locacao = await _context.Locacoes.FirstOrDefaultAsync(c => c.Id == id);

                if (Locacao is not null)
                {
                    _context.Locacoes.Remove(Locacao);
                    await _context.SaveChangesAsync();

                }

                return Locacao;

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
    }
}
