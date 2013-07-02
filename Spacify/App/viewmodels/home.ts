/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../models/entities.d.ts" />
import ViewModels = module("viewmodels/viewModelBase");
import UnitOfWork = module("services/unitOfWork");

class HomeViewModel extends ViewModels.ViewModelBase {

    private uow: UnitOfWork.UnitOfWork;

    title = ko.observable("Home view");

    blogs: KnockoutObservableArray<Blog>;

    constructor() {
        super();
        this.uow = UnitOfWork.create();
        this.blogs = ko.observableArray();
    }

    activate(activationData) {
        return super.activate(activationData);
    }

    viewAttached() {
        this.refresh();
    }

    refresh() {
        this.uow.blogs.all().then(blogs => {
            this.blogs(blogs.results);
        });
    }

    addNew() {
        var blog = <Blog>this.uow.blogs.add({ name: "Added blog" }, breeze.EntityState.Detached);

        this.uow.blogs.createBlog(blog)
            .then(() => this.refresh())
            .fail(toastr.error);

        //this.uow
        //    .commit()
        //    .then(data => this.refresh())
        //    .fail(toastr.error);
    }
    remove(blog: Blog) {
        this.uow.blogs.remove(blog);
        this.uow.commit().then(this.refresh).fail(toastr.error);
    }
}

export = HomeViewModel;
