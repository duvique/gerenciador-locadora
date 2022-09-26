
namespace locadora.Servicos.Relatorio
{
    public interface IServicoRelatorio
    {
        public Task<IEnumerable<Object>> ClientesEmAtraso();

        public Task<IEnumerable<Entities.Filme>> FilmesNaoAlugados();

        public Task<IEnumerable<Object>> CincoFilmesMaisAlugados();

        public Task<IEnumerable<Object>> TresFilmesMenosAlugadosNaSemana();

        public Task<Object> SegundoClienteQueMaisAlugou();

    }
}
