/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
import system = module("durandal/system");

export function log(message, data, source, showToast) {
    logIt(message, data, source, showToast, 'info');
}

export function logError(message, data, source, showToast) {
    logIt(message, data, source, showToast, 'error');
}

private logIt(message, data, source, showToast, toastType) {
    source = source ? '[' + source + '] ' : '';
    if (data) {
        system.log(source, message, data);
    } else {
        system.log(source, message);
    }
    if (showToast) {
        if (toastType === 'error') {
            toastr.error(message);
        } else {
            toastr.info(message);
        }
    }
}
