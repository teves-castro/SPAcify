using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;
using Spacify.Models;

namespace Spacify.Controllers
{
    [BreezeController]
    [Authorize]
    public class ResourcesController : ApiController
    {
        //private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // ~/breeze/resources/Lookups
        [HttpGet]
        public LookupBundle Lookups()
        {
            return new LookupBundle
            {
            };
        }


        // ~/breeze/resources/Blogs
        [HttpGet]
        public IQueryable<Blog> Blogs()
        {
            var db = new BlogDbContext();
            return db.Blogs;
        }
    }

    public class LookupBundle
    {
    }
}