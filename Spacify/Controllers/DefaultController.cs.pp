using System.Web.Http;
using Breeze.WebApi;
using $rootnamespace$.Data;

namespace $rootnamespace$.Controllers
{
    [BreezeController]
    [Authorize]
    public class DefaultController : ApiController
    {
        // ~/breeze/Metadata
        [HttpGet]
        public string Metadata()
        {
            //return "";
            return new EFContextProvider<BlogDbContext>().Metadata();
        }
    }
}