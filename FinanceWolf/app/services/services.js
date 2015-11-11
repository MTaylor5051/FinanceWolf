app.service('stockService', function () {
    this.infoCompact = function (stock) {
        var isPositiveChange;


        if(stock.ChangeinPercent.search("-") == -1)
        {
            isPositiveChange = true;
        } else{
            isPositiveChange = false;
        }
        
        var stockObj = {
            Symbol: stock.symbol,
            Name: stock.Name,
            IsPriceChangePositive: isPositiveChange,
            PriceChange: stock.Change,
            PercentChange: stock.PercentChange,
            Price: stock.LastTradePriceOnly,
            Graph: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=1d&q=l&l=on&z=s'
        }
        return stockObj;
    };

    this.infoDetailed = function (stock) {
        var isPositiveChange;


        if (stock.ChangeinPercent.search("-") == -1) {
            isPositiveChange = true;
        } else {
            isPositiveChange = false;
        }

        var stockObj = {
            Symbol: stock.symbol,
            Name: stock.Name,
            IsPriceChangePositive: isPositiveChange,
            PriceChange: stock.Change,
            PercentChange: stock.PercentChange,
            Price: stock.LastTradePriceOnly,
            PreviousClose: stock.PreviousClose,
            Open: stock.Open,
            Bid: stock.Bid,
            Ask: stock.Ask,
            OneyrTargetPrice: stock.OneyrTargetPrice,
            EBITDA: stock.EBITDA,
            DaysRange: stock.DaysRange,
            YearRange: stock.YearRange,
            Volume: stock.Volume,
            AverageDailyVolume: stock.AverageDailyVolume,
            MarketCap: stock.MarketCapitalization,
            PERatio: stock.PERatio,
            EPSEstimateNextYear: stock.EPSEstimateNextYear,
            EPSEstimateNextQuarter: stock.EPSEstimateNextQuarter,
            EPSEstimateCurrentYear: stock.EPSEstimateCurrentYear,
            Graph1D: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=1d&q=l&l=on&z=l',
            Graph5D: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=5d&q=l&l=on&z=l',
            Graph1M: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=1m&q=l&l=on&z=l',
            Graph3M: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=3m&q=l&l=on&z=l',
            Graph6M: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=6m&q=l&l=on&z=l',
            Graph1Y: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=1y&q=l&l=on&z=l',
            Graph2Y: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=2y&q=l&l=on&z=l',
            Graph5Y: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=5y&q=l&l=on&z=l',
            GraphMAX: 'http://chart.finance.yahoo.com/z?s=' + stock.symbol + '&t=my&q=l&l=on&z=l',
        }
        return stockObj;
    };


});

