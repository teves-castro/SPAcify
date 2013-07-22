using System.Web.Mvc;
using System.Web.Routing;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof($rootnamespace$.RouteConfig), "RegisterSpaPreStart", Order = 2)]

namespace $rootnamespace$ {
  public static class RouteConfig {
    public static void RegisterRoutes(RouteCollection routes) {}

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
}