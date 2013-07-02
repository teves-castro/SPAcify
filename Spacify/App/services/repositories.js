var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "services/repository"], function(require, exports, __Repository__) {
    
    var Repository = __Repository__;

    var BlogRepository = (function (_super) {
        __extends(BlogRepository, _super);
        function BlogRepository(entityManagerProvider, fetchStrategy) {
            _super.call(this, entityManagerProvider, "Blog", "resources/blogs", fetchStrategy);
        }
        BlogRepository.prototype.createBlog = function (blog) {
            var raw = _super.prototype.manager.call(this).helper.unwrapInstance(blog, false);
            return $.ajax("breeze/resources/CreateBlog", {
                data: this.serializeEntity(raw),
                dataType: "json",
                type: "POST",
                contentType: "application/json"
            });
        };
        return BlogRepository;
    })(Repository.Repository);
    exports.BlogRepository = BlogRepository;
});
//@ sourceMappingURL=repositories.js.map
