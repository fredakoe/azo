
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {
        var GridViewPager = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.dataStore.on('change', leq.proxy(self.refresh, self));

                self.pageCount = 1;
                self.currentPage = 1;

                self.$element.on('click.gridview.button', '.gridview-button-item', leq.proxy(self.buttonClick, self));

                self.setRange(self.currentPage);
            },

            destroy: function ( ) {
                var self = this;

                self.dataStore.off('change');
                self.$element.off('gridview.button');
            },

            options: {
                dataStore: {},
                pageSize: 10,
                buttonCount: 10
            },

            setRange: function ( page ) {
                var self = this;

                self.currentPage = page;

                self.dataStore.range({
                    start: (self.currentPage - 1) * self.options.pageSize,
                    count: self.options.pageSize
                });
            },

            refresh: function ( ) {
                var self = this,
                    $pagerUl = self.$element.find('ul'),
                    start,
                    stop;

                // Cleanup
                $pagerUl.find('li').remove();

                self.pageCount = self.dataStore.total() > 0 ? Math.ceil(self.dataStore.total() / self.options.pageSize) : 1;

                start = Math.floor((self.currentPage - 1) / self.options.buttonCount) * self.options.buttonCount;
                stop = Math.min(start + self.options.buttonCount, self.pageCount);



                // Beginning ...
                if (self.currentPage > self.options.buttonCount) {
                    self._insertButton($pagerUl, start, true);

                }

                // 1, 2, etc
                for (var i = start; i < stop; i++) {
                    self._insertButton($pagerUl, i + 1, false);
                }

                // Ending ...
                if (self.pageCount > stop) {
                    self._insertButton($pagerUl, stop + 1, true);
                }
            },

            buttonClick: function ( e ) {
                var self = this;

                self.setRange($(e.target).data('page'));
            },

            _insertButton: function ( $ul, pageNumber, link ) {
                var self = this,
                    $li = $('<li></li>'),
                    $item;

                $ul.append($li.append('<span class="gridview-button-item">' + (link ? '...' : pageNumber) + '</span>'));
                $item = $li.find('.gridview-button-item');
                $item.data('page', pageNumber);

                if (self.currentPage === pageNumber) {
                    $item.addClass('active');
                }
            }
        });

        return GridViewPager;
    }
);