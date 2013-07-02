/// <reference path="../../Scripts/typings/breeze/breeze.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../models/entities.d.ts" />

export function extendMetadata(metadataStore: breeze.MetadataStore) {
    extendBlog(metadataStore);
}

function getUuid() {
    return (<any>breeze).core.getUuid();
}
function extendBlog(metadataStore: breeze.MetadataStore) {
    var blogCtor = function () {
        this.id = ko.observable(getUuid());
    };

    var blogInitializer = function (blog: Blog) {
    };

    metadataStore.registerEntityTypeCtor('Blog', blogCtor, blogInitializer);
}
