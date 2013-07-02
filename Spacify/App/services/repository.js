define(["require", "exports"], function(require, exports) {
    

    var Repository = (function () {
        function Repository(entityManagerProvider, entityTypeName, resourceName, fetchStrategy) {
            this.entityManagerProvider = entityManagerProvider;
            this.entityTypeName = entityTypeName;
            this.resourceName = resourceName;
            this.fetchStrategy = fetchStrategy;
            // Ensure resourceName is registered
            var entityType;
            if (entityTypeName) {
                entityType = this.getMetastore().getEntityType(entityTypeName);
                entityType.setProperties({ defaultResourceName: resourceName });

                this.getMetastore().setEntityTypeForResourceName(resourceName, entityTypeName);
            }
        }
        Repository.prototype.withId = function (key) {
            if (!this.entityTypeName)
                throw new Error("Repository must be created with an entity type specified");

            return this.manager().fetchEntityByKey(this.entityTypeName, key, true).then(function (data) {
                if (!data.entity)
                    throw new Error("Entity not found!");
                return data.entity;
            });
        };

        Repository.prototype.find = function (predicate, orderBy, expand) {
            var query = breeze.EntityQuery.from(this.resourceName);

            if (expand)
                query = query.expand(expand);

            query = query.where(predicate);

            if (orderBy)
                query = query.orderBy(orderBy);

            return this.executeQuery(query);
        };

        Repository.prototype.page = function (predicate, page, pageLength, orderBy) {
            var query = breeze.EntityQuery.from(this.resourceName).where(predicate).orderBy(orderBy).inlineCount().skip((page - 1) * pageLength).take(pageLength);

            return this.executeQuery(query);
        };

        Repository.prototype.findInCache = function (predicate) {
            var query = breeze.EntityQuery.from(this.resourceName).where(predicate);

            return this.executeCacheQuery(query);
        };

        Repository.prototype.all = function () {
            var query = breeze.EntityQuery.from(this.resourceName);

            return this.executeQuery(query);
        };

        Repository.prototype.allInCache = function () {
            var query = breeze.EntityQuery.from(this.resourceName);

            return this.executeCacheQuery(query);
        };

        Repository.prototype.add = function (config, state) {
            return this.manager().createEntity(this.entityTypeName, config, state);
        };

        Repository.prototype.remove = function (entity) {
            this.ensureEntityType(entity, this.entityTypeName);
            entity.entityAspect.setDeleted();
        };

        Repository.prototype.manager = function () {
            return this.entityManagerProvider.manager();
        };

        Repository.prototype.executeQuery = function (query) {
            var fetchStrategy = this.fetchStrategy || breeze.FetchStrategy.FromServer;
            return this.manager().executeQuery(query.using(fetchStrategy));
        };

        Repository.prototype.serializeEntity = function (obj) {
            var seen = [];

            return JSON.stringify(obj, function (key, val) {
                if (typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return;
                    seen.push(val);
                }
                return val;
            });
        };

        Repository.prototype.toBreezeP = function (promise) {
            var deferred = Q.defer();
            promise.then(function (result) {
                deferred.resolve(result);
            }).fail(function (x, status, error) {
                return deferred.reject(error);
            });
            return deferred.promise;
        };

        Repository.prototype.executeCacheQuery = function (query) {
            return this.manager().executeQueryLocally(query);
        };

        Repository.prototype.getMetastore = function () {
            return this.manager().metadataStore;
        };

        Repository.prototype.ensureEntityType = function (obj, entityTypeName) {
            if (!obj.entityType || obj.entityType.shortName !== entityTypeName) {
                throw new Error('Object must be an entity of type ' + entityTypeName);
            }
        };
        return Repository;
    })();
    exports.Repository = Repository;
});
//@ sourceMappingURL=repository.js.map
