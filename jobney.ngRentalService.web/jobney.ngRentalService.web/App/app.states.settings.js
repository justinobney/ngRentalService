(function () {
    "use strict";

    var app = angular.module('ngRentalService');

    app.config(['$stateProvider', function ($stateProvider) { //$urlRouterProvider
        $stateProvider
            .state('settings', {
                url: 'settings',
                views: {
                    "panel": {
                        templateUrl: "app/settings/settings.panel.html"
                    }
                }
            });

    }]);
})();
