using System.Net;

namespace locadora.Helpers
{
    public class HttpException : Exception
    {
        public HttpStatusCode Code { get ; private set;}
        public HttpException(HttpStatusCode code, string msg ): base(msg) 
        {
            Code = code;
        }
    }
}
