/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
export class ViewModelBase {
    title = ko.observable();

    activate(activationData) {
        toastr.info(this.title() + " Activated");
        return true;
    }
}