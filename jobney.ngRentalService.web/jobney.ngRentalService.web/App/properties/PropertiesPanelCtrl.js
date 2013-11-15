(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('PropertiesPanelCtrl', ['$scope', 'Common', 'MapService', 'PropertiesService',
        function ($scope, Common, MapService, PropertiesService) {
            
            var config = {
                propertyInfoWindowTemplate: Common.routeConfig.base + 'App/properties/properties.infoWindow.html'
            };

            $scope.showInfo = function (property) {
                MapService.openMarkerInfo(function (marker) {
                    return marker.model.id == property.id;
                });
            };

            activate();

            function activate() {
                PropertiesService.all().then(function(properties){
                    $scope.properties = properties;
                    
                    MapService.clearMap();
                        
                    angular.forEach($scope.properties, function (property) {
                        MapService.geocodeAddress(property).then(function (location) {
                            var geocodedPlace = [location, property];
                            plotLocation([geocodedPlace]);
                        });
                    });    
                });

                $scope.$watchCollection('properties', function(cur, prev) {
                    if (cur) {
                        var markerModels = MapService.getMarkerModels();
                        _.forEach(cur, function(prop) {
                            if (!_.find(markerModels, prop)) {
                                MapService.geocodeAddress(prop).then(function(location) {
                                    var geocodedPlace = [location, prop];
                                    plotLocation([geocodedPlace]);
                                });
                            }
                        });
                    }
                });
            }

            function plotLocation(placeWithLocationArray) {
                MapService.plotPoints(placeWithLocationArray, {
                    clearPrevious: false,
                    infoBoxTemplate: config.propertyInfoWindowTemplate
                });
            }
        }]);
})()