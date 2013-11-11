(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.run(['$state', '$rootScope', 'LayoutManager', 'UserService', 'PermissionService', 'MapService',
        function ($state, $rootScope, LayoutManager, UserService, PermissionService, MapService) {
            //UserService.getUserInfo();

            LayoutManager.initUiStateWatch($rootScope);
            //PermissionService.initStatePermissionWatch($rootScope);

            var mapOptions = {
                zoom: 8,
                center: MapService.convertToGoogleLatLng(30.3499, -90.9971),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            MapService.initMap('map_canvas', mapOptions);

            $state.transitionTo('messages');
        }]);
})();