import emp = module("services/entityManagerProvider");
import repository = module("services/repository");
import app = module("durandal/app");
var refs = {};

export class UnitOfWork {

    private provider: emp.EntityManagerProvider;
    blogs: repository.Repository;

    constructor() {
        this.provider = emp.create();
        this.blogs = repository.create(this.provider, "Blog", "resources/blogs");

        //this.staffingResourceListItems = repository.create(provider, null, 'resources/staffingresourcelistitems');
        //this.staffingResources = repository.create(provider, 'StaffingResource', 'resources/staffingresources');
        //this.addresses = repository.create(provider, 'Address', 'resources/addresses');
        //this.addressTypes = repository.create(provider, 'AddressType', 'resources/addresstypes', breeze.FetchStrategy.FromLocalCache);
        //this.phoneNumbers = repository.create(provider, 'PhoneNumber', 'resources/phonenumbers');
        //this.phoneNumberTypes = repository.create(provider, 'PhoneNumberType', 'resources/phonenumbertypes', breeze.FetchStrategy.FromLocalCache);

        //this.states = repository.create(provider, 'State', 'resources/s tates', breeze.FetchStrategy.FromLocalCache);
    }

    hasChanges() {
        return this.provider.manager().hasChanges();
    };

    commit() {
        var saveOptions = new breeze.SaveOptions({ resourceName: 'resources/savechanges' });

        return this.provider.manager().saveChanges(null, saveOptions)
            .then(function (saveResult) {
                app.trigger('saved', saveResult.entities);
            });
    };

    rollback() {
        this.provider.manager().rejectChanges();
    };

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
    };

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

export function get (key): SmartReference {
    if (!refs[key]) {
        refs[key] = new SmartReference();
    }

    return refs[key];
}

private clean() {
    for (var key in refs) {
        if (refs[key].referenceCount == 0) {
            delete refs[key];
        }
    }
}
