define(["require", "exports"], function(require, exports) {
    function getCurrentDate() {
        return new Date();
    }
    exports.getCurrentDate = getCurrentDate;
    function getSaveValidationErrorMessage(saveError) {
        try  {
            var firstEntity = saveError.entitiesWithErrors[0];
            return 'Validation Error: ' + getEntityValidationErrorMessage(firstEntity);
        } catch (e) {
            return "Save validation error";
        }
    }
    exports.getSaveValidationErrorMessage = getSaveValidationErrorMessage;
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
})
//@ sourceMappingURL=utilities.js.map
