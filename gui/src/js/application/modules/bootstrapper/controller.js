
define(
    [
        'leq',
        'mm',

        'module/bootstrapper/startup'
    ],
    function ( leq, mm ) {
        mm.register('module/bootstrapper', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
              /*  leq.pubsub.subscribe('application.loaded', function ( ) {
                    // get rid of the Authentication module
                    mm.stop('module/authentication');
                    mm.stop('module/application');
                });*/

              ;
                // load application module
               /* require(['module/application'], function ( ) {
                    mm.start('module/application');
                });*/
            }
        }));
    }
);