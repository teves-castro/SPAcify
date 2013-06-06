using System.Net;
using System.Net.Http;
using System.Security;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using Newtonsoft.Json;

namespace Spacify.Controllers
{
    public class LoginModel
    {
        [JsonProperty("username")]
        public string Username { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("remember")]
        public bool Remember { get; set; }
    }

    public class AccountController : ApiController
    {
        [HttpPost]
        public void Login(LoginModel credential)
        {
            Seed();

            if (Membership.ValidateUser(credential.Username, credential.Password))
            {
                FormsAuthentication.SetAuthCookie(credential.Username, credential.Remember);
            }
            else
            {
                throw new SecurityException("Invalid user name or password");
            }
        }

        [HttpGet]
        [Authorize]
        public HttpResponseMessage Logout()
        {
            FormsAuthentication.SignOut();
            if (HttpContext.Current.Session != null)
            {
                HttpContext.Current.Session.Clear();
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        private void Seed()
        {
            if (Membership.GetAllUsers().Count != 0)
                return;

            Membership.CreateUser("Admin", "password");
        }
    }
}