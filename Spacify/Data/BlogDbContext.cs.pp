using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using $rootnamespace$.Models;

namespace $rootnamespace$.Data
{
    public class BlogDbContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }

        static BlogDbContext()
        {
            //TODO: uncomment the next line after building the project
            //Database.SetInitializer(new BlogDbInitializer());
        }

        public BlogDbContext()
            : base("Blogs")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        //TODO: uncomment the next line after building the project
        //private class BlogDbInitializer : MigrateDatabaseToLatestVersion<BlogDbContext, Migrations.Configuration> { }
    }
}
