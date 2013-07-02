define(["require", "exports", "durandal/app", "durandal/plugins/router", "models/routeGroup", "models/modelBuilder", "services/entityManagerProvider", "services/errorHandler", "services/account"], function(require, exports, __App__, __Router__, __RouteGroup__, __ModelBuilder__, __Provider__, __ErrorHandler__, __Account__) {
    /// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
    /// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
    var App = __App__;
    
    var Router = __Router__;
    var RouteGroup = __RouteGroup__;
    var ModelBuilder = __ModelBuilder__;
    var Provider = __Provider__;
    var ErrorHandler = __ErrorHandler__;
    var Account = __Account__;

    Provider.modelBuilder = ModelBuilder.extendMetadata;

    exports.router = Router;
    exports.routes = ko.observableArray();
    function navigateTo(r) {
        exports.router.navigateTo(r.hash);
    }
    exports.navigateTo = navigateTo;

    function activate() {
        ErrorHandler.includeIn(this);

        return Provider.prepare().then(bootProtected).fail(function (e) {
            if (e.status === 401) {
                return bootPublic();
            } else {
                ErrorHandler.handleError(e);
                return false;
            }
        });
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
        App.showMessage("Search not implemented...", "Search");
    }
    exports.search = search;

    function logout() {
        Account.logoutUser();
        window.location.href = "/";
    }
    exports.logout = logout;

    //#region Internal Methods
    function bootProtected() {
        exports.routes([
            new RouteGroup.RouteGroup("Home", [
                { url: "home", name: "Home", visible: true, settings: { admin: false } }
            ]),
            new RouteGroup.RouteGroup("Details", [
                { url: "details", name: "Details", visible: true, settings: { admin: false } }
            ])
        ]);

        var allRoutes = [];
        exports.routes().forEach(function (rg) {
            return rg.routes.forEach(function (r) {
                return allRoutes.push(r);
            });
        });
        exports.router.map(allRoutes);

        toastr.info('SPA Template Loaded!');
        return exports.router.activate('home');
    }

    function bootPublic() {
        exports.router.mapNav('login');
        return exports.router.activate('login');
    }
});
//@ sourceMappingURL=shell.js.map
