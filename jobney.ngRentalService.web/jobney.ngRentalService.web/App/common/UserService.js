(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('UserService', ['$http', function($http) {
        var service = {};
        
        service.userInfo = {};

        service.getUserInfo = function() {
            $http.get('/Authentication/AccountInfo').then(function(response) {
                service.userInfo = response.data;
            });
        };

        service.logout = function() {
            window.location = '/Authentication/Logout';
        };

        return service;
    }]);
})();