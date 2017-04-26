﻿using AutoMapper;
using DA.Common.Request;
using DA.Contracts.Repository;
using DA.Data.Repository;
using DA.Model;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DA.WebApi.Controllers
{
    [RoutePrefix("api/v1/result")]
    public class ResultController : ApiController
    {
        private readonly IResultRepo _resultRepo;
        public ResultController()
        {
            _resultRepo = new ResultRepo();
        }

        [Route("VoteProject")]
        [HttpPost]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage GetProjectsByCategory(VoteRequest voteRequest)
        {
            try
            {
                Result result = new Result();

                Mapper.Initialize(c =>
                {
                    c.CreateMap<VoteRequest, Result>();
                });
                result = Mapper.Map<VoteRequest, Result>
                    (voteRequest);

                bool voteUpdated = _resultRepo.Save(result,"");

                return Request.CreateResponse(HttpStatusCode.OK, voteUpdated);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse("Some went wrong");
            }
        }
    }
}
