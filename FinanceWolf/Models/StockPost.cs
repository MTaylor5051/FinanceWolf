using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinanceWolf.Models
{
    // Stock object parameter for the post method
    public class StockPost
    {
        public string FacebookID { get; set; }

        public string Symbol { get; set; }

    }
}