using FinanceWolf.Adapters.Interfaces;
using FinanceWolf.DTOs;
using FinanceWolf.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinanceWolf.Adapters.Adapters
{
    public class StocksAdapter : IStocksAdapter
    {
        public List<StocksDTO> GetStocks(string FacebookID)
        {
            List<StocksDTO> stocks;

            using (var db = new StockDBContext())
            {
                stocks = db.Stocks.Where(s => s.FacebookID == FacebookID).Select(t => new StocksDTO()
                  {
                      ID = t.ID,
                      FacebookID = t.FacebookID,
                      Symbol = t.Symbol

                  }).Take(5).ToList();
            }
            return stocks;
        }

        public void AddStock(StockPost newStock)
        {
            Stock stock = new Stock();

            using (var db = new StockDBContext())
            {

                stock.FacebookID = newStock.FacebookID;
                stock.Symbol = newStock.Symbol;
                db.Stocks.Add(stock);
                db.SaveChanges();

            }
        }

        public void DeleteStock(int ID)
        {
            using (var db = new StockDBContext())
            {
                Stock stock = db.Stocks.Where(s => s.ID == ID).FirstOrDefault();
                db.Stocks.Remove(stock);
                db.SaveChanges();

            }
        }
    }
}