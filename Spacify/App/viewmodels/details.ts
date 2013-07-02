/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ViewModels = module("viewmodels/viewModelBase");

class DetailsViewModel extends ViewModels.ViewModelBase {
    title = ko.observable("Details view");

    activate(activationData) {
        alert("Hello world!");
        return super.activate(activationData);
    }
}

export = DetailsViewModel;