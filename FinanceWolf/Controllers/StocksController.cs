using FinanceWolf.Adapters.Adapters;
using FinanceWolf.Adapters.Interfaces;
using FinanceWolf.DTOs;
using FinanceWolf.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinanceWolf.Controllers
{
    [RoutePrefix("api/Stocks")]
    public class StocksController : ApiController
    {
        IStocksAdapter _adapter;

        public StocksController()
        {
            _adapter = new StocksAdapter();
        }

        [Route("{FacebookID}")]
        public IHttpActionResult Get(string FacebookID)
        {
            List<StocksDTO> stocks = _adapter.GetStocks(FacebookID);

            return Ok(stocks);
        }

        [Route("")]
        public IHttpActionResult Post(StockPost newStock)
        {
            _adapter.AddStock(newStock);

            return Ok();
        }


        [Route("{ID:int}")]
        public IHttpActionResult Delete(int ID)
        {
            _adapter.DeleteStock(ID);

            return Ok();
        }
    }
}
