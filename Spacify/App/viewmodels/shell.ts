/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
import App = module("durandal/app");
import System = module("durandal/system");
import Router = module("durandal/plugins/router");
import RouteGroup = module("models/routeGroup");
import ModelBuilder = module("models/modelBuilder");
import Provider = module("services/entityManagerProvider");
import ErrorHandler = module("services/errorHandler");
import Account = module("services/account");

Provider.modelBuilder = ModelBuilder.extendMetadata;

export var router = Router;
export var routes = ko.observableArray();
export function navigateTo(r: RouteGroup.IRouteInfoParameters) {
    router.navigateTo(r.hash);
}

export function activate() {
    ErrorHandler.includeIn(this);

    return Provider
        .prepare()
        .then(bootProtected)
        .fail(function (e) {
            if (e.status === 401) {
                return <any>bootPublic();
            } else {
                ErrorHandler.handleError(e);
                return false;
            }
        });

    //return bootProtected();
}

var currentZoom = 1;
export function zoomIn() {
    currentZoom += 0.1;
    $('#zoomArea').css({
        zoom: currentZoom,
        '-moz-transform': 'scale(' + currentZoom + ')'
    });
}
export function zoomOut() {
    currentZoom -= 0.1;
    $('#zoomArea').css({
        zoom: currentZoom,
        '-moz-transform': 'scale(' + currentZoom + ')'
    });
}

export function search(text: string) {
    App.showMessage("Search not implemented...", "Search");
}

export function logout() {
    Account.logoutUser();
    window.location.href = "/";
}

//#region Internal Methods
function bootProtected() {
    routes([
        new RouteGroup.RouteGroup("Home",
            [
                { url: "home", name: "Home", visible: true, settings: { admin: false } },
            ]),
        new RouteGroup.RouteGroup("Details",
            [
                { url: "details", name: "Details", visible: true, settings: { admin: false } },
            ]),
    ]);

    var allRoutes: RouteGroup.IRouteInfoParameters[] = [];
    routes().forEach(rg => rg.routes.forEach(r => allRoutes.push(r)));
    router.map(allRoutes);

    toastr.info('SPA Template Loaded!');
    return router.activate('home');
}

function bootPublic() {
    router.mapNav('login');
    return router.activate('login');
}

//#endregion
