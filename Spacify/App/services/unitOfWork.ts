import Provider = require("services/entityManagerProvider");
import Repository = require("services/repositories");
import App = require("durandal/app");

var refs = {};

export class UnitOfWork {

    private provider: Provider.EntityManagerProvider;
    blogs: Repository.BlogRepository;

    constructor() {
        this.provider = Provider.create();
        this.blogs = new Repository.BlogRepository(this.provider);
    }

    hasChanges() {
        return this.provider.manager().hasChanges();
    }

    commit(resource?: string) {
        var saveOptions = new breeze.SaveOptions({ resourceName: resource || 'resources/savechanges' });

        return this.provider.manager().saveChanges(null, saveOptions)
            .then(saveResult => {
                App.trigger('saved', saveResult.entities);
                return saveResult;
            });
    }

    rollback() {
        this.provider.manager().rejectChanges();
    }

}

export class SmartReference {

    private _referenceCount: number;

    constructor() {
        var value = null;

        this._referenceCount = 0;
    }
    private _value: UnitOfWork;
    value() {
        if (this._value === null) {
            this._value = new UnitOfWork();
        }

        this._referenceCount++;
        return this._value;
    }

    clear() {
        this._value = null;
        this._referenceCount = 0;

        clean();
    }

    release = function () {
        this._referenceCount--;
        if (this._referenceCount === 0) {
            this.clear();
        }
    };
}

export function create() {
    return new UnitOfWork();
}

export function get(key): SmartReference {
    if (!refs[key]) {
        refs[key] = new SmartReference();
    }

    return refs[key];
}

function clean() {
    for (var key in refs) {
        if (refs[key].referenceCount == 0) {
            delete refs[key];
        }
    }
}
