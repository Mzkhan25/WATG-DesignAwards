using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DA.Common.Request;
using System.Web.Http.Cors;
using DA.Contracts.Repository;
using DA.Data.Repository;
using DA.Model;
using AutoMapper;
using DA.Common.Response;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Net.Http.Headers;

namespace DA.WebApi.Controllers
{
    [RoutePrefix("api/v1/project")]
    public class ProjectController : ApiController
    {
        private readonly IProjectRepo _projectRepo;
        public ProjectController()
        {
            _projectRepo = new ProjectRepo();
        }

        [Route("GetProjectByCategory")]
        [HttpGet]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage GetProjectsByCategory(int categoryId)
        {
            try
            {
                List<ProjectResponse> projectResponse = new List<ProjectResponse>();

                IQueryable<Project> projectList = _projectRepo.GetProjectsByCategory(categoryId);
                Mapper.Initialize(c =>
                {
                    c.CreateMap<Project, ProjectResponse>();
                });
                projectResponse = Mapper.Map<IQueryable<Project>, List<ProjectResponse>>
                    (projectList);

                return Request.CreateResponse(HttpStatusCode.OK, projectResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }

        [Route("GetProjectById")]
        [HttpGet]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage GetProjectById(int projectId)
        {

            ProjectResponse projectResponse = new ProjectResponse();
            Project selectedProject = _projectRepo.GetOne(projectId);

            Mapper.Initialize(c =>
            {
                c.CreateMap<Project, ProjectResponse>();
            });
            projectResponse = Mapper.Map<Project, ProjectResponse>
                (selectedProject);

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
