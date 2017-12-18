
define(
    [
        'leq',
        'mm',
        'module/entreprises/ajouter_une_offre/view',
        'library/bindings/element',
        'library/bindings/gridview'

    ],
    function ( leq, mm, View ) {
        mm.register('module/ajouter_une_offre_entreprise', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
            }
        }));
    }
);