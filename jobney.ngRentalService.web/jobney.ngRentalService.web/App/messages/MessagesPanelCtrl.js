(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('MessagesPanelCtrl', ['$scope', function ($scope) {
        // TODO: move to service
        var fakeMessages = [
            { id: 1, from: 'John Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 2, from: 'Jane Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 3, from: 'Jill Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 4, from: 'Josh Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 5, from: 'John Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 6, from: 'Joe Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' },
            { id: 7, from: 'Jacob Smith', timestamp: 'Jan 1, 2042 8:00 AM', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ...' }
        ];

        $scope.messages = fakeMessages;
    }]);
})()