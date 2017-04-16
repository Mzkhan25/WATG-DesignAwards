using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DA.Common;
using DA.Common.Response;
using DA.Common.Request;
using DA.Contract;
using System.Web.Http.Cors;


namespace DA.WebApi.Controllers
{
    
    [RoutePrefix("api/v1/User")]
    public class UserController : ApiController
    {
        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Login(LoginRequest request)
        {
            try
            {
                UserManager userManager = new UserManager();
                
                return Request.CreateResponse(HttpStatusCode.OK, userManager.LoginUser(request));
            }
            catch(Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }
    }
}
