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
    }
}
