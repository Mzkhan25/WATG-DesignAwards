using AutoMapper;
using DA.Common.Response;
using DA.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA.Contract
{
    public class OperationManager
    {
        public List<CategoryResponse> GetAllCategories()
        {
            List<CategoryResponse> categoryResponse = new List<CategoryResponse>();
            using (var context = new WATG_DA_DBEntities())
            {
                List<Category> catgoriesList = context.Categories.ToList();
                Mapper.Initialize(c =>
                {
                    c.CreateMap<Category, CategoryResponse>();
                });
                categoryResponse = Mapper.Map<List<Category>, List<CategoryResponse>>
                    (catgoriesList);
            }
            return categoryResponse;
        }

        //GetProjectsByCategory

        public List<ProjectResponse> GetProjectsByCategory(int categoryId)
        {
            List<ProjectResponse> projectResponse = new List<ProjectResponse>();
            using (var context = new WATG_DA_DBEntities())
            {
                List<Project> projectList = context.Projects.Where(x => x.CategoryId == categoryId).ToList();
                Mapper.Initialize(c =>
                {
                    c.CreateMap<List<Project>, List<ProjectResponse>>();
                });
                projectResponse = Mapper.Map<List<Project>, List<ProjectResponse>>
                    (projectList);
            }
            return projectResponse;
        }

    }
}
