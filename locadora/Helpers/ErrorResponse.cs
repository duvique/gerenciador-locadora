using System.Diagnostics;

namespace locadora.Helpers
{
    public class ErrorResponse
    {
        public string Mensagem { get; set; }
        public string Tipo { get; set; }
        public string Stacktrace { get; set; }

        public ErrorResponse(Exception ex)
        {
            Tipo = ex.GetType().Name;
            Mensagem = ex.InnerException?.Message ?? ex.Message;
            Stacktrace = ex.ToString();
        }
    }
}
