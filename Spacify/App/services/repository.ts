/// <reference path="../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts" />
/// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
/// <reference path="../models/entities.d.ts" />
import emp = module("services/entityManagerProvider");

export class Repository {

    constructor(private entityManagerProvider: emp.EntityManagerProvider, private entityTypeName, private resourceName?: string, private fetchStrategy?: string) {

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

    add(config?: {}, state?: breeze.EntityStateSymbol) {
        return this.manager().createEntity(this.entityTypeName, config, state);
    }

    remove(entity: breeze.Entity) {
        this.ensureEntityType(entity, this.entityTypeName);
        entity.entityAspect.setDeleted();
    }

    manager() {
        return this.entityManagerProvider.manager();
    }

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

    private ensureEntityType(obj: breeze.Entity, entityTypeName: string) {
        if (!obj.entityType || obj.entityType.shortName !== entityTypeName) {
            throw new Error('Object must be an entity of type ' + entityTypeName);
        }
    }

    serializeEntity(obj) {
        var seen = [];

        return JSON.stringify(obj, (key, val) => {
            if (typeof val == "object") {
                if (seen.indexOf(val) >= 0)
                    return;
                seen.push(val);
            }
            return val;
        });
    }
}

export class BlogRepository extends Repository {
    constructor(private entityManagerProvider: emp.EntityManagerProvider, private fetchStrategy?: string) {
        super(entityManagerProvider, "Blog", "resources/blogs", fetchStrategy);
    }

    createBlog(blog: Blog) {
        var raw = super.manager().helper.unwrapInstance(blog, false);
        return $.ajax("breeze/resources/CreateBlog", {
            data: this.serializeEntity(raw),
            dataType: "json",
            type: "POST",
            contentType: "application/json",
        });
    }
}
