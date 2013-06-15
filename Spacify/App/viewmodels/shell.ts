/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
import app = module("durandal/app");
import system = module("durandal/system");
import r = module("durandal/plugins/router");
import rg = module("models/routeGroup");
import modelBuilder = module("models/modelBuilder");
import entityManagerProvider = module("services/entityManagerProvider");
import errorHandler = module("services/errorHandler");
import account = module("services/account");

entityManagerProvider.modelBuilder = modelBuilder.extendMetadata;

export var router = r;
export var routes = ko.observableArray();
export function navigateTo(r: rg.IRouteInfoParameters) {
    router.navigateTo(r.hash);
}

export function activate() {
    errorHandler.includeIn(this);

    return entityManagerProvider
        .prepare()
        .then(bootProtected)
        .fail(function (e) {
            if (e.status === 401) {
                return <any>bootPublic();
            } else {
                errorHandler.handleError(e);
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
    app.showMessage("Search not implemented...", "Search");
}

export function logout() {
    account.logoutUser();
    window.location.href = "/";
}

//#region Internal Methods
private bootProtected() {
    routes([
        new rg.RouteGroup("Home",
            [
                { url: "home", name: "Home", visible: true, settings: { admin: false } },
            ]),
        new rg.RouteGroup("Details",
            [
                { url: "details", name: "Details", visible: true, settings: { admin: false } },
            ]),
    ]);

    var allRoutes: rg.IRouteInfoParameters[] = [];
    routes().forEach(rg => rg.routes.forEach(r => allRoutes.push(r)));
    router.map(allRoutes);

    toastr.info('SPA Template Loaded!');
    return router.activate('home');
}

private bootPublic() {
    router.mapNav('login');
    return router.activate('login');
}

//#endregion
