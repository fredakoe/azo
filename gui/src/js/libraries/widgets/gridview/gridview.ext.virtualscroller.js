
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {
        var GridViewVirtualScroller = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.dataStore.on('change', leq.proxy(self.refresh, self));

                self.scrollTop = -1;
                self.range = self.options.range;
                self.template = leq.template(self.options.template);

                self.$element
                    .on(leq.dom.events.MOZMOUSEWHEEL + '.scroller.gridview.body', leq.proxy(self.scroll, self))
                    .on(leq.dom.events.MOUSEWHEEL + '.scroller.gridview.body', leq.proxy(self.scroll, self))
                    .on(leq.dom.events.SCROLL + '.scroller.gridview.body', leq.proxy(self.scroll, self));

                if (leq.support.features.touch) {
                    self.scrollTopStartPos = 0;

                    self.$element.css('overflow-y', 'hidden');

                    self.$element
                        .on(leq.dom.events.MOUSEDOWN + '.scroller.gridview.body', function ( e ) {
                            var pos = leq.dom.getPositionFromEvent(e);
                            self.scrollTopStartPos = self.$element.scrollTop() + pos[0].y;
                            e.preventDefault();
                        });
                }

                self.$element
                    .find('table')
                    .css('height', self.dataStore.total() * self.options.rowHeight);

                self.$element.scrollTop(0);

                $(window).resize(function ( ) {
                    self._updateData();
                });
            },

            destroy: function ( ) {
                var self = this;

                self.dataStore.off('change');
                self.$element.off('scroller.gridview.body');
            },

            options: {
                dataStore: {},
                rowHeight: 0,
                headers: [],
                range: {
                    start: 0,
                    count: 0
                },
                template:
                    '<tr style="height: <%= height %>px;">' +
                        '<% if (grouped) { %>' +
                        '<td class="gridview-body-group-cell-expander"></td>' +
                        '<% } %>' +
                        '<% for (var i = 0; i < headers.length; i++) { %>' +
                        '<td style="width: <%= headers[i].styles ? headers[i].styles.width : "auto" %>;"></td>' +
                        '<% } %>' +
                        '</tr>'
            },

            refresh: function ( ) {
                var self = this,
                    $tbody = self.$element.find('tbody'),
                    upperHeight = self.range.start * self.options.rowHeight,
                    total = (self.range.start + self.range.count),
                    lowerHeight = (self.dataStore.total() - total) * self.options.rowHeight;

                // Insert bloated row at top and bottom if needed
                if (self.range.start > 0) {
                    $tbody.prepend(self.template({
                        height: upperHeight,
                        grouped: self.dataStore.isGrouped(),
                        headers: leq.data.unwrap(self.options.headers)}));
                }
                if (total < self.dataStore.total()) {
                    $tbody.append(self.template({
                        height: lowerHeight,
                        grouped: self.dataStore.isGrouped(),
                        headers: leq.data.unwrap(self.options.headers)}));
                }
            },

            scroll: function ( e ) {
                var self = this,
                    scrollTop = self.$element.scrollTop();

                if (leq.support.features.touch) {
                    var pos = leq.dom.getPositionFromEvent(e);
                    scrollTop = self.scrollTopStartPos - pos[0].y;
                    self.$element.scrollTop(scrollTop);
                    e.preventDefault();
                }

                if (self.scrollTop !== scrollTop) {
                    self.scrollTop = scrollTop;

                    self._updateData();
                }
            },

            _updateData: function ( ) {
                var self = this;

                if (self.element.scrollHeight > 0) {
                    self._calculateRange();

                    self.scrollTimeout && leq.clearTimeout(self.scrollTimeout);
                    self.scrollTimeout = leq.setTimeout(function ( ) {
                        self.dataStore.range({
                            start: self.range.start,
                            count: self.range.count
                        });
                    }, 10);
                }
            },

            _calculateRange: function ( ) {
                var self = this,
                    count = Math.ceil(self.$element.outerHeight() / self.options.rowHeight),
                    start = Math.max(0, Math.floor(self.scrollTop / self.options.rowHeight));

                self.range = {
                    start: start,
                    count: count
                };
            }
        });

        return GridViewVirtualScroller;
    }
);