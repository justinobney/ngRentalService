(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('PermissionService', ['$state', 'Common', 'UserService', function ($state, Common, UserService) {
        var service = {};
        var permissions = {};
        var $root = null;
        var gettingRoles = Common.$q.defer();

        permissions.get = function () {
            var map = {};

            if (UserService.userInfo.roles)
                gettingRoles.resolve();
            
            angular.forEach(UserService.userInfo.roles, function (role) {
                map[role.toLowerCase()] = true;
            });
            
            return map;
        };

        service.isInRole = function (role) {
            return permissions.get().admin || permissions.get()[role.toLowerCase()];
        };

        service.canTransition = function (role) {
            var allow = true;
            gettingRoles.promise.then(function () {
                if (!service.isInRole(role)) {
                    allow = false;
                    $state.transitionTo('permission.denied', {}, { location: false });
                }
            });
            return allow;
        };
        
        service.initStatePermissionWatch = function($rootScope) {
            if ($root)
                return; // prevent multiple watches

            $root = $rootScope;

            $root.$on('$stateChangeStart', handleStateChange);

            function handleStateChange(event, toState, toParams, fromState, fromParams) {
                if (toState.data && toState.data.permission) {
                    var reqPermission = toState.data.permission;
                    return service.canTransition(reqPermission);
                }
            }
        };

        return service;
    }]);
})();