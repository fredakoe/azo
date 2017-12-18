
define(
    [
        'leq',
        'mm',
        'module/entreprises/candidatures/view',

        'library/bindings/element',
        'library/bindings/gridview'

    ],
    function ( leq, mm, View ) {
        mm.register('module/candidatures', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
            }
        }));
    }
);