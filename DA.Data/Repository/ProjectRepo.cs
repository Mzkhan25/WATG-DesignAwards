using DA.Contracts;
using DA.Contracts.Repository;
using DA.Model;
using System.Linq;

namespace DA.Data.Repository
{
    public class ProjectRepo : IProjectRepo
    {
        private readonly IDesignAwardsContext _db;
        public ProjectRepo()
        {
            _db = new DesignAwardsContext();
        }

        public IQueryable<Project> GetAll()
        {
            return _db.Projects;
        }
        public IQueryable<Project> GetProjectsByCategory(int categoryId)
        {
            return _db.Projects.Where(x => x.CategoryId == categoryId);
        }
        public Project GetOne(int id)
        {
            return _db.Projects.Find(id);
        }
       public bool Save(Project item, string userName)
        {
            return true;
        }
       public bool Delete(Project item, string userName)
        {
            return true;
        }
    }
}