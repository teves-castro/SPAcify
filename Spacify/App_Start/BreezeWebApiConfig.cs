
using System.Web.Http;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof(Spacify.App_Start.BreezeWebApiConfig), "RegisterBreezePreStart", Order = 1)]
namespace Spacify.App_Start
{
    ///<summary>
    /// Inserts the Breeze Web API controller route at the front of all Web API routes
    ///</summary>
    ///<remarks>
    /// This class is discovered and run during startup; see
    /// http://blogs.msdn.com/b/davidebb/archive/2010/10/11/light-up-your-nupacks-with-startup-code-and-webactivator.aspx
    ///</remarks>
    public static class BreezeWebApiConfig
    {
        public static void RegisterBreezePreStart()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                name: "Module",
                routeTemplate: "breeze/{controller}/{action}"
                );

            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                name: "WebApi",
                routeTemplate: "breeze/{action}",
                defaults: new {Controller = "Default"}
                );
        }
    }
}
// Generated helper templates
// Generated items
// Spacify\App_Start\BreezeWebApiConfig.cs.pp

