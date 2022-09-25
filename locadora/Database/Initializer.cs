using locadora.Entities;

namespace locadora.Database
{
    public static class Initializer
    {
        
        public static void Initialize(LocadoraContext context)
        {

            if (context.Filmes.Any()) return;

            var filmesDefault = new Filme[]
            {
                new Filme()
                {
                    Titulo= "A volta dos que não foram",
                    ClassificacaoIndicativa= 10,
                    Lancamento = false
                },
                new Filme()
                {
                    Titulo= "Os vingadores",
                    ClassificacaoIndicativa= 18,
                    Lancamento = true
                },
                new Filme()
                {
                    Titulo= "O lobo de Wall Street",
                    ClassificacaoIndicativa= 18,
                    Lancamento = true
                },
                new Filme()
                {
                    Titulo= "Clube da luta",
                    ClassificacaoIndicativa= 16,
                    Lancamento = true
                },
            };

            context.Filmes.AddRange(filmesDefault);

            if (context.Clientes.Any()) return;

            var clientesDefault = new Cliente[]
            {
                   new Cliente
                   {
                       Nome = "João",
                       CPF = "04392817284",
                       DataNascimento = Convert.ToDateTime("1979-05-14"),
                   },
                   new Cliente
                   {
                       Nome = "Pedro Nunes",
                       CPF = "19286065482",
                       DataNascimento = Convert.ToDateTime("1997-09-03"),
                   }
            };

            context.Clientes.AddRange(clientesDefault);

            context.SaveChanges();

        }
    }
}
