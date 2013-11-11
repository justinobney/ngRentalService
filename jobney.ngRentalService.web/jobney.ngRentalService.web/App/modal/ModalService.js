(function() {
    'use strict';

    var app = angular.module('ngRentalService');

    app.factory('ModalService', [function() {
        var ModalService = {};

        // private vars
        var modalEl = $('#MainModal');
        var backdrop = $('.modal-backdrop');
        
        function checkElements() {
            modalEl = (modalEl.length) ? modalEl : $('#MainModal');
            backdrop = (backdrop.length) ? backdrop : $('.modal-backdrop');
        }

        ModalService.show = function (hideBackdrop) {
            checkElements();

            if (!hideBackdrop)
                backdrop.show();
            
            modalEl.show();
        };

        ModalService.close = function () {
            checkElements();
            backdrop.hide();
            modalEl.hide();
        };

        ModalService.hide = ModalService.close;

        return ModalService;
    }]);
})()