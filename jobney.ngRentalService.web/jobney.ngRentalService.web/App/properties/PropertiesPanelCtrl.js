(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('PropertiesPanelCtrl', ['$scope', 'MapService', function ($scope, MapService) {
        // TODO: move to service
        var fakeProperties = [
            { id: 1, address: '10000 Perkins Rowe', city: 'Baton Rouge', state: 'LA', zipcode: '70809' },
            { id: 2, address: '4200 Essen Ln', city: 'Baton Rouge', state: 'LA', zipcode: '70809' },
            { id: 3, address: '11585 Lake Sherwood Ave N', city: 'Baton Rouge', state: 'LA', zipcode: '70816' },
            { id: 4, address: '2344 W Contour Dr', city: 'Baton Rouge', state: 'LA', zipcode: '70809' },
            { id: 5, address: '782 Baird Dr', city: 'Baton Rouge', state: 'LA', zipcode: '70808' }
        ];

        activate();

        function activate() {
            $scope.properties = fakeProperties;

            MapService.clearMap();
            
            angular.forEach($scope.properties, function (property) {
                var address = property.address;
                MapService.geocodeAddress(address).then(function (location) {
                    var geocodedPlace = [location, property];
                    plotLocation([geocodedPlace]);
                });
            });
        }
        
        function plotLocation(placeWithLocationArray) {
            MapService.plotPoints(placeWithLocationArray, {
                clearPrevious: false
            });
        }
    }]);
})()