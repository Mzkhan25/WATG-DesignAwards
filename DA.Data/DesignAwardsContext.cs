

using System.Data.Entity;
using DA.Model;
using DA.Contracts;

namespace DA.Data
{
    public class DesignAwardsContext : DbContext, IDesignAwardsContext
    {
        public DesignAwardsContext()
        {
#if (DEBUG)
            Database.Connection.ConnectionString = @"Data Source=LHRLT-554\MSSQLSERVER2;Initial Catalog=DesignAwardDB;User ID=admin; Password=abcd@12345";
#elif (RELEASE)
                   Database.Connection.ConnectionString = @"Data Source=LHRLT-554\MSSQLSERVER2;Initial Catalog=DesignAwardDB;User ID=admin; Password=abcd@12345";
#elif (AHSAN)
                   Database.Connection.ConnectionString = @"Data Source=LHRLT-554\MSSQLSERVER2;Initial Catalog=DesignAwardDB;User ID=admin; Password=abcd@12345";
#endif
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

    }
}