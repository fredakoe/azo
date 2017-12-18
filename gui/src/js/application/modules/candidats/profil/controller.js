
define(
    [
        'leq',
        'mm',
        'module/candidats/profil/view'

    ],
    function ( leq, mm, View ) {
        mm.register('module/profil', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();

            }
        }));
    }
);