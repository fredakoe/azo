
define(
    [
        'leq',
        'mm',
        'module/about/view',

        'library/bindings/gridview'
    ],
    function ( leq, mm, View ) {
        mm.register('module/about', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();
            }
        }));
    }
);