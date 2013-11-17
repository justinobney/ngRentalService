(function () {
    "use strict";

    var app = angular.module('ngRentalService');

    app.config(['$stateProvider', function ($stateProvider) { //$urlRouterProvider
        $stateProvider
            .state('tenants', {
                url: '/tenants',
                views: {
                    "panel": {
                        templateUrl: "app/tenants/tenants.panel.html"
                    }
                },
                data: {
                    uiStateMap: {
                        drawer: false,
                        modal: false
                    }
                }
            })
            .state('tenants.details', {
                url: '/:id',
                views: {
                    "drawer@": {
                        templateUrl: "app/tenants/tenants.details.html"
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
