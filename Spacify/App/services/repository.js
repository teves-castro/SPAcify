var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        Repository.prototype.ensureEntityType = function (obj, entityTypeName) {
            if(!obj.entityType || obj.entityType.shortName !== entityTypeName) {
                throw new Error('Object must be an entity of type ' + entityTypeName);
            }
        };
        Repository.prototype.serializeEntity = function (obj) {
            var seen = [];
            return JSON.stringify(obj, function (key, val) {
                if(typeof val == "object") {
                    if(seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            });
        };
        return Repository;
    })();
    exports.Repository = Repository;    
    var BlogRepository = (function (_super) {
        __extends(BlogRepository, _super);
        function BlogRepository(entityManagerProvider, fetchStrategy) {
                _super.call(this, entityManagerProvider, "Blog", "resources/blogs", fetchStrategy);
            this.entityManagerProvider = entityManagerProvider;
            this.fetchStrategy = fetchStrategy;
        }
        BlogRepository.prototype.createBlog = function (blog) {
            var raw = _super.prototype.manager.call(this).helper.unwrapInstance(blog, false);
            return $.ajax("breeze/resources/CreateBlog", {
                data: this.serializeEntity(raw),
                dataType: "json",
                type: "POST",
                contentType: "application/json"
            });
        };
        return BlogRepository;
    })(Repository);
    exports.BlogRepository = BlogRepository;    
})
//@ sourceMappingURL=repository.js.map
