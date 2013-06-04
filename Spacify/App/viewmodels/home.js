var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/viewModelBase"], function(require, exports, __ViewModels__) {
    var ViewModels = __ViewModels__;

    function activate(activationData) {
        return exports.viewModel().activate(activationData);
    }
    exports.activate = activate;
    var HomeViewModel = (function (_super) {
        __extends(HomeViewModel, _super);
        function HomeViewModel() {
            _super.apply(this, arguments);

            this.title = ko.observable("Home view");
        }
        HomeViewModel.prototype.activate = function (activationData) {
            return _super.prototype.activate.call(this, activationData);
        };
        return HomeViewModel;
    })(ViewModels.ViewModelBase);    
    exports.viewModel = ko.observable(new HomeViewModel());
})
//@ sourceMappingURL=home.js.map