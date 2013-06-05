/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../models/entities.d.ts" />

import ViewModels = module("viewmodels/viewModelBase");

export function activate(activationData) {
    return viewModel().activate(activationData);
}

class HomeViewModel extends ViewModels.ViewModelBase {
    title = ko.observable("Home view");

    activate(activationData) {
        return super.activate(activationData);
    }
}

export var viewModel = ko.observable(new HomeViewModel());
