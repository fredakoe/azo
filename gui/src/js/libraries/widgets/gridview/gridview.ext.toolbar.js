
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        var GridViewToolbar = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;

                self._create();
            },

            destroy: function ( ) {
                var self = this;
            },

            options: {
                dataStore: {},
                toolbar: null
            },

            _create: function ( ) {
                var self = this;

                // Cleanup
                self.$element.find('ul').remove();

                if (self.options.toolbar) {
                    self.$element.append(self.options.toolbar());
                }
                else {
                    self.$element.css('display', 'none');
                }
            }
        });

        return GridViewToolbar;
    }
);