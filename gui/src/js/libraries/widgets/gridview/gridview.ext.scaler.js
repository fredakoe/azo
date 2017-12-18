
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {
        var GridViewScaler = leq.ui.Widget.extend({
            initialize: function ( element, options,optionsDatastore ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options, optionsDatastore);

                self.dataStore = self.options.dataStore;

                self.data = optionsDatastore;


                self.dataStore.one('change', leq.proxy(self._calculateCellsWidth, self));

                self.scrollLeft = 0;
                self.$gridHeader = self.$element.find('.gridview-header-wrap');
                self.$gridBody = self.$element.find('.gridview-body-wrap');

                self.$gridBody
                    .on(leq.dom.events.SCROLL + '.scaler.gridview.body', leq.proxy(self.scroll, self));

                if (leq.support.features.touch) {
                    self.scrollLeftStartPos = 0;

                    self.$gridBody.css('overflow-x', 'hidden');

                    self.$gridBody
                        .on(leq.dom.events.MOUSEDOWN + '.scaler.gridview.body', function ( e ) {
                            var pos = leq.dom.getPositionFromEvent(e);
                            self.scrollLeftStartPos = self.$gridBody.scrollLeft() + pos[0].x;
                            leq.dom.cancelEvent(e);
                        });
                }

               // self._calculateCellsWidth();
            },

            destroy: function ( ) {
                var self = this;

                self.$gridBody.off('scaler.gridview.body');
            },

            options: {
                dataStore: {},
                headers: []
            },

            scroll: function ( e ) {
                var self = this,
                    scrollLeft = self.$gridBody.scrollLeft();

                if (leq.support.features.touch) {
                    var pos = leq.dom.getPositionFromEvent(e);
                    scrollLeft = self.scrollLeftStartPos - pos[0].x;
                    self.$gridBody.scrollLeft(scrollLeft);
                    e.preventDefault();
                }

                if (self.scrollLeft !== scrollLeft) {
                    self.scrollLeft = scrollLeft;

                    // Scroll the header simultaneously
                    self.$gridHeader.scrollLeft(scrollLeft);
                }
            },

            _calculateCellsWidth: function ( ) {
                var self = this,
                    $tableHeader = self.$element.find('.gridview-header table'),
                    data;

                if (self.dataStore.isGrouped()) {

                   // data = self.dataStore.getAll()[0].items[0];
                    //self.dataStore.one('change', leq.proxy(self._calculateCellsWidth, self));

                    leq.each(self.data.getAll(),function(item){

                    });

                }
                else {
                    data = self.dataStore.getAll()[0];
                }

                // Calculate the appropriate with for the gridview's cells
                data && leq.each(leq.data.unwrap(self.options.headers), function ( header, i ) {
                    var cellText = leq.data.unwrap(data, header.field),
                        headerText = header.text,
                        cellWidth = headerText.visualLength();

                    i = self.dataStore.isGrouped() ? i + 1 : i;

                    if (cellText) {
                        cellWidth = Math.max(cellText.toString().visualLength(), headerText.visualLength()) + 18;
                    }

                    // Adjust the cell width of the Header, if necessary
                    if (!header.styles || (header.styles && !header.styles.width)) {
                        header.styles = { 'width': cellWidth + 'px' };
                        $tableHeader
                            .find('th:eq(' + i + ')')
                            .css('width', cellWidth + 'px');
                    }
                });
            }
        });

        return GridViewScaler;
    }
);