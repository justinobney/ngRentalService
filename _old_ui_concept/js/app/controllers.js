(function() {
    'use strict';

    var app = angular.module('ngLandlord');

    app.controller('AppCtrl', ['$scope',
        function AppCtrl($scope) {}
    ]);

    app.controller('SideNavCtrl', ['$scope',
        function SideNavCtrl($scope) {}
    ]);

    app.controller('HeaderCtrl', ['$scope', 'LayoutManager',
        function HeaderCtrl($scope, LayoutManager) {}
    ]);

    app.controller('MainPanelCtrl', ['$scope', '$state', '$stateParams', 'LayoutManager',
        function MainPanelCtrl($scope, $state, $stateParams, LayoutManager) {
            $scope.showFlyout = function() {
                LayoutManager.toggleFlyout();
            };
        }
    ]);

    app.controller('MainContentCtrl', ['$scope',
        function MainContentCtrl($scope) {}
    ]);

    app.controller('FlyoutCtrl', ['$scope',
        function FlyoutCtrl($scope) {}
    ]);

    app.controller('MapCtrl', ['$scope',
        function MapCtrl($scope) {}
    ]);

})();
