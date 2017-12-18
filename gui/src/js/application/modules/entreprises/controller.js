
define(
    [
        'leq',
        'mm',
        'module/entreprises/view',


        'library/bindings/element',
        'library/bindings/gridview'
    ],
    function ( leq, mm, View ) {
        mm.register('module/entreprises', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
                leq.pubsub.publish('modulemanager.loadcontent', '#113');
                leq.pubsub.publish('application.loading');
            }
        }));
    }
);