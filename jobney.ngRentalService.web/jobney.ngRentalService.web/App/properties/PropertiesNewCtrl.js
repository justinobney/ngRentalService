(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('PropertiesNewCtrl', ['$scope', 'Common', 'MapService', 'LayoutManager',
        function ($scope, Common, MapService, LayoutManager) {
            
            activate();

            function activate() {
                $scope.newProperty = {
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    status: ''
                };
                
                $scope.result = '';
                $scope.options = {};
                $scope.details = '';
                
                function watch_details() {
                    return $scope.details;
                }

                $scope.$watch(watch_details, function (newVal, oldVal) {
                    if (newVal) {
                        var location = newVal.geometry.location;

                        console.log(newVal);

                        var place = MapService.convertPlaceResultToPlace(newVal);

                        $scope.newProperty.address1 = place.streetNumber + ' ' + place.route;
                        $scope.newProperty.city = place.locality;
                        $scope.newProperty.state = place.state;
                        $scope.newProperty.zipcode = place.postalCode;

                        MapService.panTo(location);
                        LayoutManager.handleInfoboxOffset();
                    }
                });
            }
        }]);
})()