
define(
    [
        'leq'
    ],
    function ( leq ) {
        var SplashScreenViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this;

                leq.extensions.ViewModel.fn.initialize.call(self);
            }
        });

        return SplashScreenViewModel;
    }
);