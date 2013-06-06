using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Spacify.Data
{
    public interface IRepository<T> : IDisposable where T : class
    {
        IQueryable<T> GetAll();
        //Task<List<T>> GetAllAsync();

        IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includeProperties);
        //Task<List<T>> GetAllIncludingAsync(params Expression<Func<T, object>>[] includeProperties);

        T GetById(Guid id);
        //Task<T> GetByIdAsync(Guid id);

        void Add(T entity);

        void Update(T entity);

        void Delete(Guid id);
        void Delete(T entity);
        //Task DeleteAsync(Guid id);

        void Save();
        //Task<int> SaveAsync();
    }
}