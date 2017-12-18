
define(
    [
        'jquery',
        'leq',
        'mm'
    ],
    function ( $, leq, mm ) {
        mm.register('module/core.modulemanager', leq.Class.extend({
            initialize: function ( ) {
                leq.pubsub.subscribe('modulemanager.loadcontent', function ( target ) {
                    var $target = $(target),
                        moduleName = $target.data('module'),
                        loaded = $target.data('loaded');

                    if (loaded === undefined) {
                        leq.ui.busy($target.parent(), true);

                        require(['module/' + moduleName], function ( ) {
                            mm.start('module/' + moduleName);
                            $target.data('loaded', true);

                            leq.ui.busy($target.parent(), false);

                            leq.pubsub.publish('modulemanager.contentloaded', moduleName);
                        });
                    }
                });
            }
        }));
    }
);