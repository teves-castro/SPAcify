define(["require", "exports", "../services/logger"], function(require, exports, __logger__) {
    var logger = __logger__;

    var ViewModelBase = (function () {
        function ViewModelBase() {
            this.title = ko.observable();
            for(var methodName in this) {
                var fn = this[methodName];
                if(typeof fn === "function") {
                    this[methodName] = this[methodName].bind(this);
                }
            }
        }
        ViewModelBase.prototype.activate = function (activationData) {
            logger.info(this.title() + " Activated");
            return true;
        };
        return ViewModelBase;
    })();
    exports.ViewModelBase = ViewModelBase;    
})
//@ sourceMappingURL=viewModelBase.js.map
