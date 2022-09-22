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
                    ClassificacaoIndicativa= 12,
                    Lancamento = 1
                },
                new Filme()
                {
                    Titulo= "As tranças do rei careca",
                    ClassificacaoIndicativa= 18,
                    Lancamento = 1
                },
            };

            context.Filmes.AddRange(filmesDefault);
            context.SaveChanges();

        }
    }
}
