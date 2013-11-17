(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('TenantsDetailsCtrl', ['$scope', '$stateParams', 'TenantsService',
        function ($scope, $stateParams, TenantsService) {

            activate();

            function activate() {
                var id = $stateParams.id;

                TenantsService.findById(id).then(function (tenant) {
                    $scope.tenant = tenant;
                });
            }
        }]);
})()