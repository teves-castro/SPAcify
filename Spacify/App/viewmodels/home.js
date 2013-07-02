var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/viewModelBase", "services/unitOfWork"], function(require, exports, __ViewModels__, __UnitOfWork__) {
    /// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
    /// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
    /// <reference path="../models/entities.d.ts" />
    var ViewModels = __ViewModels__;
    var UnitOfWork = __UnitOfWork__;

    var HomeViewModel = (function (_super) {
        __extends(HomeViewModel, _super);
        function HomeViewModel() {
            _super.call(this);
            this.title = ko.observable("Home view");
            this.uow = UnitOfWork.create();
            this.blogs = ko.observableArray();
        }
        HomeViewModel.prototype.activate = function (activationData) {
            return _super.prototype.activate.call(this, activationData);
        };

        HomeViewModel.prototype.viewAttached = function () {
            this.refresh();
        };

        HomeViewModel.prototype.refresh = function () {
            var _this = this;
            this.uow.blogs.all().then(function (blogs) {
                _this.blogs(blogs.results);
            });
        };

        HomeViewModel.prototype.addNew = function () {
            var _this = this;
            var blog = this.uow.blogs.add({ name: "Added blog" }, breeze.EntityState.Detached);

            this.uow.blogs.createBlog(blog).then(function () {
                return _this.refresh();
            }).fail(toastr.error);
        };
        HomeViewModel.prototype.remove = function (blog) {
            this.uow.blogs.remove(blog);
            this.uow.commit().then(this.refresh).fail(toastr.error);
        };
        return HomeViewModel;
    })(ViewModels.ViewModelBase);

    
    return HomeViewModel;
});
//@ sourceMappingURL=home.js.map
