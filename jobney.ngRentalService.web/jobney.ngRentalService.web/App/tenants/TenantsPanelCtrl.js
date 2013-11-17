(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('TenantsPanelCtrl', ['$scope', 'Common', 'TenantsService',
        function ($scope, Common, TenantsService) {

            $scope.search = {};
            
            $scope.searchTenants = function (tenants) {
                if (!$scope.search.text)
                    return true;

                return angular.toJson(tenants).indexOf($scope.search.text) > -1;
            };

            activate();

            function activate() {
                TenantsService.all().then(function (tenants) {
                    $scope.tenants = tenants;
                });
            }
        }]);
})()