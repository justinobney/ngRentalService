(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('MessageService', ['Common', function (Common) {

        var fakeMessages = [
            { id: 1, from: 'John Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 2, from: 'Jane Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 3, from: 'Jill Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 4, from: 'Josh Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 5, from: 'John Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 6, from: 'Joe Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 7, from: 'Jacob Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' }
        ];

        var service = {};

        service.all = function () {
            var dfd = Common.$q.defer();

            dfd.resolve(fakeMessages);

            return dfd.promise;
        };

        service.findById = function (id) {
            var dfd = Common.$q.defer();

            var found =  _.find(fakeMessages, function (message) {
                return message.id == id;
            });
            
            dfd.resolve(found);

            return dfd.promise;
        };

        return service;
    }]);
})()