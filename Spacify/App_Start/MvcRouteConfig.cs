
using System.Web.Mvc;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof(Spacify.App_Start.MvcRouteConfig), "RegisterSpaPreStart", Order = 2)]

namespace Spacify.App_Start {
  public static class MvcRouteConfig {

    public static void RegisterSpaPreStart() {

      System.Web.Routing.RouteTable.Routes.MapRoute(
          name: "Mvc",
          url: "{controller}/{action}",
          defaults: new
          {
              controller = "Mvc",
              action = "Index",
              id = UrlParameter.Optional
          }
      );
    }
  }
}// Generated helper templates
// Generated items
// Spacify\App_Start\MvcRouteConfig.cs.pp

