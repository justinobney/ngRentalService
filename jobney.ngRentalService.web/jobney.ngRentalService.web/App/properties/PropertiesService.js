(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('PropertiesService', ['Common', function (Common) {

        var fakeProperties = [{ "address1": "10000 Perkins Rowe", "city": "Baton Rouge", "state": "LA", "zipcode": "70809", "id": 1 },
            { "address1": "3357 Highland Road", "address2": "", "city": "Baton Rouge", "state": "LA", "zipcode": "70802", "status": "", "id": 2 },
            { "address1": "1514 Martens Drive", "address2": "", "city": "Hammond", "state": "LA", "zipcode": "70401", "status": "", "id": 3 },
            { "address1": "10155 Perkins Rowe", "address2": "", "city": "Baton Rouge", "state": "LA", "zipcode": "70810", "status": "", "id": 4 },
            { "address1": "10111 Perkins Rowe", "address2": "", "city": "Baton Rouge", "state": "LA", "zipcode": "70810", "status": "", "id": 5 },
            { "address1": "643 Magazine St", "address2": "", "city": "New Orleans", "state": "LA", "zipcode": "70130", "status": "", "id": 6 },
            { "address1": "140 East Bridge Street", "address2": "", "city": "Breaux Bridge", "state": "LA", "zipcode": "70517", "status": "", "id": 7 },
            { "address1": "4836 Constitution Avenue", "address2": "", "city": "Baton Rouge", "state": "LA", "zipcode": "70808", "status": "", "id": 8 }
        ];

        var service = {};

        service.all = function () {
            var dfd = Common.$q.defer();

            dfd.resolve(fakeProperties);

            return dfd.promise;
        };

        service.findById = function (id) {
            var dfd = Common.$q.defer();

            var found =  _.find(fakeProperties, function (property) {
                return property.id == id;
            });
            
            dfd.resolve(found);

            return dfd.promise;
        };
        
        service.add = function (property) {
            var dfd = Common.$q.defer();

            var newId =  _.max(fakeProperties, function (prop) {
                return prop.id;
            }).id + 1;
            
            property.id = newId;
            
            fakeProperties.push(property);
            
            dfd.resolve(property);

            return dfd.promise;
        };

        return service;
    }]);
})()