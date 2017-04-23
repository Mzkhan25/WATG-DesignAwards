
using System.Linq;
using DA.Model;

namespace DA.Contracts.Repository
{
    public interface ICategoryRepo
    {
        IQueryable<Category> GetAll();
        Category GetOne(int id);
        bool Save(Category item, string userName);
        bool Delete(Category item, string userName);
    }
}
