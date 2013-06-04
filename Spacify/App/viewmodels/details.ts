/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ViewModels = module("viewmodels/viewModelBase");

export function activate(activationData) {
    return viewModel().activate(activationData);
}

class DetailsViewModel extends ViewModels.ViewModelBase {
    title = ko.observable("Details view");

    activate(activationData) {
        return super.activate(activationData);
    }
}

export var viewModel = ko.observable(new DetailsViewModel());