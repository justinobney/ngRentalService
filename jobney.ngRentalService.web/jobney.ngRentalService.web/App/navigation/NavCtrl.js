(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('NavCtrl', ['$scope', '$state', 'PermissionService', function ($scope, $state, PermissionService) {
        $scope.menuActive = function (navState) {
            return $state.includes(navState) ? 'active' : '';
        };

        $scope.isInRole = PermissionService.isInRole;
    }]);
})()