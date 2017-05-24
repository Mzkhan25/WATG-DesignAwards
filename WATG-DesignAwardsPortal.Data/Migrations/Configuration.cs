using WATG_DesignAwardsPortal.Model.Classes;
using WATG_DesignAwardsPortal.Model.Common;

namespace WATG_DesignAwardsPortal.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WATG_DesignAwardsPortal.Data.DesignAwardsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;

        }

        protected override void Seed(WATG_DesignAwardsPortal.Data.DesignAwardsContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Users.AddOrUpdate(
                p=> p.Email,
                new User
                {
                    Email="mbajwa@watg.com",
                    Password = "devops",
                    Role=ApplicationRoles.Admin
                }, 
                new User
                {
                    Email = "mbajwa@watg.com",
                    Password = "abc123",
                    Role = ApplicationRoles.User
                }
                );
        }
    }
}
