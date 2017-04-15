using System;
using System.Collections.Generic;
using System.Linq;
using DA.Data;
using DA.Common;
using DA.Common.Request;
using DA.Common.Response;
using AutoMapper;

namespace DA.Contract
{
    public class UserManager
    {
        // create DB context here 
        public LoginResponse LoginUser (LoginRequest request)
        {
            LoginResponse loginResponse = new LoginResponse();
            using (var context = new WATG_DA_DBEntities())
            {
                User userDetails = context.Users.Where(x => x.PIN == request.Pin).SingleOrDefault();       
                if(userDetails != null)
                {
                    //loginResponse.Email = 
                    Mapper.Initialize(c =>
                    {
                        c.CreateMap<User , LoginResponse>();
                    });
                    loginResponse = Mapper.Map<User, LoginResponse>(userDetails);
                    loginResponse.IsAuthenticated = true;
                }
                else
                {
                    loginResponse.IsAuthenticated = false;
                }
            }
            return loginResponse;
        }
    }
}
