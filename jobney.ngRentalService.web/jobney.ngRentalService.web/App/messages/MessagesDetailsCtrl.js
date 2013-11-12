(function () {
    'use strict';

    var app = angular.module('ngRentalService');

    app.controller('MessagesDetailsCtrl', ['$scope', '$stateParams', 'MessageService', function ($scope, $stateParams, MessageService) {

        activate();

        function activate() {
            var id = $stateParams.id;

            MessageService.findById(id).then(function (message) {
                $scope.message = message;
            });
        }
    }]);
})()