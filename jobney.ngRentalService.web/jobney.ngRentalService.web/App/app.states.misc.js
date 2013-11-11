//(function () {
//    "use strict";

//    var app = angular.module('ngRentalService');

//    app.config(['$stateProvider', function ($stateProvider) { //$urlRouterProvider
//        $stateProvider
//            .state('permission', {
//                url: "/permission",
//                views: {
//                    "panel": {
//                        template: "Denied"
//                    }
//                }
//            })
//            .state('permission.denied', {
//                url: "/denied",
//                views: {
//                    "modal@": {
//                        template: "Permission Denied"
//                    },
//                    "drawer@": {
//                        template: "Permission Denied"
//                    }
//                },
//                data: {
//                    uiStateMap: {
//                        drawer: false,
//                        modal: true
//                    }
//                },
//                onEnter: ['MapService', function (MapService) {
//                    MapService.clearMap();
//                }]
//            });
//    }]);
//})();
