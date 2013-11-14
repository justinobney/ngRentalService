(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('PropertiesService', ['Common', function (Common) {

        var fakeProperties = [
            { id: 1, address1: '10000 Perkins Rowe', city: 'Baton Rouge', state: 'LA', zipcode: '70809' },
            { id: 2, address1: '4200 Essen Ln', city: 'Baton Rouge', state: 'LA', zipcode: '70809' },
            { id: 3, address1: '11585 Lake Sherwood Ave N', city: 'Baton Rouge', state: 'LA', zipcode: '70816' },
            { id: 4, address1: '2344 W Contour Dr', city: 'Baton Rouge', state: 'LA', zipcode: '70809' },
            { id: 5, address1: '782 Baird Dr', city: 'Baton Rouge', state: 'LA', zipcode: '70808' }
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