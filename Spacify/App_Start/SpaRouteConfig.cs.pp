using System.Web.Mvc;

[assembly: WebActivator.PreApplicationStartMethod(
    typeof($rootnamespace$.App_Start.SpaRouteConfig), "RegisterSpaPreStart", Order = 2)]

namespace $rootnamespace$.App_Start {
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
}