using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;
using Spacify.Data;
using Spacify.Models;

namespace Spacify.Controllers
{
    [BreezeController]
    [Authorize]
    public class ResourcesController : ApiController
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();

        // ~/breeze/resources/Lookups
        [HttpGet]
        public Lookups Lookups()
        {
            return new Lookups
            {
            };
        }

        // ~/breeze/resources/Blogs
        [HttpGet]
        public IQueryable<Blog> Blogs()
        {
            return _unitOfWork.Blogs.GetAll();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            var result = _unitOfWork.SaveChanges(saveBundle);
            return result;
        }

        [HttpPost]
        public bool CreateBlog([FromBody]Blog blog)
        {
            try
            {
                _unitOfWork.Blogs.Add(blog);
                _unitOfWork.Commit();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}