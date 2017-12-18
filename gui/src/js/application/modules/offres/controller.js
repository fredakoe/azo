
define(
    [
        'leq',
        'mm',
        'module/offres/view',

        'library/bindings/element',
        'library/bindings/gridview',
        'library/bindings/layered',
        'library/bindings/minicolorpicker',
        'library/bindings/fileupload',
        'library/bindings/fineupload',
    ],
    function ( leq, mm, View ) {
        mm.register('module/offres', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();
                //leq.pubsub.publish('typeUser', -1);
                leq.pubsub.subscribe('connexion', function ( connect ) {
                    leq.pubsub.publish('typeUser', connect.last().level);
                });
            }
        }));
    }
);