define(["require", "exports", 'durandal/plugins/router'], function(require, exports, __r__) {
    
    
    var r = __r__;

    var RouteGroup = (function () {
        function RouteGroup(caption, routes, routeGroups) {
            if (typeof caption === "undefined") { caption = ""; }
            this.caption = caption;
            this.routes = routes;
            this.routeGroups = routeGroups;
            routes = routes || [];
            routeGroups = routeGroups || [];
            routes.forEach(function (r) {
                if(r.hash === undefined) {
                    r.hash = "#/" + r.url;
                }
            });
            this.isActive = ko.computed(function () {
                var activeRoute = r.activeRoute();
                if(activeRoute == undefined) {
                    return false;
                }
                return routes.some(function (r) {
                    return r.hash === activeRoute.hash;
                }) || routeGroups.some(function (rg) {
                    return rg.isActive();
                });
            });
            this.visible = ko.computed(function () {
                return routes.some(function (r) {
                    return r.visible;
                }) || routeGroups.some(function (rg) {
                    return rg.visible();
                });
            });
        }
        return RouteGroup;
    })();
    exports.RouteGroup = RouteGroup;    
})
//@ sourceMappingURL=routeGroup.js.map
