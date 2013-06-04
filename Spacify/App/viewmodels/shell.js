define(["require", "exports", 'durandal/app', 'durandal/plugins/router'], function(require, exports, __app__, __r__) {
    var app = __app__;

    
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
                var activeRoute = exports.router.activeRoute();
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
    exports.router = r;
    exports.routes = ko.observableArray();
    function navigateTo(r) {
        exports.router.navigateTo(r.hash);
    }
    exports.navigateTo = navigateTo;
    function activate() {
        return boot();
    }
    exports.activate = activate;
    var currentZoom = 1;
    function zoomIn() {
        currentZoom += 0.1;
        $('#zoomArea').css({
            zoom: currentZoom,
            '-moz-transform': 'scale(' + currentZoom + ')'
        });
    }
    exports.zoomIn = zoomIn;
    function zoomOut() {
        currentZoom -= 0.1;
        $('#zoomArea').css({
            zoom: currentZoom,
            '-moz-transform': 'scale(' + currentZoom + ')'
        });
    }
    exports.zoomOut = zoomOut;
    function search(text) {
        app.showMessage("Search not implemented...", "Search");
    }
    exports.search = search;
    function boot() {
        exports.routes([
            new RouteGroup("Home", [
                {
                    url: "home",
                    name: "Home",
                    visible: true,
                    settings: {
                        admin: false
                    }
                }, 
                
            ]), 
            new RouteGroup("Details", [
                {
                    url: "details",
                    name: "Details",
                    visible: true,
                    settings: {
                        admin: false
                    }
                }, 
                
            ]), 
            
        ]);
        var allRoutes = new Array();
        exports.routes().forEach(function (rg) {
            return rg.routes.forEach(function (r) {
                return allRoutes.push(r);
            });
        });
        exports.router.map(allRoutes);
        toastr.info('SPA Template Loaded!');
        return exports.router.activate('home');
    }
})
//@ sourceMappingURL=shell.js.map
