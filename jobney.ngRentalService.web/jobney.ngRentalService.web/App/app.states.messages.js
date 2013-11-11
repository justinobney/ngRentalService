(function () {
    "use strict";

    var app = angular.module('ngRentalService');

    app.config(['$stateProvider', function ($stateProvider) { //$urlRouterProvider
        $stateProvider
            .state('messages', {
                url: '/messages',
                views: {
                    "panel": {
                        templateUrl: "app/messages/messages.panel.html"
                    }
                },
                data: {
                    uiStateMap: {
                        drawer: false,
                        modal: false
                    }
                }
            })
            .state('messages.details', {
                url: '/:id',
                views: {
                    "drawer@": {
                        templateUrl: "app/messages/messages.details.html"
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
