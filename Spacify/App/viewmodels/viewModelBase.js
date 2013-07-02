define(["require", "exports", "../services/logger"], function(require, exports, __Logger__) {
    /// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
    /// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
    var Logger = __Logger__;

    var ViewModelBase = (function () {
        function ViewModelBase() {
            this.title = ko.observable();
            for (var methodName in this) {
                var fn = this[methodName];
                if (typeof fn === "function") {
                    this[methodName] = this[methodName].bind(this);
                }
            }
        }
        ViewModelBase.prototype.activate = function (activationData) {
            Logger.info(this.title() + " Activated");
            return true;
        };
        return ViewModelBase;
    })();
    exports.ViewModelBase = ViewModelBase;
});
//@ sourceMappingURL=viewModelBase.js.map
