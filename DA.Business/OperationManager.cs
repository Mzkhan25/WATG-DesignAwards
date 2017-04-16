using AutoMapper;
using DA.Common.Response;
using DA.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
                    c.CreateMap<Project, ProjectResponse>();
                });
                projectResponse = Mapper.Map<List<Project>, List<ProjectResponse>>
                    (projectList);
            }
            return projectResponse;
        }

        public HttpResponseMessage GetProjectById(int projectId)
        {
            ProjectResponse projectResponse = new ProjectResponse();
            using (var context = new WATG_DA_DBEntities())
            {
                Project project = context.Projects.Where(x => x.ProjectId == projectId).SingleOrDefault();
                Mapper.Initialize(c =>
                {
                    c.CreateMap<Project, ProjectResponse>();
                });
                projectResponse = Mapper.Map<Project, ProjectResponse>
                    (project);
            }

            using (MemoryStream ms = new MemoryStream())
            {
                using (FileStream file = new FileStream("C:/Users/ahmed.khateeb/Downloads/" + projectResponse.PDFPath, FileMode.Open, FileAccess.Read))
                {
                    byte[] bytes = new byte[file.Length];
                    file.Read(bytes, 0, (int)file.Length);
                    ms.Write(bytes, 0, (int)file.Length);

                    HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                    httpResponseMessage.Content = new ByteArrayContent(bytes.ToArray());
                    httpResponseMessage.Content.Headers.Add("x-filename", "Sample.pdf");
                    httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
                    httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("inline");
                    httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Sample.pdf";
                    httpResponseMessage.StatusCode = HttpStatusCode.OK;
                    return httpResponseMessage;
                }
            }
        }

    }
}
