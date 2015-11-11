app.controller('DashboardCtrl', function ($scope, $cookies, $state, yahooFinanceStockAPIFactory, financeWolfAPIFactory, stockService) {

    // Toggle header
    $scope.openHeader = function (t) {
        $scope.headerOpen = !t;

    }

    $scope.userCookie = $cookies.getObject('FinanceWolfCookie');

    var getStockInfo = function () {
        $scope.userStocks = [];

        $scope.welcomePicture = {
            Img: 'assets/images/piggybankblack.png',
            Text: 'Click Here To Get Started'
        }

        for (i in $scope.userCookie.Stocks) {

            yahooFinanceStockAPIFactory.get({ symbol: $scope.userCookie.Stocks[i].Symbol }, function (data) {

                $scope.userStocks.push(stockService.infoCompact(data.query.results.quote));


                $scope.welcomePicture = {
                    Img: 'assets/images/addstocksblack.png',
                    Text: 'Add New Stocks'
                }

            });
        }

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


    $scope.removeStock = function (symbol) {

        for (i in $scope.userCookie.Stocks) {

            if ($scope.userCookie.Stocks[i].Symbol == symbol) {

                financeWolfAPIFactory.delete({ id: $scope.userCookie.Stocks[i].ID }, function (data) {

                });


                $scope.userCookie.Stocks.splice(i, 1)

                var tenMinutesLater = new Date();

                tenMinutesLater.setMinutes(tenMinutesLater.getMinutes() + 3);

                $cookies.putObject('FinanceWolfCookie', $scope.userCookie, {
                    expires: tenMinutesLater
                });

                getStockInfo();

                break;
            }
        }
    }

});