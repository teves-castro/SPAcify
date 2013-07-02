import Logger = module("services/logger");
import System = module("durandal/system");
import Util = module("services/utilities");

export class ErrorHandler {
    private targetObject;
    constructor(targetObject) {
        this.targetObject = targetObject;
    }

    handleError(error) {
        if (error.message.match(/validation error/i)) {
            error.message = Util.getSaveValidationErrorMessage(error);
        }

        Logger.logError(error.message, null, System.getModuleId(this.targetObject), true);
        throw error;
    }

    log(message, showToast) {
        Logger.log(message, null, System.getModuleId(this.targetObject), showToast);
    }

}


export function includeIn(targetObject) {
    return $.extend(targetObject, new ErrorHandler(targetObject));
}

export function handleError(error) {
    if (error.message.match(/validation error/i)) {
        error.message = Util.getSaveValidationErrorMessage(error);
    }

    Logger.logError(error.message, null, System.getModuleId(this.targetObject), true);
    throw error;
};

function log(message, showToast) {
    Logger.log(message, null, System.getModuleId(this.targetObject), showToast);
};

