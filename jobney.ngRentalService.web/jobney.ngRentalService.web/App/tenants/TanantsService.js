(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('TenantsService', ['$http', 'Common', function ($http, Common) {

        var service = {};

        var cache = [];

        service.all = function () {
            var url = 'app/tenants/tenants.js';
            return $http.get(url).then(function (response) {
                cache = response.data;
                return response.data;
            });
        };

        service.findById = function (id) {
            var dfd = Common.$q.defer();

            var found = _.find(cache, function (tenant) {
                return tenant.id == id;
            });

            dfd.resolve(found);

            return dfd.promise;
        };

        service.add = function (tenant) {
            var dfd = Common.$q.defer();

            var newId = _.max(cache, function (person) {
                return person.id;
            }).id + 1;

            tenant.id = newId;

            cache.push(tenant);

            dfd.resolve(tenant);

            return dfd.promise;
        };

        return service;
    }]);
})()