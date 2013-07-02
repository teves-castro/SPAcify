var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/viewModelBase"], function(require, exports, __ViewModels__) {
    /// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
    /// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
    var ViewModels = __ViewModels__;

    var DetailsViewModel = (function (_super) {
        __extends(DetailsViewModel, _super);
        function DetailsViewModel() {
            _super.apply(this, arguments);
            this.title = ko.observable("Details view");
        }
        DetailsViewModel.prototype.activate = function (activationData) {
            alert("Hello world!");
            return _super.prototype.activate.call(this, activationData);
        };
        return DetailsViewModel;
    })(ViewModels.ViewModelBase);

    
    return DetailsViewModel;
});
//@ sourceMappingURL=details.js.map
