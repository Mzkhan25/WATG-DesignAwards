using System;
using System.Collections.Generic;
using System.Linq;
using DA.Model;

namespace DA.Contracts.Repository
{
    public interface IProjectRepo
    {
        IQueryable<Project> GetAll();
        Project GetOne(int id);
        IQueryable<Project> GetProjectsByCategory(int categoryId);
        bool Save(Project item, string userName);
        bool Delete(Project item, string userName);
    }
}
