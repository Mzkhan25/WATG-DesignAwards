﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using WATG_DesignAwardsPortal.Contracts.IRepository;
using WATG_DesignAwardsPortal.Data.Repository;
using WATG_DesignAwardsPortal.Model.Classes;

namespace WATG_DesignAwardsPortal.Web.Server.Controllers
{
    public class ResultController : Controller
    {
        private readonly IResultRepository _result = new ResultRepository();
        private readonly ICategoryRepository _category = new CategoryRepository();
        private readonly IProjectRepository _project = new ProjectRepository();
        // GET: Result
        public ActionResult GetAll()
        {
            var result = _result.GetAll().DistinctBy(p => p.ProjectId).ToList();
            foreach (var item in result)
            {
                // Using User Id to save Total votes
                item.UserId = GetTotalsVotes(item.ProjectId);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetOne(int id)
        {
            var result = _result.GetAll().ToList().FirstOrDefault(p=> p.ProjectId==id);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CheckUserVote(int categoryId, int userId)
        {
            var result = _result.GetAll().Where(p => p.CategoryId == categoryId && p.UserId==userId ).ToList();
            return Json(result.Count > 0 ? 1 : 0, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Save(Result result)
        {
            result.CategoryName = _category.GetAll().Where(p => p.Id == result.CategoryId).ToList()[0].CategoryName;

            result.ProjectName = _project.GetAll().Where(p => p.Id == result.ProjectId).ToList()[0].Title;

            var response = _result.Save(result, "");
            return Json(response, JsonRequestBehavior.AllowGet);

        }
        public int GetTotalsVotes(int projectId)
        {
            int votes = 0;
            var result =
                _result.GetAll()
                    .Where(p => p.ProjectId == projectId)
                    .ToList();
            votes = result.Count;
            return votes;
        }
    }
}