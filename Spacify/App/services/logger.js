define(["require", "exports", "durandal/system"], function(require, exports, __system__) {
    var system = __system__;

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
        if(data) {
            system.log(source, message, data);
        } else {
            system.log(source, message);
        }
        if(showToast) {
            if(toastType === 'error') {
                toastr.error(message);
            } else {
                toastr.info(message);
            }
        }
    }
})
//@ sourceMappingURL=logger.js.map
