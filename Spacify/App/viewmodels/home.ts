/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../models/entities.d.ts" />
import ViewModels = module("viewmodels/viewModelBase");
import UnitOfWork = module("services/unitOfWork");

export function activate(activationData) {
    return viewModel().activate(activationData);
}

class HomeViewModel extends ViewModels.ViewModelBase {

    private uow: UnitOfWork.UnitOfWork;

    title = ko.observable("Home view");

    blogs: KnockoutObservableBlogArray;

    constructor() {
        super();
        this.uow = UnitOfWork.create();
        this.blogs = ko.observableArray();
        this.uow.blogs.all().then((blogs: Blog[]) => {
            this.blogs(blogs);
        });
    }

    activate(activationData) {
        return super.activate(activationData);
    }
}

export var viewModel = ko.observable(new HomeViewModel());
