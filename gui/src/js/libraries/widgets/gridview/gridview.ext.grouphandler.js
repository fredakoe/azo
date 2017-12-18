
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {
        var GridViewGroupHandler = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;

                self.$element
                    .on('click.gridview.group', '.gridview-body-group-cell-expander a', leq.proxy(self.expanderClick, self));
            },

            destroy: function ( ) {
                var self = this;

                self.$element.off('gridview.group');
            },

            options: {
                dataStore: {}
            },

            expanderClick: function ( e ) {
                var self = this,
                    $row = $(e.target).closest('tr'),
                    group = $row.data('group');

                group.expanded = !group.expanded;
                self.dataStore.trigger('change');
            }
        });

        return GridViewGroupHandler;
    }
);