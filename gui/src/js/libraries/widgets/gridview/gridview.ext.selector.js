
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq ) {
        var GridViewSelector = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.dataStore.on('change', leq.proxy(self.refresh, self));

                self.uid = leq.guid();

                self.$element.on('click.gridview.selector', 'td', leq.proxy(self.cellClick, self));
                $(document).on('click.document.gridview.selector', leq.proxy(self.documentClick, self));
            },

            destroy: function ( ) {
                var self = this;

                self.$element.off('gridview.selector');
            },

            options: {
                dataStore: {},
                headers: [],
                SELECTED: '_selected_'
            },

            refresh: function ( ) {
                var self = this;

                self._selectCell(null);
                self.options.parent.trigger('selected', null);

                leq.each(self.$element.find('tr'), function ( tr ) {
                    var $row = $(tr),
                        selected = self._getSelected($row);

                    if (selected) {
                        self._selectRow($row);
                    }
                });
            },

            cellClick: function ( e ) {
                var self = this,
                    $cell = $(e.target).closest('td');

                if (!self.$focusedCell) {
                    $(document).on('keydown.document.gridview.selector.' + self.uid, leq.proxy(self.documentKeyDown, self));
                }

                self._selectCell($cell);
            },

            documentClick: function ( e ) {
                var self = this,
                    $target = $(e.target),
                    $parent = $target.parents('tbody'),
                    $cell = $target.closest('td');

                if (($parent.length && $parent[0] !== self.$element[0]) || $cell.length === 0) {
                    // Clicked outside of our table
                    self._selectCell(null);
                    $(document).off('keydown.document.gridview.selector.' + self.uid);
                }
            },

            documentKeyDown: function ( e ) {
                var self = this,
                    which = e.which;

                switch (which) {
                    case leq.keys.DOWN:
                        return self._selectCellDown();

                    case leq.keys.UP:
                        return self._selectCellUp();

                    case leq.keys.LEFT:
                        return self._selectCellLeft();

                    case leq.keys.RIGHT:
                        return self._selectCellRight();
                }
            },

            _selectCellDown: function ( ) {
                var self = this,
                    $cell = self.$focusedCell,
                    $row = self.$selectedRow,
                    $nextRow = $row.next();

                 if ($nextRow.length > 0) {
                     self._selectCell($($nextRow.children()[$cell.index()]));
                 }
            },

            _selectCellUp: function ( ) {
                var self = this,
                    $cell = self.$focusedCell,
                    $row = self.$selectedRow,
                    $prevRow = $row.prev();

                if ($prevRow.length > 0) {
                    self._selectCell($($prevRow.children()[$cell.index()]));
                }
            },

            _selectCellLeft: function ( ) {
                var self = this,
                    $cell = self.$focusedCell,
                    $prevCell = $cell.prev();

                if ($prevCell.length > 0) {
                    self._selectCell($prevCell);
                }
            },

            _selectCellRight: function ( ) {
                var self = this,
                    $cell = self.$focusedCell,
                    $nextCell = $cell.next();

                if ($nextCell.length > 0) {
                    self._selectCell($nextCell);
                }
            },

            _selectCell: function ( $cell ) {
                var self = this,
                    $row = $cell ? $cell.parent('tr') : null;

                if (self.$selectedRow) {
                    self.$selectedRow.removeClass('selected');
                    self._setSelected(self.$selectedRow, false);
                }
                if (self.$focusedCell) {
                    self.$focusedCell.removeClass('focused');
                }

                self._selectRow($row);

                self.$focusedCell = $cell;
                if (self.$focusedCell) {
                    self.$focusedCell.addClass('focused');
                }
            },

            _selectRow: function ( $row ) {
                var self = this;

                self.$selectedRow = $row;

                if (self.$selectedRow) {
                    self.$selectedRow.addClass('selected');
                    self._setSelected(self.$selectedRow, true);
                }
            },

            _getSelected: function ( $row ) {
                var model = $row.data('model');

                return model ? model[this.options.SELECTED] : false;
            },

            _setSelected: function ( $row, value ) {
                var self = this,
                    model = $row.data('model');

                if (value) {
                    if (!leq.isEmpty(model)) {
                        model[this.options.SELECTED] = value;
                        self.options.parent.trigger('selected', model);
                    }
                }
                else {
                    model && (delete model[this.options.SELECTED]);
                    self.options.parent.trigger('selected', null);
                }
            }
        });

        return GridViewSelector;
    }
);