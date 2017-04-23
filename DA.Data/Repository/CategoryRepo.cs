using DA.Contracts;
using DA.Contracts.Repository;
using DA.Model;
using System.Linq;

namespace DA.Data.Repository
{
    public class CategoryRepo : ICategoryRepo
    {
        // Methods which aren't implemented were not requried for now, they will be implemented soon
        private readonly IDesignAwardsContext _db;
        public CategoryRepo()
        {
            _db = new DesignAwardsContext();
        }
        public IQueryable<Category> GetAll()
        {
            return _db.Categories;
        }
        public Category GetOne(int id)
        {
            return _db.Categories.Find(id);
        }
        public bool Save(Category item, string userName)
        {
            return true;
        }
        public bool Delete(Category item, string userName)
        {
            return true;
        }
    }
}