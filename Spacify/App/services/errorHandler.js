define(["require", "exports", "services/logger", "durandal/system", "services/utilities"], function(require, exports, __Logger__, __System__, __Util__) {
    var Logger = __Logger__;
    var System = __System__;
    var Util = __Util__;

    var ErrorHandler = (function () {
        function ErrorHandler(targetObject) {
            this.targetObject = targetObject;
        }
        ErrorHandler.prototype.handleError = function (error) {
            if (error.message.match(/validation error/i)) {
                error.message = Util.getSaveValidationErrorMessage(error);
            }

            Logger.logError(error.message, null, System.getModuleId(this.targetObject), true);
            throw error;
        };

        ErrorHandler.prototype.log = function (message, showToast) {
            Logger.log(message, null, System.getModuleId(this.targetObject), showToast);
        };
        return ErrorHandler;
    })();
    exports.ErrorHandler = ErrorHandler;

    function includeIn(targetObject) {
        return $.extend(targetObject, new ErrorHandler(targetObject));
    }
    exports.includeIn = includeIn;

    function handleError(error) {
        if (error.message.match(/validation error/i)) {
            error.message = Util.getSaveValidationErrorMessage(error);
        }

        Logger.logError(error.message, null, System.getModuleId(this.targetObject), true);
        throw error;
    }
    exports.handleError = handleError;
    ;

    function log(message, showToast) {
        Logger.log(message, null, System.getModuleId(this.targetObject), showToast);
    }
    ;
});
//@ sourceMappingURL=errorHandler.js.map
