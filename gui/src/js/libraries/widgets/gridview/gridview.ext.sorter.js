
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {
        var GridViewSorter = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;

                self.sortOptions = [];

                self.templates = {
                    'asc': leq.template(self.options.templates.asc)(),
                    'desc': leq.template(self.options.templates.desc)()
                };

                self.$element.find('.gridview-header-item').each( function ( i, item ) {
                    var $item = $(item),
                        field = $item.data('field'),
                        sortOptions = self.dataStore.getSort(),
                        sortable = $item.data('sortable');

                    // by default all fields are sortable unless noted otherwise
                    if (sortable === undefined || (sortable !== undefined && sortable)) {
                        $item.attr('role', 'sortable');

                        if (sortOptions && sortOptions.field === field) {
                            $item.data('order', sortOptions.order);

                            self._addSort({field: field, order: sortOptions.order});
                            $item.append(self.templates[sortOptions.order]);
                        }
                    }
                });

                self.$element.on('click.header.gridview', '.gridview-header-item[role="sortable"]', leq.proxy(self.headerClick, self));
            },

            destroy: function ( ) {
                var self = this;

                self.$element.off('header.gridview');
            },

            options: {
                dataStore: {},
                headers: [],
                templates: {
                    'asc': '<i class="icon-chevron-up"></i>',
                    'desc': '<i class="icon-chevron-down"></i>'
                }
            },

            headerClick: function ( e ) {
                var self = this,
                    $el = $(e.target).closest('.gridview-header-item'),
                    field = $el.data('field'),
                    order = $el.data('order');

                // alternate the order from null to asc to desc
                order = !order ?
                    'asc' :
                    (order === 'asc' ?
                        'desc' :
                        null);

                $el.data('order', order);
                $el.find('i').remove();
                self._removeSort(field);

                if (order) {
                    self._addSort({field: field, order: order});
                    $el.append(self.templates[order]);
                }

                self.dataStore.sort(self.sortOptions);
            },

            _addSort: function ( options ) {
                var self = this;

                self.sortOptions.push(options);
            },

            _removeSort: function ( field ) {
                var self = this;

                leq.each(self.sortOptions, function ( sort, i ) {
                    if (sort.field === field) {
                        self.sortOptions.splice(i, 1);
                        return false;
                    }
                });
            }
        });

        return GridViewSorter;
    }
);