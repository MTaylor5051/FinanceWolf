using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FinanceWolf.Models
{
    public class StockDBContext : DbContext
    {
        public DbSet<Stock> Stocks { get; set; }
    }
}