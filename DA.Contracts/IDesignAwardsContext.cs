using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using DA.Model;

namespace DA.Contracts
{
    public interface IDesignAwardsContext
    {
        DbSet<Category> Categories { get; set; }
        DbSet<Project> Projects { get; set; }
        DbSet<Result> Results { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<UserRole> UserRoles { get; set; }
        int SaveChanges();
        DbEntityEntry Entry(object o);
        void Dispose();

    }
}
