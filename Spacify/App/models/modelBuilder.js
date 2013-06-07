define(["require", "exports"], function(require, exports) {
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
})
//@ sourceMappingURL=modelBuilder.js.map
