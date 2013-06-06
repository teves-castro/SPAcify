define(["require", "exports", "services/logger", "durandal/system", "services/utilities"], function(require, exports, __logger__, __system__, __util__) {
    var logger = __logger__;

    var system = __system__;

    var util = __util__;

    var ErrorHandler = (function () {
        function ErrorHandler(targetObject) {
            this.targetObject = targetObject;
        }
        ErrorHandler.prototype.handleError = function (error) {
            if(error.message.match(/validation error/i)) {
                error.message = util.getSaveValidationErrorMessage(error);
            }
            logger.logError(error.message, null, system.getModuleId(this.targetObject), true);
            throw error;
        };
        ErrorHandler.prototype.log = function (message, showToast) {
            logger.log(message, null, system.getModuleId(this.targetObject), showToast);
        };
        return ErrorHandler;
    })();
    exports.ErrorHandler = ErrorHandler;    
    function includeIn(targetObject) {
        return $.extend(targetObject, new ErrorHandler(targetObject));
    }
    exports.includeIn = includeIn;
    function handleError(error) {
        if(error.message.match(/validation error/i)) {
            error.message = util.getSaveValidationErrorMessage(error);
        }
        logger.logError(error.message, null, system.getModuleId(this.targetObject), true);
        throw error;
    }
    exports.handleError = handleError;
    ;
    function log(message, showToast) {
        logger.log(message, null, system.getModuleId(this.targetObject), showToast);
    }
    ;
})
//@ sourceMappingURL=errorHandler.js.map
