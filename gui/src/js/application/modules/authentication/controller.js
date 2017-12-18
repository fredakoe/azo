
define(
    [
        'leq',
        'mm',
        'module/authentication/view',

        'library/bindings/layered'
    ],
    function ( leq, mm, View ) {
        mm.register('module/authentication', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();
            }
        }));
    }
);