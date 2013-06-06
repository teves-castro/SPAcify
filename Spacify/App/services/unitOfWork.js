define(["require", "exports", "services/entityManagerProvider", "services/repository", "durandal/app"], function(require, exports, __emp__, __repository__, __app__) {
    var emp = __emp__;

    var repository = __repository__;

    var app = __app__;

    var refs = {
    };
    var UnitOfWork = (function () {
        function UnitOfWork() {
            this.provider = emp.create();
            this.blogs = repository.create(this.provider, "Blog", "resources/blogs");
        }
        UnitOfWork.prototype.hasChanges = function () {
            return this.provider.manager().hasChanges();
        };
        UnitOfWork.prototype.commit = function () {
            var saveOptions = new breeze.SaveOptions({
                resourceName: 'resources/savechanges'
            });
            return this.provider.manager().saveChanges(null, saveOptions).then(function (saveResult) {
                app.trigger('saved', saveResult.entities);
            });
        };
        UnitOfWork.prototype.rollback = function () {
            this.provider.manager().rejectChanges();
        };
        return UnitOfWork;
    })();
    exports.UnitOfWork = UnitOfWork;    
    var SmartReference = (function () {
        function SmartReference() {
            this.release = function () {
                this._referenceCount--;
                if(this._referenceCount === 0) {
                    this.clear();
                }
            };
            var value = null;
            this._referenceCount = 0;
        }
        SmartReference.prototype.value = function () {
            if(this._value === null) {
                this._value = new UnitOfWork();
            }
            this._referenceCount++;
            return this._value;
        };
        SmartReference.prototype.clear = function () {
            this._value = null;
            this._referenceCount = 0;
            clean();
        };
        return SmartReference;
    })();
    exports.SmartReference = SmartReference;    
    function create() {
        return new UnitOfWork();
    }
    exports.create = create;
    function get(key) {
        if(!refs[key]) {
            refs[key] = new SmartReference();
        }
        return refs[key];
    }
    exports.get = get;
    function clean() {
        for(var key in refs) {
            if(refs[key].referenceCount == 0) {
                delete refs[key];
            }
        }
    }
})
//@ sourceMappingURL=unitOfWork.js.map
