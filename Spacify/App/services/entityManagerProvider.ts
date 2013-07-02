/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
import App = module("durandal/app");

breeze.NamingConvention.camelCase.setAsDefault();
var serviceName = '/breeze';
var masterManager = new breeze.EntityManager(serviceName);

export class EntityManagerProvider {
    private _manager: breeze.EntityManager;
    manager() {
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
    }
}

export var modelBuilder: (metadataStore: breeze.MetadataStore) => void;

export function create() {
    return new EntityManagerProvider();
}

export function prepare() {
    return masterManager.fetchMetadata()
        .then(() => {
            if (modelBuilder) {
                modelBuilder(masterManager.metadataStore);
            }

            var query = breeze.EntityQuery
                .from('resources/lookups');

            return masterManager.executeQuery(query);
        });
}
