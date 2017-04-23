using System;
using System.Data.Entity.Migrations;
using DA.Model;

namespace DA.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<DesignAwardsContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = false;
        }
        protected override void Seed(DesignAwardsContext context)
        {
            context.UserRoles.AddOrUpdate(
                    new UserRole
                    {
                        UserRoleDescription = "admin",
                        DateAdded = DateTime.UtcNow,
                        DateModified = DateTime.UtcNow,
                        AddedBy = "ahsantariq",
                        ModifiedBy = "ahsantariq",
                    }
                );

            context.UserRoles.AddOrUpdate(
                    new UserRole
                    {
                        UserRoleDescription = "user",
                        DateAdded = DateTime.UtcNow,
                        DateModified = DateTime.UtcNow,
                        AddedBy = "ahsantariq",
                        ModifiedBy = "ahsantariq",
                    }
                );

            context.Users.AddOrUpdate(
                  new User
                  {
                      FirstName = "Dorene",
                      LastName = "Takenaka",
                      Email = "dtakenaka@watg.com",
                      RoleId = 2,
                      PIN = "W1234!",
                      DateAdded = DateTime.UtcNow,
                      DateModified = DateTime.UtcNow,
                      AddedBy = "ahsantariq",
                      ModifiedBy = "ahsantariq"
                  }
              );

            context.Users.AddOrUpdate(
                 new User
                 {
                     FirstName = "Carol",
                     LastName = "Chun",
                     Email = "cchun@watg.com",
                     RoleId = 2,
                     PIN = "abc123",
                     DateAdded = DateTime.UtcNow,
                     DateModified = DateTime.UtcNow,
                     AddedBy = "ahsantariq",
                     ModifiedBy = "ahsantariq"
                 }
             );

            context.Users.AddOrUpdate(
                 new User
                 {
                     FirstName = "Ahmed",
                     LastName = "Khateeb",
                     Email = "khateeb321@gmail.com",
                     RoleId = 2,
                     PIN = "ahm321",
                     DateAdded = DateTime.UtcNow,
                     DateModified = DateTime.UtcNow,
                     AddedBy = "ahsantariq",
                     ModifiedBy = "ahsantariq"
                 }
             );
        }
    }
}