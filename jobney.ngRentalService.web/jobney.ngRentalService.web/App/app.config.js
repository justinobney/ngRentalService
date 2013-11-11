// This is where the Main App Module is declared [ngRentalService].
// This would be a good place to do other global configuration
// I have opted to split out the state definitions into seperate files
// based on their parent states. This can be changed in the future if we want.
// I just think it allows quicker transparency about the states the app can be in.

(function () {
    "use strict";
    var app = angular.module('ngRentalService');

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    app.provider('CommonConfig', commonConfig);

    function commonConfig() {
        var permissions = {
            vendor: 'landlord',
            buyer: 'tenant'
        };

        this.config = {
            // These are the properties we need to set
            controllerActivateSuccessEvent: 'controllerActive',
            permissions: permissions
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    app.config(['$parseProvider', function ($parseProvider) {
        // Automatic "promise" unwrapping in views was removed in v1.2-rc3.
        // This funcitonality is now opt-in. This shouldnt be an issue unless
        // get into some complex ui directives.
        $parseProvider.unwrapPromises(true);
    }]);
})();
