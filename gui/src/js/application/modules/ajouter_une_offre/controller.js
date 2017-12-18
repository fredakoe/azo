
define(
    [
        'leq',
        'mm',
        'module/ajouter_une_offre/view',
        'library/bindings/element',
        'library/bindings/gridview'

    ],
    function ( leq, mm, View ) {
        mm.register('module/ajouter_une_offre', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
            }
        }));
    }
);