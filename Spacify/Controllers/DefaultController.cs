
using System.Web.Http;
using Breeze.WebApi;
using Spacify.Data;

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
}// Generated helper templates
// Generated items
// Spacify\Spacify\Controllers\DefaultController.cs.pp

