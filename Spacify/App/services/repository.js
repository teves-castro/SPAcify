define(["require", "exports"], function(require, exports) {
    
    var Repository = (function () {
        function Repository(entityManagerProvider, entityTypeName, resourceName, fetchStrategy) {
            this.entityManagerProvider = entityManagerProvider;
            this.entityTypeName = entityTypeName;
            this.resourceName = resourceName;
            this.fetchStrategy = fetchStrategy;
            var entityType;
            if(entityTypeName) {
                entityType = this.getMetastore().getEntityType(entityTypeName);
                entityType.setProperties({
                    defaultResourceName: resourceName
                });
                this.getMetastore().setEntityTypeForResourceName(resourceName, entityTypeName);
            }
        }
        Repository.prototype.withId = function (key) {
            if(!this.entityTypeName) {
                throw new Error("Repository must be created with an entity type specified");
            }
            return this.manager().fetchEntityByKey(this.entityTypeName, key, true).then(function (data) {
                if(!data.entity) {
                    throw new Error("Entity not found!");
                }
                return data.entity;
            });
        };
        Repository.prototype.find = function (predicate) {
            var query = breeze.EntityQuery.from(this.resourceName).where(predicate);
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
        Repository.prototype.add = function (config) {
            return this.manager().createEntity(this.entityTypeName, config);
        };
        Repository.prototype.remove = function (entity) {
            this.ensureEntityType(entity, this.entityTypeName);
            entity.entityAspect.setDeleted();
        };
        Repository.prototype.executeQuery = function (query) {
            return this.manager().executeQuery(query.using(this.fetchStrategy || breeze.FetchStrategy.FromServer)).then(function (data) {
                return data.results;
            });
        };
        Repository.prototype.executeCacheQuery = function (query) {
            return this.manager().executeQueryLocally(query);
        };
        Repository.prototype.getMetastore = function () {
            return this.manager().metadataStore;
        };
        Repository.prototype.manager = function () {
            return this.entityManagerProvider.manager();
        };
        Repository.prototype.ensureEntityType = function (obj, entityTypeName) {
            if(!obj.entityType || obj.entityType.shortName !== entityTypeName) {
                throw new Error('Object must be an entity of type ' + entityTypeName);
            }
        };
        return Repository;
    })();
    exports.Repository = Repository;    
    function create(entityManagerProvider, entityTypeName, resourceName, fetchStrategy) {
        return new Repository(entityManagerProvider, entityTypeName, resourceName, fetchStrategy);
    }
    exports.create = create;
})
//@ sourceMappingURL=repository.js.map
