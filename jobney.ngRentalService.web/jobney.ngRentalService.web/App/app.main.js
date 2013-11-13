(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.run(['$state', '$rootScope', 'LayoutManager', 'UserService', 'PermissionService', 'MapService',
        function ($state, $rootScope, LayoutManager, UserService, PermissionService, MapService) {
            //UserService.getUserInfo();

            LayoutManager.initUiStateWatch($rootScope);
            //PermissionService.initStatePermissionWatch($rootScope);

            var mapStyle = [{ "featureType": "water", "stylers": [{ "visibility": "on" }, { "color": "#acbcc9" }] }, { "featureType": "landscape", "stylers": [{ "color": "#f2e5d4" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#c5c6c6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#e4d7c6" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#fbfaf7" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#c5dac6" }] }, { "featureType": "administrative", "stylers": [{ "visibility": "on" }, { "lightness": 33 }] }, { "featureType": "road" }, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": 20 }] }, {}, { "featureType": "road", "stylers": [{ "lightness": 20 }] }];

            var mapOptions = {
                zoom: 12,
                center: MapService.convertToGoogleLatLng(30.3499, -90.9971),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: mapStyle
            };

            MapService.initMap('map_canvas', mapOptions);

            $state.transitionTo('messages');
        }]);
})();