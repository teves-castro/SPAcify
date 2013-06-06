define(["require", "exports", "services/account"], function(require, exports, __account__) {
    var account = __account__;

    exports.username = ko.observable("");
    exports.password = ko.observable("");
    exports.remember = ko.observable(false);
    exports.isValid = ko.computed(function () {
        return exports.username() && exports.password();
    });
    function loginUser() {
        if(!exports.isValid()) {
            return Q.resolve(false);
        }
        return account.loginUser(exports.username(), exports.password(), exports.remember()).then(function () {
            window.location.href = "/SPAcify/";
            return true;
        }).fail(function (error) {
            toastr.error(error);
            throw new Error(error);
        });
    }
    exports.loginUser = loginUser;
})
//@ sourceMappingURL=login.js.map
