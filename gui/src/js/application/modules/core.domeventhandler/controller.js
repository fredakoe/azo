
define(
    [
        'jquery',
        'leq',
        'mm'
    ],
    function ( $, leq, mm ) {
        mm.register('module/core.domeventhandler', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.initializeWindowHandlers();
            },

            initializeWindowHandlers: function ( ) {
                var $window = $(window),
                    bottomOffset = 9;

                // listen for Error events
                $(window).error(function ( e ) {
                    // log the error to the console
                    leq.console.log(e.originalEvent);

                    // broadcast the error
                    leq.pubsub.publish('application.error', {
                        message: e.originalEvent.message
                    });

                    // prevent further processing
                    return false;
                });

                // listen for Resize events
                $(window).resize(function ( e ) {
                    var topOffset = $('.masthead').outerHeight();

                    leq.pubsub.publish('application.resize', {
                        topOffset: topOffset,
                        bottomOffset: bottomOffset,
                        totalOffset: (topOffset + bottomOffset),
                        windowHeight: $window.height(),
                        windowWidth: $window.width()
                    });
                });

                // listen for Unload events
                $(window).unload(function ( e ) {
                    leq.pubsub.publish('application.unload');
                });
            }
        }));
    }
);