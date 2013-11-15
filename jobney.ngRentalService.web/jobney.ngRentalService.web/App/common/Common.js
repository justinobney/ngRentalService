(function () {
    'use strict';

    // Define the common module 
    // Contains services:
    //  - common
    var app = angular.module('ngRentalService');

    app.factory('Common',
        ['$q', '$rootScope', '$timeout', 'CommonConfig', 'RouteConfig', common]);
    
    function common($q, $rootScope, $timeout, CommonConfig, RouteConfig) {
        var throttles = {};

        var events = {
            PANEL_OPEN: 'panel::open'
        };

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $on: $on,
            $q: $q,
            $timeout: $timeout,
            // generic
            activateController: activateController,
            debouncedThrottle: debouncedThrottle,
            textContains: textContains,
            coerceToBoolean: coerceToBoolean,
            routeConfig: RouteConfig,
            events: events
        };

        return service;

        function activateController(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(CommonConfig.config.controllerActivateSuccessEvent, data);
            });
        }

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function $on(event, fnCallback) {
            $rootScope.$on(event, function () {
                fnCallback.apply($rootScope, arguments);
            });
        }

        function debouncedThrottle(key, callback, delay, immediate) {
            // Perform some action (callback) after a delay. 
            // Track the callback by key, so if the same callback 
            // is issued again, restart the delay.

            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (throttles[key]) {
                $timeout.cancel(throttles[key]);
                throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                throttles[key] = $timeout(callback, delay);
            }
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

        function coerceToBoolean(value) {
            return !!value;
        }
    }
})();