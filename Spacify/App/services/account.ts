/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/q/Q.d.ts" />
export function loginUser(username: string, password: string, remember: bool) {
    var data = {
        username: username,
        password: password,
        remember:remember
    };

    return Q.when($.ajax({
        url: 'breeze/account/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    })).fail(handleError);
}

export function logoutUser() {
    return Q.when($.get("breeze/account/logout"))
        .fail(handleError);
}

function handleError(response) {
    var error = JSON.parse(response.responseText);
    throw new Error(error.ExceptionMessage);
}