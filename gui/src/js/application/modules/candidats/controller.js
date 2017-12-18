
define(
    [
        'leq',
        'mm',
        'module/candidats/view',


        'library/bindings/element',
        'library/bindings/gridview'
    ],
    function ( leq, mm, View ) {
        mm.register('module/candidats', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();
                leq.pubsub.publish('modulemanager.loadcontent', '#213');
                leq.pubsub.publish('application.loading');

            }
        }));
    }
);