(function () {
    "use strict";

    var app = angular.module('ngRentalService');

    app.config(['$stateProvider', function ($stateProvider) { //$urlRouterProvider
        $stateProvider
            .state('properties', {
                url: '/properties',
                views: {
                    "panel": {
                        templateUrl: "app/properties/properties.panel.html"
                    }
                },
                data: {
                    uiStateMap: {
                        drawer: false,
                        modal: false
                    }
                }
            })
            .state('properties.detail', {
                url: '/details/:id',
                views: {
                    "drawer@": {
                        templateUrl: "app/properties/properties.details.html"
                    }
                },
                data: {
                    uiStateMap: {
                        drawer: true,
                        modal: false
                    }
                }
            });
    }]);
})();
