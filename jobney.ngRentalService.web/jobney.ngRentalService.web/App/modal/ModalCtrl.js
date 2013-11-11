(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('ModalCtrl', ['$scope', 'ModalService', function ($scope, ModalService) {
        $scope.close = function () {
            ModalService.close();
        };
    }]);
})()