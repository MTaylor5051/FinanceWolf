app.controller('StockSummaryCtrl', function ($scope, $stateParams, $cookies, $state, $interval, $timeout, yahooFinanceStockAPIFactory, financeWolfAPIFactory, stockService) {


    $scope.selectedStock = {};
    $scope.graph = '';
    $scope.date = '';

    // Toggle header
    $scope.openHeader = function (t) {
        $scope.headerOpen = !t;

    }

    $scope.userCookie = $cookies.getObject('FinanceWolfCookie');

    var getStockInfo = function () {
        $scope.userStocks = [];

        for (i in $scope.userCookie.Stocks) {

            yahooFinanceStockAPIFactory.get({ symbol: $scope.userCookie.Stocks[i].Symbol }, function (data) {

                $scope.userStocks.push(stockService.infoCompact(data.query.results.quote));

            });
        }

    }

    var getMainStockInfo = function () {
        yahooFinanceStockAPIFactory.get({ symbol: $stateParams.Symbol }, function (data) {

            $scope.selectedStock = stockService.infoDetailed(data.query.results.quote);

            // If user has selected a different chart to view, make sure the graph stays selected after refresh
            switch ($scope.graph) {
                case $scope.selectedStock.Graph1D:
                    $scope.graph = $scope.selectedStock.Graph1D;
                    break;
                case $scope.selectedStock.Graph5D:
                    $scope.graph = $scope.selectedStock.Graph5D;
                    break;
                case $scope.selectedStock.Graph1M:
                    $scope.graph = $scope.selectedStock.Graph1M;
                    break;
                case $scope.selectedStock.Graph3M:
                    $scope.graph = $scope.selectedStock.Graph3M;
                    break;
                case $scope.selectedStock.Graph6M:
                    $scope.graph = $scope.selectedStock.Graph6M;
                    break;
                case $scope.selectedStock.Graph1Y:
                    $scope.graph = $scope.selectedStock.Graph1Y;
                    break;
                case $scope.selectedStock.Graph2Y:
                    $scope.graph = $scope.selectedStock.Graph2Y;
                    break;
                case $scope.selectedStock.Graph5Y:
                    $scope.graph = $scope.selectedStock.Graph5Y;
                    break;
                case $scope.selectedStock.GraphMAX:
                    $scope.graph = $scope.selectedStock.GraphMAX;
                    break;
                default:
                    $scope.graph = $scope.selectedStock.Graph1D;
            }

            $scope.date = new Date();

        });
    }



    getMainStockInfo();

    // Update main stock info for body of page every minute
    $interval(function () { getMainStockInfo(); }, 60000);


    // If user is logged in extend life of cookie
    // If cookie is expired, direct user to login view

    if (angular.isDefined($scope.userCookie)) {


        var tenMinutesLater = new Date();

        tenMinutesLater.setMinutes(tenMinutesLater.getMinutes() + 3);

        $cookies.putObject('FinanceWolfCookie', $scope.userCookie, {
            expires: tenMinutesLater
        });

        getStockInfo();

    } else {
        $state.go('login');
        $scope.$emit('sessionExpired');
    }


    $scope.removeStock = function (symbol) {

        for (i in $scope.userCookie.Stocks) {

            if ($scope.userCookie.Stocks[i].Symbol == symbol) {

                financeWolfAPIFactory.delete({ id: $scope.userCookie.Stocks[i].ID }, function (data) {
                    $timeout($state.go('dashboard'), 250);
                });


                $scope.userCookie.Stocks.splice(i, 1)

                var tenMinutesLater = new Date();

                tenMinutesLater.setMinutes(tenMinutesLater.getMinutes() + 3);

                $cookies.putObject('FinanceWolfCookie', $scope.userCookie, {
                    expires: tenMinutesLater
                });


                break;
            }
        }
    }

    // Select a different graph
    $scope.changeGraph = function (duration) {
        switch (duration) {
            case '1d':
                $scope.graph = $scope.selectedStock.Graph1D;
                break;
            case '5d':
                $scope.graph = $scope.selectedStock.Graph5D;
                break;
            case '1m':
                $scope.graph = $scope.selectedStock.Graph1M;
                break;
            case '3m':
                $scope.graph = $scope.selectedStock.Graph3M;
                break;
            case '6m':
                $scope.graph = $scope.selectedStock.Graph6M;
                break;
            case '1y':
                $scope.graph = $scope.selectedStock.Graph1Y;
                break;
            case '2y':
                $scope.graph = $scope.selectedStock.Graph2Y;
                break;
            case '5y':
                $scope.graph = $scope.selectedStock.Graph5Y;
                break;
            case 'Max':
                $scope.graph = $scope.selectedStock.GraphMAX;
                break;
            default:
                $scope.graph = $scope.selectedStock.Graph1D;
        }
    }
});