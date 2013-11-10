(function() {
    'use strict';

    var app = angular.module('ngLandlord');

    var appRoot = angular.element('#ngLandlord');
    window.__layoutMgr = null;

    initLayoutManager();

    app.config(function($stateProvider) {
        $stateProvider
            .state('products', {
                url: "/products",
                abstract: true,
                views: {
                    "panel": {
                        templateUrl: "js/app/templates/product-index.html"
                    },
                    "flyout": {
                        templateUrl: "js/app/templates/product-flyout.html"
                    }
                }
            })
            .state('products.list', {
                url: '/list'
            })
    });

    function initApp() {
        angular.bootstrap(appRoot, ['ngLandlord']);
    };

    function initMap() {
        var map;

        var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map_canvas = document.getElementById('map_canvas');
        map = new google.maps.Map(map_canvas, mapOptions);
    }

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
                    setTimeout(initMap, 500);
                },
                center__childOptions: {
                    spacing_open: 0,
                    spacing_closed: 0,
                    west: {
                        paneSelector: ".flyout-panel",
                        initClosed: true,
                        size: 2000
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
