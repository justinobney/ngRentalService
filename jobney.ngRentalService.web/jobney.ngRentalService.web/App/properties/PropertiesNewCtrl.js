(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('PropertiesNewCtrl', ['$scope', '$state', 'Common', 'MapService', 'LayoutManager', 'PropertiesService',
        function($scope, $state, Common, MapService, LayoutManager, PropertiesService) {

            activate();

            $scope.add = function() {
                PropertiesService.add($scope.newProperty).then(function(property) {
                    $state.transitionTo('properties.detail', { id: property.id });
                });
            };

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

                $scope.$watch(watch_details, function(newVal, oldVal) {
                    if (newVal) {
                        var place = MapService.convertPlaceResultToPlace(newVal);

                        $scope.newProperty.address1 = place.streetNumber + ' ' + place.route;
                        $scope.newProperty.city = place.locality;
                        $scope.newProperty.state = place.state;
                        $scope.newProperty.zipcode = place.postalCode;
                        
                        var handleGeocodeComplete = function (location) {
                            MapService.panTo(location);
                        };

                        MapService.geocodeAddress($scope.newProperty).then(handleGeocodeComplete);
                    }
                });
            }
        }]);
})()