(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('MessagesPanelCtrl', ['$scope', 'MessageService', function ($scope, MessageService) {

        activate();

        function activate() {
            MessageService.all().then(function (messages) {
                $scope.messages = messages;
            });
        }
    }]);
})()