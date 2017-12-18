
define(
    [
        'leq'
    ],
    function ( leq ) {
        var Controller = leq.Class.extend({
            initialize: function ( options ) {

            }
        });

        leq.extend(leq.extensions, {
            Controller: Controller
        });
    }
);