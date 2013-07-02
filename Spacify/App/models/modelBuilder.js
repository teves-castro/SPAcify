define(["require", "exports"], function(require, exports) {
    /// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
    /// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
    /// <reference path="../models/entities.d.ts" />
    function extendMetadata(metadataStore) {
        extendBlog(metadataStore);
    }
    exports.extendMetadata = extendMetadata;

    function getUuid() {
        return (breeze).core.getUuid();
    }
    function extendBlog(metadataStore) {
        var blogCtor = function () {
            this.id = ko.observable(getUuid());
        };

        var blogInitializer = function (blog) {
        };

        metadataStore.registerEntityTypeCtor('Blog', blogCtor, blogInitializer);
    }
});
//@ sourceMappingURL=modelBuilder.js.map
