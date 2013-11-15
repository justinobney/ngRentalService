(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('PropertiesDetailsCtrl', ['$scope', '$stateParams', 'PropertiesService', 'MapService',
        function ($scope, $stateParams, PropertiesService, MapService) {

            activate();

            $scope.setSelected = function (src) {
                $scope.selectedImage = src;
            };

            function activate() {
                var id = $stateParams.id;

                PropertiesService.findById(id).then(function(property) {
                    $scope.newProperty = property;
                    getAddressImage();
                });
            }

            function getAddressImage() {
                var handleGeocodeComplete = function(location) {
                    MapService.getStreetViewImage(location, 600, 400).then(handleStreetViewImageComplete);
                };
                
                var handleStreetViewImageComplete = function(result) {
                    if (result.success)
                        $scope.selectedImage = $scope.locationStreetView = result.url;
                };
                
                MapService.geocodeAddress($scope.newProperty).then(handleGeocodeComplete);
            }
        }]);
})()