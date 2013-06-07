using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace $rootnamespace$.Data
{
    public class EFRepository<T> : IRepository<T> where T : class
    {
        public EFRepository(DbContext context)
        {
            Context = context;
            Set = context.Set<T>();
        }

        protected DbContext Context { get; private set; }

        protected DbSet<T> Set { get; set; }

        public virtual IQueryable<T> GetAll() { return Set; }
        //public virtual Task<List<T>> GetAllAsync()
        //{
        //    return Set.ToListAsync();
        //}

        public virtual IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            return includeProperties.Aggregate(GetAll(), (current, includeProperty) => current.Include(includeProperty));
        }
        //public virtual Task<List<T>> GetAllIncludingAsync(params Expression<Func<T, object>>[] includeProperties)
        //{
        //    return GetAllIncluding().ToListAsync();
        //}

        public virtual T GetById(Guid id)
        {
            return Set.Find(id);
        }
        //public virtual Task<T> GetByIdAsync(Guid id)
        //{
        //    return Set.FindAsync(id);
        //}

        public virtual void Add(T entity)
        {
            var entry = Context.Entry(entity);

            if (entry.State == EntityState.Detached)
                entry.State = EntityState.Added;
            else
                Set.Add(entity);
        }
        public virtual void Update(T entity)
        {
            var entry = Context.Entry(entity);

            if (entry.State == EntityState.Detached)
                Set.Attach(entity);

            entry.State = EntityState.Modified;
        }

        public virtual void Delete(Guid id)
        {
            var entity = GetById(id);
            if (entity == null) return;
            Delete(entity);
        }
        public virtual void Delete(T entity)
        {
            var entry = Context.Entry(entity);

            if (entry.State == EntityState.Deleted)
                entry.State = EntityState.Deleted;
            else
            {
                Set.Attach(entity);
                Set.Remove(entity);
            }
        }
        //public async virtual Task DeleteAsync(Guid id)
        //{
        //    var entity = await GetByIdAsync(id);
        //    if (entity == null) return;
        //    Delete(entity);
        //}

        public virtual void Save()
        {
            Context.SaveChanges();
        }
        //public virtual Task<int> SaveAsync()
        //{
        //    return Context.SaveChangesAsync();
        //}

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}