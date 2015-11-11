app.controller('HeaderCtrl', function ($scope, yahooFinanceStockAPIFactory, stockService) {


    // Graph/Info Display

    $scope.stockDisplayed = {};

    //Toggle the header 
    $scope.$on('toggle-header', function () {

        $scope.isCollapsed = !$scope.isCollapsed;

    });

    //////////////////////////////////////////////////
    // Major Global Stock Indices
    //////////////////////////////////////////////////

    // NASDAQ Composite 
    yahooFinanceStockAPIFactory.get({ symbol: '^IXIC' }, function (data) {

        $scope.COMPX = stockService.infoCompact(data.query.results.quote);

        // Make NASDAQ default stock to be displayed upon header open
        $scope.stockDisplayed = $scope.COMPX;
    });

    $scope.showCOMPX = function () {
        $scope.stockDisplayed = $scope.COMPX;
    }

    // CAC 40
    yahooFinanceStockAPIFactory.get({ symbol: '^FCHI' }, function (data) {

        $scope.FCHI = stockService.infoCompact(data.query.results.quote);
    });

    $scope.showFCHI = function () {
        $scope.stockDisplayed = $scope.FCHI;
    }

    // Nikkei 225
    yahooFinanceStockAPIFactory.get({ symbol: '^N225' }, function (data) {

        $scope.N225 = stockService.infoCompact(data.query.results.quote);

    });

    $scope.showN225 = function () {
        $scope.stockDisplayed = $scope.N225;
    }


    // Hang Seng  
    yahooFinanceStockAPIFactory.get({ symbol: '^HSI' }, function (data) {

        $scope.HSI = stockService.infoCompact(data.query.results.quote);

    });

    $scope.showHSI = function () {
        $scope.stockDisplayed = $scope.HSI;
    }



    //////////////////////////////////////////////////
    // Large Cap Stocks
    //////////////////////////////////////////////////

    // Apple Inc
    yahooFinanceStockAPIFactory.get({ symbol: 'AAPL' }, function (data) {

        $scope.AAPL = stockService.infoCompact(data.query.results.quote);

    });


    $scope.showAAPL = function () {
        $scope.stockDisplayed = $scope.AAPL;
    }

    // Exxon Mobil Corp
    yahooFinanceStockAPIFactory.get({ symbol: 'XOM' }, function (data) {

        $scope.XOM = stockService.infoCompact(data.query.results.quote);
        $scope.XOM.Name = $scope.XOM.Name.substring(0, 24);
    });


    $scope.showXOM = function () {
        $scope.stockDisplayed = $scope.XOM;
    }

    // Microsoft
    yahooFinanceStockAPIFactory.get({ symbol: 'MSFT' }, function (data) {

        $scope.MSFT = stockService.infoCompact(data.query.results.quote);

    });


    $scope.showMSFT = function () {
        $scope.stockDisplayed = $scope.MSFT;
    }

    // Alphabet Inc
    yahooFinanceStockAPIFactory.get({ symbol: 'GOOG' }, function (data) {

        $scope.GOOG = stockService.infoCompact(data.query.results.quote);

    });


    $scope.showGOOG = function () {
        $scope.stockDisplayed = $scope.GOOG;
    }


});