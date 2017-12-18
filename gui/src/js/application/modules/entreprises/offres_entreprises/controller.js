
define(
    [
        'leq',
        'mm',
        'module/entreprises/offres_entreprises/view',
        'library/bindings/element',
        'library/bindings/gridview'

    ],
    function ( leq, mm, View ) {
        mm.register('module/offres_entreprises', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
            }
        }));
    }
);