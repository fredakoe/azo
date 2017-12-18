
define(
    [
        'leq',
        'mm',
        'module/creer_compte_candidat/view'

    ],
    function ( leq, mm, View ) {
        mm.register('module/creer_compte_candidat', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();

            }
        }));
    }
);