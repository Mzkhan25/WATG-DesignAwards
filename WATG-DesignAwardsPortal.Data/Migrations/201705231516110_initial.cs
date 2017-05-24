namespace WATG_DesignAwardsPortal.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(),
                        Image = c.Binary(),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Office = c.String(),
                        Description = c.String(),
                        PdfPath = c.String(),
                        Year = c.Int(nullable: false),
                        DisplayImage = c.Binary(),
                        CategoryId = c.Int(nullable: false),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Results",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProjectId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        CategoryId = c.Int(nullable: false),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        Role = c.Int(nullable: false),
                        DateAdded = c.DateTime(),
                        DateModified = c.DateTime(),
                        AddedBy = c.String(),
                        ModifiedBy = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.Results");
            DropTable("dbo.Projects");
            DropTable("dbo.Categories");
        }
    }
}
