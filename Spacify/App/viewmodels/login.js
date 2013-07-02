define(["require", "exports", "services/account"], function(require, exports, __Account__) {
    /// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
    /// <reference path="../../Scripts/typings/q/Q.d.ts" />
    /// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
    var Account = __Account__;

    exports.username = ko.observable("");
    exports.password = ko.observable("");
    exports.remember = ko.observable(false);

    exports.isValid = ko.computed(function () {
        return exports.username() && exports.password();
    });

    function loginUser() {
        if (!exports.isValid())
            return Q.resolve(false);

        return Account.loginUser(exports.username(), exports.password(), exports.remember()).then(function () {
            window.location.href = "/";
            return true;
        }).fail(function (error) {
            toastr.error(error);
            throw new Error(error);
        });
    }
    exports.loginUser = loginUser;
});
//@ sourceMappingURL=login.js.map
