import Provider = require("services/entityManagerProvider");
import Repository = require("services/repository");

export class BlogRepository extends Repository.Repository<Blog> {
    constructor(entityManagerProvider: Provider.EntityManagerProvider, fetchStrategy?: breeze.FetchStrategySymbol) {
        super(entityManagerProvider, "Blog", "resources/blogs", fetchStrategy);
    }

    createBlog(blog: Blog) {
        var raw = super.manager().helper.unwrapInstance(blog, false);
        return $.ajax("breeze/resources/CreateBlog", {
            data: this.serializeEntity(raw),
            dataType: "json",
            type: "POST",
            contentType: "application/json",
        });
    }
}