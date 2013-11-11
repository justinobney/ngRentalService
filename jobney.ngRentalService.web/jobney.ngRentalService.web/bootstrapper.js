(function() {
    'use strict';

    var appRoot = angular.element('body');
    window.__layoutMgr = null;

    initLayoutManager();

    function initApp() {
        angular.bootstrap(appRoot, ['ngRentalService']);
    };

    function initLayoutManager() {
        window.__layoutMgr = angular.element('body').layout({
            defaults: {
                spacing_open: 0,
                spacing_closed: 0,
                enableCursorHotkey: false,
                fxName_open: "slide",
                fxSpeed_open: 750
            },
            west: {
                paneSelector: ".side-nav",
                size: 100
            },
            center: {
                paneSelector: ".main-wrapper"
            },
            center__childOptions: {
                enableCursorHotkey: false,
                spacing_open: 0,
                center__paneSelector: ".main-content",
                west__paneSelector: ".main-panel",
                north__paneSelector: ".app-header",
                west__size: 350,
                north__size: 50,
                south__size: 25,
                onload_end: function() {
                    setTimeout(initApp, 0);
                },
                center__childOptions: {
                    spacing_open: 0,
                    spacing_closed: 0,
                    west: {
                        paneSelector: ".flyout-panel",
                        initClosed: true,
                        size: 700
                    },
                    center: {
                        slidable: true,
                        paneSelector: ".map-panel"
                    }
                }
            }
        });
    }
})();
