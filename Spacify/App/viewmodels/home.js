var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/viewModelBase", "services/unitOfWork"], function(require, exports, __ViewModels__, __UnitOfWork__) {
    var ViewModels = __ViewModels__;

    var UnitOfWork = __UnitOfWork__;

    function activate(activationData) {
        return exports.viewModel().activate(activationData);
    }
    exports.activate = activate;
    var HomeViewModel = (function (_super) {
        __extends(HomeViewModel, _super);
        function HomeViewModel() {
            var _this = this;
                _super.call(this);
            this.title = ko.observable("Home view");
            this.uow = UnitOfWork.create();
            this.blogs = ko.observableArray();
            this.uow.blogs.all().then(function (blogs) {
                _this.blogs(blogs);
            });
        }
        HomeViewModel.prototype.activate = function (activationData) {
            return _super.prototype.activate.call(this, activationData);
        };
        HomeViewModel.prototype.refresh = function () {
            var _this = this;
            this.uow.blogs.all().then(function (blogs) {
                _this.blogs(blogs);
            });
        };
        HomeViewModel.prototype.addNew = function () {
            var _this = this;
            var blog = this.uow.blogs.add({
                name: "Added blog"
            }, breeze.EntityState.Detached);
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
    exports.viewModel = ko.observable(new HomeViewModel());
})
//@ sourceMappingURL=home.js.map
