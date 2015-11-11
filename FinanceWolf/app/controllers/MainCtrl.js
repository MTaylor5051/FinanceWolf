

app.controller('MainCtrl', function ($scope, $rootScope, $window, $cookies, $state, ezfb, financeWolfAPIFactory, yahooFinanceStockAPIFactory, stockService) {

    // If the current state is set to the login page make the necessary body style classes active
    $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {


        if (toState.name == 'login') {
            $scope.loginState = true;
        } else {
            $scope.loginState = false;
        }
    });

    // Display Alphabet stock info for front login page
    yahooFinanceStockAPIFactory.get({ symbol: 'GOOG' }, function (data) {

        $scope.googleStockInfo = stockService.infoCompact(data.query.results.quote);
    });

    // Login to app with Facebook
    $scope.login = function () {
        /**
         * Calling FB.login with required permissions specified
         * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
         */
        ezfb.login(function (res) {
            /**
             * no manual $scope.$apply, I got that handled
             */
            if (res.authResponse) {
                updateLoginStatus(updateApiMe);
            }
        }, { scope: 'public_profile' });
    };

    $scope.logout = function () {

        $scope.userLoggedOutMessage = true;
        $state.go('login');
        $cookies.remove('FinanceWolfCookie');
    };



    /**
     * Update loginStatus result
     */
    function updateLoginStatus(more) {
        ezfb.getLoginStatus(function (res) {

            (more || angular.noop)();
        });
    }

    /**
     * Update api('/me') result
     */
    function updateApiMe() {
        ezfb.api('/me', function (res) {
            var apiMe = res;
            var stocks = [];
            financeWolfAPIFactory.query({ FacebookID: apiMe.id }, function (data) {

                for (i in data) {
                    if (angular.isDefined(data[i].Symbol)) {
                        stocks.push(data[i]);
                    }
                }

                var userCookie = {
                    Name: apiMe.name,
                    FacebookID: apiMe.id,
                    ProfilePicture: 'http://graph.facebook.com/v2.5/' + apiMe.id + '/picture?type=normal',
                    Stocks: stocks
                }

                var tenMinutesLater = new Date();

                tenMinutesLater.setMinutes(tenMinutesLater.getMinutes() + 3);

                $cookies.putObject('FinanceWolfCookie', userCookie, {
                    expires: tenMinutesLater
                });

                $scope.sessionExpiredMessage = false;
                $scope.userLoggedOutMessage = false;

                $state.go('dashboard');
            });
        });
    }


    $scope.share = function () {
        ezfb.ui(
          {
              method: 'feed',
              name: 'Finance Wolf - Make your bank account look like a phone number!',
              picture: 'http://financewolf.azurewebsites.net/assets/images/facebook_status_update.jpg',
              link: 'http://financewolf.azurewebsites.net/',
              description: 'Finance Wolf is a portfolio project created by Michael Taylor.' +
                           ' The project is an AngularJS app using Facebook API, Yahoo Finance API and Twitter Bootstrap.' +
                           ' Please try the app out! :-)'
          },
          function (res) {
              // res: FB.ui response
          }
        );
    };

    // Toggle Header on all full child views
    $scope.toggleHeader = function () {

        // Broadcast to toggle header function on child HeaderCTRL
        $rootScope.$broadcast('toggle-header');
    }

    // If session expired display message to user

    $scope.$on('sessionExpired', function () { $scope.sessionExpiredMessage = true; });


});