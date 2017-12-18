
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        var GridViewHeader = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;

                self._create();
            },

            options: {
                dataStore: {},
                headers: []
            },

            _create: function ( ) {
                var self = this,
                    $headerRow;

                // Cleanup
                self.$element.find('tr').remove();

                // Create the only GridView Headers row
                $headerRow = $('<tr></tr>').appendTo(self.$element);

                // Grouped scenario
                if (self.dataStore.isGrouped()) {
                    $headerRow.append($('<th class="gridview-header-group">&nbsp;</th>'));
                }

                leq.each(self.options.headers, function ( header ) {
                    var $cell = $('<th></th>'),
                        $headerItem,
                        value = header.subtext ?
                            leq.format('{0} {1}', header.text, header.subtext) :
                            header.text;

                    $headerRow.append($cell.append('<span><span class="gridview-header-item"></span></span>'));

                    $headerItem = $cell.find('.gridview-header-item');
                    $headerItem.append(value);
                    $headerItem.data('field', header.field);
                    $headerItem.data('type', header.type);
                    $headerItem.data('sortable', header.sortable);
                    $headerItem.data('editable', header.editable);

                    // Apply styles, if any
                    header.styles && $cell.css(header.styles);
                });
            }
        });

        return GridViewHeader;
    }
);