using locadora.Database;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace locadora.Entities
{
    [Index(nameof(CPF), nameof(Nome))]
    public class Cliente
    {
        public int Id { get; set; }

        [MaxLength(200)]
        [Required]
        public string Nome { get; set; }

        [StringLength(11,MinimumLength = 11)]
        [Required]
        public string CPF { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }

        [NotMapped]
        public int Idade { get {
                var dataHoje = DateTime.Today;

                var idade = dataHoje.Year - DataNascimento.Year;

                if (DataNascimento.Date > dataHoje.AddYears(-idade)) idade--;

                return idade;

            } }
        public List<Locacao> Locacoes { get; set; } = new List<Locacao>();
    }
}