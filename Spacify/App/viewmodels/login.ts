/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/q/Q.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
import account = module("services/account");

export var username = ko.observable("");
export var password = ko.observable("");
export var remember = ko.observable(false);

export var isValid = ko.computed(() => {
    return username() && password();
});

export function loginUser() {
    if (!isValid()) return Q.resolve(false);

    return account.loginUser(username(), password(), remember())
        .then(function () {
            window.location.href = "/";
            return true;
        })
        .fail(error => {
            toastr.error(error);
            throw new Error(error);
        });
}
