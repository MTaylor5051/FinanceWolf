app.controller('AddStockCtrl', function ($scope, $cookies, $state, yahooFinanceStockAPIFactory, financeWolfAPIFactory, stockService) {
    $scope.showSubmitButton = true;
    $scope.showNoResults = false;
    $scope.showStockAlreadyAdded = false;
    $scope.openFoundStockStats = false;
    $scope.showLink = false;
    $scope.ticker = '';
    $scope.foundStock = null;

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

    var refreshCookie = function () {
        var stocks = [];
        financeWolfAPIFactory.query({ FacebookID: $scope.userCookie.FacebookID }, function (data) {

            for (i in data) {
                if (angular.isDefined(data[i].Symbol)) {
                    stocks.push(data[i]);
                }
            }

            var userCookie = {
                Name: $scope.userCookie.Name,
                FacebookID: $scope.userCookie.FacebookID,
                ProfilePicture: 'http://graph.facebook.com/v2.5/' + $scope.userCookie.FacebookID + '/picture?type=normal',
                Stocks: stocks
            }

            var tenMinutesLater = new Date();

            tenMinutesLater.setMinutes(tenMinutesLater.getMinutes() + 3);

            $cookies.putObject('FinanceWolfCookie', userCookie, {
                expires: tenMinutesLater
            });

            $scope.userCookie = $cookies.getObject('FinanceWolfCookie');


            getStockInfo();
        });
    }

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

    $scope.search = function()
    {
        $scope.showLink = false;
        $scope.ticker = angular.uppercase($scope.ticker);

        for (i in $scope.userCookie.Stocks)
        {
            if ($scope.ticker == $scope.userCookie.Stocks[i].Symbol) {
                $scope.showStockAlreadyAdded = true;

                break;
            } else {
                $scope.showStockAlreadyAdded = false;
            }
        }

        if ($scope.ticker != '' && $scope.showStockAlreadyAdded != true)
        {        
            yahooFinanceStockAPIFactory.get({ symbol: $scope.ticker }, function (data) {
                if (data.query.results.quote.Name != null) {
                    $scope.foundStock = stockService.infoCompact(data.query.results.quote);

                    $scope.showNoResults = false;
                    $scope.showSubmitButton = false;
                    $scope.openFoundStockStats = true;
                } else {
                    $scope.showNoResults = true;
                    $scope.showSubmitButton = true;
                    $scope.openFoundStockStats = false;
                }
            });
        }
    }

    $scope.cancel = function () {
        $scope.ticker = '';
        $scope.showSubmitButton = true;
        $scope.foundStock = null;
        $scope.openFoundStockStats = false;
        $scope.showLink = false;
    }


    $scope.addToWatchList = function () {
        var newStock ={
            FacebookID: $scope.userCookie.FacebookID,
            Symbol: $scope.foundStock.Symbol
        }
        financeWolfAPIFactory.save({}, newStock, function (data) {
           
            refreshCookie()
            $scope.showLink = true;
            $scope.ticker = '';
            $scope.openFoundStockStats = false;
        });
        $scope.showSubmitButton = true;
    }

});