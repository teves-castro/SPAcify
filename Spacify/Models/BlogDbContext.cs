using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Spacify.Models
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

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations
            //            .Add(new ConciliationTypeConfiguration())
            //            .Add(new FileContentsConfiguration())
            //            .Add(new GroupUserConfiguration())
            //            .Add(new RecordTypeConfiguration())
            //            .Add(new FieldConfiguration())
            //            .Add(new RecordFieldConfiguration())
            //            .Add(new RecordConfiguration())
            //            .Add(new StatementConfiguration())
            //            .Add(new StatementMessageConfiguration());

            base.OnModelCreating(modelBuilder);
        }

        private class BlogDbInitializer : MigrateDatabaseToLatestVersion<BlogDbContext, Migrations.Configuration>
        {
        }

    }
}
