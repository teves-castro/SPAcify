define(["require", "exports"], function(require, exports) {
    /// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
    function getCurrentDate() {
        return new Date();
    }
    exports.getCurrentDate = getCurrentDate;

    // Provisional version returns validation error messages
    // of first entity that failed to save
    function getSaveValidationErrorMessage(saveError) {
        try  {
            var firstEntity = (saveError).entitiesWithErrors[0];
            return 'Validation Error: ' + exports.getEntityValidationErrorMessage(firstEntity);
        } catch (e) {
            return "Save validation error";
        }
    }
    exports.getSaveValidationErrorMessage = getSaveValidationErrorMessage;

    // Return string of an entity's validation error messages
    function getEntityValidationErrorMessage(entity) {
        try  {
            var errs = entity.entityAspect.getValidationErrors();
            var errmsgs = errs.map(function (ve) {
                return ve.errorMessage;
            });
            return errmsgs.length ? errmsgs.join("; ") : "no validation errors";
        } catch (e) {
            return "not an entity";
        }
    }
    exports.getEntityValidationErrorMessage = getEntityValidationErrorMessage;
});
//@ sourceMappingURL=utilities.js.map
