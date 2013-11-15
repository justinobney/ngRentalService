(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('LayoutManager', ['Common', 'MapService', function (Common, MapService) {
        var LayoutManager = {};
        var $root;
        var uiStateMap = {};
        var mgr = window.__layoutMgr;

        LayoutManager.panels = {
            sideNav: mgr.west,
            appHeader: mgr.center.children.layout1.north,
            mainPanel: mgr.center.children.layout1.west,
            mainContent: mgr.center.children.layout1.center,
            footer: mgr.center.children.layout1.south,
            flyOut: mgr.center.children.layout1.center.children.layout1.west,
            maps: mgr.center.children.layout1.center.children.layout1.center
        };

        LayoutManager.layouts = {
            sideNav: mgr,
            appHeader: mgr.center.children.layout1,
            mainPanel: mgr.center.children.layout1,
            mainContent: mgr.center.children.layout1,
            footer: mgr.center.children.layout1,
            flyOut: mgr.center.children.layout1.center.children.layout1,
            maps: mgr.center.children.layout1.center.children.layout1
        };

        LayoutManager.showDrawer = function () {
            this.layouts.flyOut.open('west', true);
            Common.$broadcast(Common.events.PANEL_OPEN, LayoutManager);
        };

        LayoutManager.hideDrawer = function () {
            this.layouts.flyOut.close('west', true);
        };
        
        LayoutManager.redraw = function performRedraw() {
            document.body.removeChild(document.body.appendChild(document.createElement('style')));
        };

        LayoutManager.initUiStateWatch = function ($rootScope) {
            if ($root)
                return; // prevent multiple watches
            
            $root = $rootScope;
            
            $root.$on('$stateChangeStart', handleStateChange);

            //$root.$on(Common.events.INFOBOX_OPEN, handleInfoboxOffset);

            function handleStateChange(event, toState, toParams, fromState, fromParams) {
                if (toState.data && toState.data.uiStateMap) {
                    var newState = toState.data.uiStateMap;

                    newState.drawer = Common.coerceToBoolean(newState.drawer);
                    newState.modal = Common.coerceToBoolean(newState.modal);
                    
                    if (uiStateMap.drawer != newState.drawer) {
                        // drawer state has changed.. 
                        (newState.drawer) ? LayoutManager.showDrawer() : LayoutManager.hideDrawer();
                    }
                    
                    if (uiStateMap.modal != newState.modal) {
                        // modal state has changed.. 
                        //(newState.modal) ? ModalService.show() : ModalService.hide();
                    }

                    updateUiStateMap(newState);
                }
            }

            function updateUiStateMap(newState) {
                uiStateMap.drawer = Common.coerceToBoolean(newState.drawer); // coerce the boolean values when possibly undefined
                uiStateMap.modal = Common.coerceToBoolean(newState.modal); // coerce the boolean values when possibly undefined
            }
        };

        LayoutManager.handleInfoboxOffset = function() {
            var flyout = LayoutManager.panels.flyOut;
            var map = LayoutManager.panels.maps;
            var opts = {};
            var visibleWidth = map.pane.width() - flyout.pane.width();

            if (!flyout.state.isClosed) {
                opts.offsetRight = visibleWidth / 2;
            } else {
                opts.offsetLeft = visibleWidth / 2;
            }

            MapService.offsetMap(opts);
        }

        return LayoutManager;
    }]);
})()