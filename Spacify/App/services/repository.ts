/// <reference path="../../Scripts/typings/q/Q.d.ts" />
/// <reference path="../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts" />
/// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
/// <reference path="../models/entities.d.ts" />
import Provider = require("services/entityManagerProvider");

export class Repository<T extends EntityBase> {

    constructor(private entityManagerProvider: Provider.EntityManagerProvider, private entityTypeName, public resourceName?: string, public fetchStrategy?: breeze.FetchStrategySymbol) {
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
            .then<T>((data: any) => {
                if (!data.entity)
                    throw new Error("Entity not found!");
                return data.entity;
            });
    }

    find(predicate: breeze.Predicate): breeze.Promise<breeze.QueryResult<T>>;
    find(predicate: breeze.Predicate, orderBy: string): breeze.Promise<breeze.QueryResult<T>>;
    find(predicate: breeze.Predicate, orderBy: string, expand: string): breeze.Promise<breeze.QueryResult<T>>;

    find(predicate: breeze.Predicate, orderBy?: string, expand?: string): breeze.Promise<breeze.QueryResult<T>> {
        var query = breeze.EntityQuery
            .from(this.resourceName);

        if (expand) query = query.expand(expand);

        query = query.where(predicate);

        if (orderBy) query = query.orderBy(orderBy);

        return this.executeQuery(query);
    }

    page(predicate: breeze.Predicate, page: number, pageLength: number, orderBy: string) {
        var query = breeze.EntityQuery
            .from(this.resourceName)
            .where(predicate)
            .orderBy(orderBy)
            .inlineCount()
            .skip((page - 1) * pageLength)
            .take(pageLength);

        return this.executeQuery(query);
    }

    findInCache(predicate: breeze.Predicate) {
        var query = breeze.EntityQuery
            .from(this.resourceName)
            .where(predicate);

        return this.executeCacheQuery(query);
    }

    all() {
        var query = breeze.EntityQuery
            .from(this.resourceName);

        return this.executeQuery(query);
    }

    allInCache() {
        var query = breeze.EntityQuery
            .from(this.resourceName);

        return this.executeCacheQuery(query);
    }

    add(config?: {}, state?: breeze.EntityStateSymbol) {
        return <T>this.manager().createEntity(this.entityTypeName, config, state);
    }


    remove(entity: T) {
        this.ensureEntityType(entity, this.entityTypeName);
        entity.entityAspect.setDeleted();
    }


    manager() {
        return this.entityManagerProvider.manager();
    }

    executeQuery(query: breeze.EntityQuery): breeze.Promise<breeze.QueryResult<T>> {
        var fetchStrategy = this.fetchStrategy || breeze.FetchStrategy.FromServer;
        return this.manager()
            .executeQuery<T>(query.using(fetchStrategy));
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

    toBreezeP<R>(promise: JQueryPromise): breeze.Promise<R> {
        var deferred = Q.defer<R>();
        promise
            .then(result => {
                deferred.resolve(result);
            })
            .fail((x, status, error) => deferred.reject(error));
        return <any>deferred.promise;
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

}

