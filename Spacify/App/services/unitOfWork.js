define(["require", "exports", "services/entityManagerProvider", "services/repositories", "durandal/app"], function(require, exports, __Provider__, __Repository__, __App__) {
    var Provider = __Provider__;
    var Repository = __Repository__;
    var App = __App__;

    var refs = {};

    var UnitOfWork = (function () {
        function UnitOfWork() {
            this.provider = Provider.create();
            this.blogs = new Repository.BlogRepository(this.provider);
        }
        UnitOfWork.prototype.hasChanges = function () {
            return this.provider.manager().hasChanges();
        };

        UnitOfWork.prototype.commit = function (resource) {
            var saveOptions = new breeze.SaveOptions({ resourceName: resource || 'resources/savechanges' });

            return this.provider.manager().saveChanges(null, saveOptions).then(function (saveResult) {
                App.trigger('saved', saveResult.entities);
                return saveResult;
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
                if (this._referenceCount === 0) {
                    this.clear();
                }
            };
            var value = null;

            this._referenceCount = 0;
        }
        SmartReference.prototype.value = function () {
            if (this._value === null) {
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
        if (!refs[key]) {
            refs[key] = new SmartReference();
        }

        return refs[key];
    }
    exports.get = get;

    function clean() {
        for (var key in refs) {
            if (refs[key].referenceCount == 0) {
                delete refs[key];
            }
        }
    }
});
//@ sourceMappingURL=unitOfWork.js.map
