
define(
    [
        'jquery',
        'leq',
        'mm'
    ],
    function ( $, leq, mm ) {
        mm.register('module/core.pubsubeventhandler', leq.Class.extend({
            initialize: function ( ) {
                leq.pubsub.subscribe('application.loaded', function ( ) {
                    // handle navigation tab change requests
                    $('a[data-toggle="tab"][data-module="loader"]').live('shown.bs.tab', function ( e ) {
                        var $target = $(e.target),
                            href = $target.attr('href'),
                            moduleName = $(href).data('module');

                        leq.pubsub.publish('modulemanager.loadcontent', href);
                        leq.pubsub.publish('application.tabclicked', moduleName);

                        // trigger a resize
                        $(window).resize();
                    });
                });

                /*leq.pubsub.subscribe('application.unload', function ( ) {

                });*/

                leq.pubsub.subscribe('modulemanager.contentloaded', function ( moduleName ) {
                    // trigger a resize
                    $(window).resize();

                    // enable tooltips across the board
                    $('a[rel="tooltip"]')
                        .tooltip()
                        .click(function ( ) {
                            // tooltip bug on Mobile
                            $(this).tooltip('toggle');
                        });
                });
            }
        }));
    }
);