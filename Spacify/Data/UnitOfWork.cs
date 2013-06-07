using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Providers.Entities;
using Breeze.WebApi;
using Spacify.Models;

namespace Spacify.Data
{
    public class UnitOfWork : EFContextProvider<BlogDbContext>
    {
        public UnitOfWork()
        {
            _repositories = new Dictionary<Type, object>();
        }


        private readonly Dictionary<Type, object> _repositories;

        private IRepository<T> GetDefaultRepository<T>() where T : class
        {
            var key = typeof(IRepository<T>);
            if (!_repositories.ContainsKey(key))
                _repositories[key] = new EFRepository<T>(Context);

            return (IRepository<T>)_repositories[key];
        }


        protected override bool BeforeSaveEntity(EntityInfo entityInfo)
        {
            return _beforeSaveHandlers
                .Where(kvp => kvp.Key == entityInfo.Entity.GetType())
                .Select(kvp => kvp.Value)
                .All(h => h(entityInfo.Entity, entityInfo));
        }

        readonly Dictionary<Type, Func<object, EntityInfo, bool>> _beforeSaveHandlers = new Dictionary<Type, Func<object, EntityInfo, bool>>();

        public void RegisterSaveHandler<T>(Func<T, EntityInfo, bool> beforeSaveHandler) where T : class
        {
            _beforeSaveHandlers.Add(typeof(T), (e, ei) => beforeSaveHandler(e as T, ei));
        }


        protected override Dictionary<Type, List<EntityInfo>> BeforeSaveEntities(Dictionary<Type, List<EntityInfo>> saveMap)
        {
            return _beforeSaveBundleHandlers.Aggregate(saveMap, (a, d) => d(a));
        }
        readonly List<Func<Dictionary<Type, List<EntityInfo>>, Dictionary<Type, List<EntityInfo>>>> _beforeSaveBundleHandlers = new List<Func<Dictionary<Type, List<EntityInfo>>, Dictionary<Type, List<EntityInfo>>>>();

        public void RegisterSaveBundleHandler(Func<Dictionary<Type, List<EntityInfo>>, Dictionary<Type, List<EntityInfo>>> handler)
        {
            _beforeSaveBundleHandlers.Add(handler);
        }
        public void UnRegisterSaveBundleHandler(Func<Dictionary<Type, List<EntityInfo>>, Dictionary<Type, List<EntityInfo>>> handler)
        {
            _beforeSaveBundleHandlers.Remove(handler);
        }

        BlogDbContext _validationContext;
        internal BlogDbContext ValidationContext
        {
            get { return _validationContext ?? (_validationContext = new BlogDbContext()); }
        }

        public IRepository<Blog> Blogs
        {
            get { return GetDefaultRepository<Blog>(); }
        }

        public void Commit()
        {
            ObjectContext.SaveChanges();
        }
    }
}