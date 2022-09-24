using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations.Schema;

namespace locadora.Entities

{
    public class Locacao
    {
        public int Id { get; set; }

        [Column("Id_cliente")]
        [Required]
        public int? ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        [Column("Id_filme")]
        [Required]
        public int? FilmeId { get; set; }
        public Filme Filme { get; set; }

        [Required]
        public DateTime? DataLocacao { get; set; }

        [Required]
        public DateTime? DataDevolucao { get; set; }
    }
}
