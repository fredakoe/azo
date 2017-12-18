
define(
    [
        'leq',
        'mm',
        'module/candidats/cv/view'

    ],
    function ( leq, mm, View ) {
        mm.register('module/cv', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
            }
        }));
    }
);