#region
using System.Data.Entity;
using WATG_DesignAwardsPortal.Contracts;
using WATG_DesignAwardsPortal.Model.Classes;
#endregion

namespace WATG_DesignAwardsPortal.Data
{
    public class DesignAwardsContext : DbContext, IDesignAwardsContext
    {
        public DesignAwardsContext()
        {
            Database.Connection.ConnectionString =
                @" Data Source = GRIMREAPER; Initial Catalog = DesignAwardDB; Integrated Security = True; Connect Timeout = 15; Encrypt = False; TrustServerCertificate = True; ApplicationIntent = ReadWrite; MultiSubnetFailover = False";

            //Database.Connection.ConnectionString = @"Data Source=TESTDEV01\SQLEXPRESS;Initial Catalog=WATG_InlineEdit;Integrated Security=False;User ID=webapps;Password=elevated;Connect Timeout=15;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<User> Users { get; set; }
    }
}