define(["require", "exports", "durandal/app", "durandal/plugins/router", "models/routeGroup", "models/modelBuilder", "services/entityManagerProvider", "services/errorHandler", "services/account"], function(require, exports, __app__, __r__, __rg__, __modelBuilder__, __entityManagerProvider__, __errorHandler__, __account__) {
    var app = __app__;

    
    var r = __r__;

    var rg = __rg__;

    var modelBuilder = __modelBuilder__;

    var entityManagerProvider = __entityManagerProvider__;

    var errorHandler = __errorHandler__;

    var account = __account__;

    entityManagerProvider.modelBuilder = modelBuilder.extendMetadata;
    exports.router = r;
    exports.routes = ko.observableArray();
    function navigateTo(r) {
        exports.router.navigateTo(r.hash);
    }
    exports.navigateTo = navigateTo;
    function activate() {
        errorHandler.includeIn(this);
        return entityManagerProvider.prepare().then(bootProtected).fail(function (e) {
            if(e.status === 401) {
                return bootPublic();
            } else {
                errorHandler.handleError(e);
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
        app.showMessage("Search not implemented...", "Search");
    }
    exports.search = search;
    function logout() {
        account.logoutUser();
        window.location.href = "/";
    }
    exports.logout = logout;
    function bootProtected() {
        exports.routes([
            new rg.RouteGroup("Home", [
                {
                    url: "home",
                    name: "Home",
                    visible: true,
                    settings: {
                        admin: false
                    }
                }, 
                
            ]), 
            new rg.RouteGroup("Details", [
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
})
//@ sourceMappingURL=shell.js.map
