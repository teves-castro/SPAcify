define(["require", "exports"], function(require, exports) {
    function loginUser(username, password, remember) {
        var data = {
            username: username,
            password: password,
            remember: remember
        };
        return Q.when($.ajax({
            url: 'breeze/account/login',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data)
        })).fail(handleError);
    }
    exports.loginUser = loginUser;
    function logoutUser() {
        return Q.when($.get("breeze/account/logout")).fail(handleError);
    }
    exports.logoutUser = logoutUser;
    function handleError(response) {
        var error = JSON.parse(response.responseText);
        throw new Error(error.ExceptionMessage);
    }
})
//@ sourceMappingURL=account.js.map
