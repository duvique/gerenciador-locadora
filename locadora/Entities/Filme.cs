using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace locadora.Entities
{
    [Index(nameof(Titulo), nameof(Lancamento))]
    public class Filme
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Titulo { get; set; }
        public int ClassificacaoIndicativa { get; set; }

        public byte Lancamento { get; set; }

    }
}
