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
            var activeRoute: r.IRouteInfo = r.activeRoute();
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