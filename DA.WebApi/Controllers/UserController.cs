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

namespace DA.WebApi.Controllers
{
    
    [RoutePrefix("api/v1/User")]
    public class UserController : ApiController
    {
        private readonly IUserRepo _userRepo;
        public UserController() 
        {
            _userRepo = new UserRepo();
        }

        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Login(LoginRequest request)
        {
            try
            {
                User userDetails = _userRepo.GetOneByPin(request.Pin);
                LoginResponse loginResponse = new LoginResponse();
                if (userDetails != null)
                {
                    //loginResponse.Email = 
                    Mapper.Initialize(c =>
                    {
                        c.CreateMap<User, LoginResponse>();
                    });
                    loginResponse = Mapper.Map<User, LoginResponse>(userDetails);
                    loginResponse.IsAuthenticated = true;
                }
                else
                {
                    loginResponse.IsAuthenticated = false;
                }

                return Request.CreateResponse(HttpStatusCode.OK, loginResponse);
            }
            catch(Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }
    }
}
