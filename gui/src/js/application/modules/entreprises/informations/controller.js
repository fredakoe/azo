
define(
    [
        'leq',
        'mm',
        'module/entreprises/informations/view'
    ],
    function ( leq, mm, View ) {
        mm.register('module/informations', leq.Class.extend({
            initialize: function ( ) {
                var self = this;
                self.view = new View();
            }
        }));
    }
);