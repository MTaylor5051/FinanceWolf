namespace FinanceWolf.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class StocksDB : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Stocks",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FacebookID = c.String(),
                        Symbol = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Stocks");
        }
    }
}
