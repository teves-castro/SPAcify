/// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
import emp = module("services/entityManagerProvider");

export class Repository {

    constructor(private entityManagerProvider: emp.EntityManagerProvider, private entityTypeName, private resourceName: string, private fetchStrategy: string) {

        // Ensure resourceName is registered
        var entityType;
        if (entityTypeName) {
            entityType = this.getMetastore().getEntityType(entityTypeName);
            entityType.setProperties({ defaultResourceName: resourceName });

            this.getMetastore().setEntityTypeForResourceName(resourceName, entityTypeName);
        }
    }
    withId(key) {
        if (!this.entityTypeName)
            throw new Error("Repository must be created with an entity type specified");

        return this.manager().fetchEntityByKey(this.entityTypeName, key, true)
            .then(function (data) {
                if (!data.entity)
                    throw new Error("Entity not found!");
                return data.entity;
            });
    };

    find(predicate: breeze.Predicate) {
        var query = breeze.EntityQuery
            .from(this.resourceName)
            .where(predicate);

        return this.executeQuery(query);
    };

    findInCache(predicate: breeze.Predicate) {
        var query = breeze.EntityQuery
            .from(this.resourceName)
            .where(predicate);

        return this.executeCacheQuery(query);
    };

    all() {
        var query = breeze.EntityQuery
            .from(this.resourceName);

        return this.executeQuery(query);
    };

    private executeQuery(query: breeze.EntityQuery) {
        return this.manager()
            .executeQuery(query.using(this.fetchStrategy || breeze.FetchStrategy.FromServer))
            .then(function (data) { return data.results; });
    }

    private executeCacheQuery(query: breeze.EntityQuery) {
        return this.manager().executeQueryLocally(query);
    }

    private getMetastore() {
        return this.manager().metadataStore;
    }

    private manager() {
        return this.entityManagerProvider.manager();
    }
}

export function create(entityManagerProvider: emp.EntityManagerProvider, entityTypeName: string, resourceName?: string, fetchStrategy?: string) {
    return new Repository(entityManagerProvider, entityTypeName, resourceName, fetchStrategy);
}
