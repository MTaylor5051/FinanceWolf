// Finance Wolf API Factory
app.factory('financeWolfAPIFactory', function ($resource) {
    return $resource('/api/Stocks/:id/:FacebookID', null);
});

// Yahoo Finance Stock API Factory
app.factory('yahooFinanceStockAPIFactory', function ($resource) {
    
    return $resource('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20%28%22' + ':symbol' + '%22%29&format=json&env=store://datatables.org/alltableswithkeys', null);
});
