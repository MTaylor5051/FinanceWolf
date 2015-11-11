var app = angular.module('FinanceWolf', ['ngResource', 'ngCookies', 'ngAnimate', 'ui.router', 'ezfb', 'ui.bootstrap']); // Create app

// UI router
app.config(function ($stateProvider, $urlRouterProvider, ezfbProvider) {

    //Facebook API
    ezfbProvider.setLocale('en_US');

    ezfbProvider.setInitParams({
        appId: '556141597869862'
    });

    //UI Router
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/',
        views: {
            'body': {
                templateUrl: '/app/views/login.html'
            }
        }
    })
    .state('dashboard', {
        url: '/dashboard',
        views: {
            'header': {
                templateUrl: '/app/views/partials/header.html',
                controller: 'HeaderCtrl'
            },
            'body': {
                templateUrl: '/app/views/dashboard.html',
                controller: 'DashboardCtrl'
            }
        }
    })
    .state('stock', {
        url: '/stockSummary/:Symbol',
        views: {
            'header': {
                templateUrl: '/app/views/partials/header.html',
                controller: 'HeaderCtrl'
            },
            'body': {
                templateUrl: '/app/views/stockSummary.html',
                controller: 'StockSummaryCtrl'
            }
        }
    })
    .state('addstock', {
        url: '/addStock',
        views: {
            'header': {
                templateUrl: '/app/views/partials/header.html',
                controller: 'HeaderCtrl'
            },
            'body': {
                templateUrl: '/app/views/addStock.html',
                controller: 'AddStockCtrl'
            }
        }
    })
});