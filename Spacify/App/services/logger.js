define(["require", "exports", "durandal/system"], function(require, exports, __System__) {
    /// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
    /// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
    var System = __System__;

    function info(message) {
        logIt(message, null, null, true, 'info');
    }
    exports.info = info;

    function log(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'info');
    }
    exports.log = log;

    function logError(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'error');
    }
    exports.logError = logError;

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
});
//@ sourceMappingURL=logger.js.map
