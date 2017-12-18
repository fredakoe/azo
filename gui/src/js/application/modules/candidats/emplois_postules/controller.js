
define(
    [
        'leq',
        'mm',
        'module/candidats/emplois_postules/view',

        'library/bindings/element',
        'library/bindings/gridview'

    ],
    function ( leq, mm, View ) {
        mm.register('module/emplois_postules', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
            }
        }));
    }
);