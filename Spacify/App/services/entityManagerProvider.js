define(["require", "exports", "durandal/app"], function(require, exports, __App__) {
    /// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
    /// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
    var App = __App__;

    breeze.NamingConvention.camelCase.setAsDefault();
    var serviceName = '/breeze';
    var masterManager = new breeze.EntityManager(serviceName);

    var EntityManagerProvider = (function () {
        function EntityManagerProvider() {
        }
        EntityManagerProvider.prototype.manager = function () {
            if (!this._manager) {
                this._manager = masterManager.createEmptyCopy();

                // Populate with lookup data
                this._manager.importEntities(masterManager.exportEntities());

                // Subscribe to events
                this._manager.hasChangesChanged.subscribe(function (args) {
                    App.trigger('hasChanges');
                });
            }
            return this._manager;
        };
        return EntityManagerProvider;
    })();
    exports.EntityManagerProvider = EntityManagerProvider;

    exports.modelBuilder;

    function create() {
        return new EntityManagerProvider();
    }
    exports.create = create;

    function prepare() {
        return masterManager.fetchMetadata().then(function () {
            if (exports.modelBuilder) {
                exports.modelBuilder(masterManager.metadataStore);
            }

            var query = breeze.EntityQuery.from('resources/lookups');

            return masterManager.executeQuery(query);
        });
    }
    exports.prepare = prepare;
});
//@ sourceMappingURL=entityManagerProvider.js.map
