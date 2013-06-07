using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace $rootnamespace$.Models
{
    public class BlogDbContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }

        static BlogDbContext()
        {
            Database.SetInitializer(new BlogDbInitializer());
        }

        public BlogDbContext()
            : base("Blogs")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        private class BlogDbInitializer : MigrateDatabaseToLatestVersion<BlogDbContext, Migrations.Configuration> { }
    }
}
