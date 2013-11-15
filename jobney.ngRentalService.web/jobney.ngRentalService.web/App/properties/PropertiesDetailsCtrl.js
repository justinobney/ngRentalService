(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('PropertiesDetailsCtrl', ['$scope', '$stateParams', 'PropertiesService',
        function ($scope, $stateParams, PropertiesService) {

            activate();

            function activate() {
                var id = $stateParams.id;

                PropertiesService.findById(id).then(function(property) {
                    $scope.newProperty = property;
                });
            }
        }]);
})()