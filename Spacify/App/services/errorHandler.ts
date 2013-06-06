import logger = module("services/logger");
import system = module("durandal/system");
import util = module("services/utilities");

export class ErrorHandler {
    private targetObject;
    constructor(targetObject) {
        this.targetObject = targetObject;
    }

    handleError(error) {
        if (error.message.match(/validation error/i)) {
            error.message = util.getSaveValidationErrorMessage(error);
        }

        logger.logError(error.message, null, system.getModuleId(this.targetObject), true);
        throw error;
    };

    log(message, showToast) {
        logger.log(message, null, system.getModuleId(this.targetObject), showToast);
    };

}


export function includeIn(targetObject) {
    return $.extend(targetObject, new ErrorHandler(targetObject));
}

export function handleError(error) {
    if (error.message.match(/validation error/i)) {
        error.message = util.getSaveValidationErrorMessage(error);
    }

    logger.logError(error.message, null, system.getModuleId(this.targetObject), true);
    throw error;
};

private log(message, showToast) {
    logger.log(message, null, system.getModuleId(this.targetObject), showToast);
};

