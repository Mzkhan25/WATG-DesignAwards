﻿#region
using System;
using System.Data.Entity;
using System.Linq;
using WATG_DesignAwardsPortal.Contracts;
using WATG_DesignAwardsPortal.Contracts.IRepository;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDesignAwardsContext _db;
        public UserRepository()
        {
            _db = new DesignAwardsContext();
        }
        public UserRepository(DesignAwardsContext db)
        {
            _db = db;
        }
        public IQueryable<User> GetAll()
        {
            return _db.Users.Where(p => p.IsDeleted == false);
        }
        public bool Save(User item, string userName)
        {
            var result = true;
            try
            {
                var dbItem = new User();
                var isNew = false;
                var check = _db.Users.Where(p => p.Id == item.Id && p.IsDeleted == false).ToList();
                if (check.Count > 0)
                {
                    dbItem = check.First();
                    _db.Entry(dbItem).State = EntityState.Modified;
                    dbItem.ModifiedBy = userName;
                    dbItem.DateModified = DateTime.UtcNow;
                }
                else
                {
                    dbItem.DateAdded = DateTime.UtcNow;
                    dbItem.AddedBy = userName;
                    isNew = true;
                }
                dbItem.FirstName = item.FirstName;
                dbItem.LastName = item.LastName;
                dbItem.Email = item.Email;
                dbItem.Password = item.Password;
                dbItem.Role = item.Role;
                dbItem.IsDeleted = false;
                if (isNew)
                {
                    _db.Entry(dbItem).State = EntityState.Added;
                    _db.Users.Add(dbItem);
                }
                _db.SaveChanges();
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }
        public bool Delete(int id, string userName)
        {
            throw new NotImplementedException();
        }
    }
}