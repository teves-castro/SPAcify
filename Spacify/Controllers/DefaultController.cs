using System.Web.Http;
using Breeze.WebApi;
using Spacify.Models;

namespace Spacify.Controllers
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