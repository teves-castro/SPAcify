define(["require", "exports"], function(require, exports) {
    var ViewModelBase = (function () {
        function ViewModelBase() {
            this.title = ko.observable();
        }
        ViewModelBase.prototype.activate = function (activationData) {
            toastr.info(this.title() + " Activated");
            return true;
        };
        return ViewModelBase;
    })();
    exports.ViewModelBase = ViewModelBase;    
})
//@ sourceMappingURL=viewModelBase.js.map
