using Spacify.Models;

namespace Spacify.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BlogDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BlogDbContext context)
        {
            if (!context.Blogs.Any())
            {
                context.Blogs.AddOrUpdate(
                    new Blog { Id = Guid.NewGuid(), Name = "Blog 1" },
                    new Blog { Id = Guid.NewGuid(), Name = "Blog 2" },
                    new Blog { Id = Guid.NewGuid(), Name = "Blog 3" },
                    new Blog { Id = Guid.NewGuid(), Name = "Blog 4" }
                    );
            }
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
