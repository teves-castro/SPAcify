/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
import app = module('durandal/app');
import system = module('durandal/system');
import r = module('durandal/plugins/router');

export interface IRouteInfoParameters extends r.IRouteInfoParameters {
    hash?: string;
    settings?: { admin: bool; };
}

export class RouteGroup {
    constructor(public caption?: string = "", public routes?: IRouteInfoParameters[], public routeGroups?: RouteGroup[]) {

        routes = routes || [];
        routeGroups = routeGroups || [];

        routes.forEach(r => { if (r.hash === undefined) r.hash = "#/" + r.url; })

        this.isActive = ko.computed(() => {
            var activeRoute: r.IRouteInfo = router.activeRoute();
            if (activeRoute == undefined) return false;
            return routes.some(r => r.hash === activeRoute.hash) || routeGroups.some(rg => rg.isActive());
        });

        this.visible = ko.computed(() => {
            return routes.some(r => r.visible) || routeGroups.some(rg => rg.visible());
        });
    }
    isActive: KnockoutComputed;
    visible: KnockoutComputed;
}

export var router = r;
export var routes = ko.observableArray();
export function navigateTo(r: IRouteInfoParameters) {
    router.navigateTo(r.hash);
}

export function activate() {
    return boot();
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

//#region Internal Methods
private boot() {
    routes([
        new RouteGroup("Home",
            [
                { url: "home", name: "Home", visible: true, settings: { admin: false } },
            ]),
        new RouteGroup("Details",
            [
                { url: "details", name: "Details", visible: true, settings: { admin: false } },
            ]),
    ]);

    var allRoutes = new IRouteInfoParameters[];
    routes().forEach(rg => rg.routes.forEach(r => allRoutes.push(r)));
    router.map(allRoutes);

    toastr.info('SPA Template Loaded!');
    return router.activate('home');
}
//#endregion
