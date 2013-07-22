using System.Web.Mvc;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof($rootnamespace$.App_Start.RouteConfig), "RegisterSpaPreStart", Order = 2)]

namespace $rootnamespace$.App_Start {
  public static class RouteConfig {

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