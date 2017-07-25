using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WATG_DesignAwardsPortal.Contracts;
using WATG_DesignAwardsPortal.Model.Classes;

namespace WATG_DesignAwardsPortal.Data
{
    public class DesignAwardsContext : DbContext, IDesignAwardsContext
    {
        public DesignAwardsContext()
        {
#if (DEBUG)
            Database.Connection.ConnectionString = @"Data Source=TESTITSTAGE02\SQLEXPRESS;Initial Catalog=DesignAwards;Integrated Security=False;User ID=webapps;Password=elevated;Connect Timeout=15;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
#endif
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<User> Users { get; set; }

    }
}