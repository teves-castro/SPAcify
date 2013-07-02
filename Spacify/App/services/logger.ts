/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
import System = module("durandal/system");

export function info(message) {
    logIt(message, null, null, true, 'info');
}

export function log(message, data, source, showToast) {
    logIt(message, data, source, showToast, 'info');
}

export function logError(message, data, source, showToast) {
    logIt(message, data, source, showToast, 'error');
}

function logIt(message, data, source, showToast, toastType) {
    source = source ? '[' + source + '] ' : '';
    if (data) {
        System.log(source, message, data);
    } else {
        System.log(source, message);
    }
    if (showToast) {
        if (toastType === 'error') {
            toastr.error(message);
        } else {
            toastr.info(message);
        }
    }
}
