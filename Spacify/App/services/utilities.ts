/// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
export function getCurrentDate() {
    return new Date();
}

// Provisional version returns validation error messages 
// of first entity that failed to save
export function getSaveValidationErrorMessage(saveError: breeze.ValidationError) {
    try { // return the first entity's error message(s)
        var firstEntity = (<any>saveError).entitiesWithErrors[0];
        return 'Validation Error: ' + getEntityValidationErrorMessage(firstEntity);
    } catch (e) { // ignore problem extracting error message 
        return "Save validation error";
    }
}

// Return string of an entity's validation error messages 
export function getEntityValidationErrorMessage(entity: breeze.Entity) {
    try {
        var errs = entity.entityAspect.getValidationErrors();
        var errmsgs = errs.map(function (ve) { return ve.errorMessage; });
        return errmsgs.length ? errmsgs.join("; ") : "no validation errors";
    } catch (e) {
        return "not an entity";
    }
}