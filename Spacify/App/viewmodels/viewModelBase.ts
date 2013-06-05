/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
import logger = module("../services/logger");

export class ViewModelBase {
    title = ko.observable();

    activate(activationData) {
        logger.info(this.title() + " Activated");
        return true;
    }
}