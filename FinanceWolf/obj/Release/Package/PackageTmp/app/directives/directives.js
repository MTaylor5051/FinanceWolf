app.directive('sidemenuresize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w[0].innerHeight
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
      
            scope.style = function () {
                return {
                    'height': (newValue.h - 1) + 'px',
                };
            };

        }, true);

        w.bind('sidemenuresize', function () {
            scope.$apply();
        });
    }
});

app.directive('topmenuresize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'w': w[0].innerWidth
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowWidth = newValue.w;
        
            scope.style2 = function () {
                return {
                    'width': (newValue.w - 1) + 'px',
                };
            };

        }, true);

        w.bind('topmenuresize', function () {
            scope.$apply();
        });
    }
});

app.directive('bodyresize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w[0].innerHeight
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;

            scope.style3 = function () {
                return {
                    'height': (newValue.h - 300) + 'px',
                    'overflow': 'auto'
                };
            };

        }, true);

        w.bind('bodyresize', function () {
            scope.$apply();
        });
    }
})