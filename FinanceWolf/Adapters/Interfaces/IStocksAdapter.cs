using FinanceWolf.DTOs;
using FinanceWolf.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceWolf.Adapters.Interfaces
{
    interface IStocksAdapter
    {
        List<StocksDTO> GetStocks(string FacebookID);

        void AddStock(StockPost newStock);

        void DeleteStock(int Id);
    }
}
