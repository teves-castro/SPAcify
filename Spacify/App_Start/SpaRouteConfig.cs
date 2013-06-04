
using System.Web.Mvc;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof(Spacify.App_Start.SpaRouteConfig), "RegisterSpaPreStart", Order = 2)]

namespace Spacify.App_Start {
  public static class SpaRouteConfig {

    public static void RegisterSpaPreStart() {

      System.Web.Routing.RouteTable.Routes.MapRoute(
          name: "SpaMvc",
          url: "{controller}/{action}/{id}",
          defaults: new
          {
              controller = "Spa",
              action = "Index",
              id = UrlParameter.Optional
          }
      );
    }
  }
}// Generated helper templates
// Generated items
// C:\git\SpaTemplate\SpaTemplate\App_Start\SpaRouteConfig.cs.pp

