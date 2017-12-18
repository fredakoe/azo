
define(
    [
        'leq'
    ],
    function ( leq ) {
        var ErrorViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this;

                leq.extensions.ViewModel.fn.initialize.call(self);
            }
        });

        return ErrorViewModel;
    }
);