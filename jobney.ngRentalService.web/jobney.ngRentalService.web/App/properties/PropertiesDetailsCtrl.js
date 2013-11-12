(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('PropertiesDetailsCtrl', ['$scope', 'MapService', 'LayoutManager',
        function ($scope, MapService, LayoutManager) {
            
            activate();

            function activate() {
                offsetMap();
            }

            function offsetMap() {
                var flyout = LayoutManager.panels.flyOut;
                var map = LayoutManager.panels.maps;
                var opts = {};

                if (!flyout.state.isClosed) {
                    var visibleWidth = map.pane.width() - flyout.pane.width();

                    opts.offsetRight = visibleWidth / 2;
                }

                MapService.offsetMap(opts);
            }
        }]);
})()