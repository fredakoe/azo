
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {
        var GridViewEditor = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.dataStore.on('change', leq.proxy(self.refresh, self));

                self.overrideDefault = false;
                self.$editing = null;

                self.templates = {
                    'string': $(leq.template(self.options.templates[leq.STRING])()),
                    'number': $(leq.template(self.options.templates[leq.NUMBER])()),
                    'boolean': $(leq.template(self.options.templates[leq.BOOLEAN])()),
                    'array': $(leq.template(self.options.templates[leq.ARRAY])()),
                    'date':     $(leq.template(self.options.templates[leq.DATE])())

                };

                self.templates[leq.STRING]
                    .on('focusout.gridview.input', leq.proxy(self.inputFocusOut, self))
                    .on('click.gridview.input', function ( e ) {
                        e.stopPropagation();
                    });

                self.templates[leq.NUMBER]
                    .on('focusout.gridview.input', leq.proxy(self.inputFocusOut, self))
                    .on('click.gridview.input', function ( e ) {
                        e.stopPropagation();
                    });

                self.templates[leq.BOOLEAN]
                    .on('focusout.gridview.input', leq.proxy(self.inputFocusOut, self));

                self.templates[leq.ARRAY]
                    .on('focusout.gridview.input', leq.proxy(self.inputFocusOut, self))
                    .on('change.gridview.input', leq.proxy(self.inputFocusOut, self))
                    .on('click.gridview.input', function ( e ) {
                        e.stopPropagation();
                    });

                self.$element.on('click.gridview.editor',   'td', leq.proxy(self.cellClick, self));
                self.$element.on('keydown.gridview.editor', 'td', leq.proxy(self.cellKeyDown, self));
            },

            destroy: function ( ) {
                var self = this;

                self.dataStore.off('change');

                self.templates[leq.STRING].off('gridview.input');
                self.templates[leq.NUMBER].off('gridview.input');
                self.templates[leq.BOOLEAN].off('gridview.input');
                self.templates[leq.ARRAY].off('gridview.input');
                self.templates[leq.DATE].off('gridview.input');

                self.$element.off('gridview.editor');
            },

            options: {
                dataStore: {},
                adapters: {},
                templates: {
                    'string':  '<input type="text" class="gridview-cell-editing-input"/>',
                    'number':  '<input type="text" class="gridview-cell-editing-input"/>',
                    'boolean': '<input type="checkbox" class="gridview-cell-editing-input"/>',
                    'array':   '<select class="gridview-cell-editing-input"/>',
                    'date':    '<input type="date" class="gridview-cell-editing-input"/>'

                    // TODO date
                },
                PRISTINE: '_pristine_'
            },

            refresh: function ( ) {
                var self = this;

                leq.each(self.$element.find('.gridview-body-item'), function ( item ) {
                    var $item = $(item),
                        field = $item.data('field'),
                        model = $item.data('model'),
                        value = leq.data.unwrap(model, field),
                        pristineValue = self._getPristineValue(model, field);

                    if (value !== pristineValue) {
                        $item.prepend($('<span class="gridview-cell-dirty"/>'));
                    }
                });
            },

            cellClick: function ( e ) {
                var self = this,
                    $target = $(e.target).closest('.gridview-body-item'),
                    editable = $target.data('editable');

                if (editable) {
                    if (self.$editing && !self.apply()) {
                        return;
                    }

                    self.edit($target);
                }
            },

            cellKeyDown: function ( e ) {
                var self = this,
                    which = e.which,
                    shift = e.shiftKey,
                    $cell = self.$editing.closest('td');

                self.overrideDefault = (which === leq.keys.ESC || which === leq.keys.ENTER || which === leq.keys.TAB);

                // Escape
                (which === leq.keys.ESC) && self.cancel();

                // Enter
                (which === leq.keys.ENTER) && self.apply();

                // Tab
                if (which === leq.keys.TAB) {
                    if (self.apply()) {
                        // Patch for IE
                        document.body.focus();

                        if (!shift) {
                            $cell = self.getNextCell($cell);
                            $cell && setTimeout(function ( ) {
                                self.edit($cell.find('.gridview-body-item').first());
                            }, 1);
                        }
                        else {
                            $cell = self.getPrevCell($cell);
                            $cell && setTimeout(function ( ) {
                                self.edit($cell.find('.gridview-body-item').first());
                            }, 1);
                        }

                        // Patch for IE
                        if (!$cell) {
                            document.body.focus();
                        }
                    }
                }

                self.overrideDefault && leq.dom.cancelEvent(e);
                self.overrideDefault = false;
            },

            inputFocusOut: function ( e ) {
                var self = this;

                !self.overrideDefault && self.apply();
            },

            edit: function ( $item ) {
                var self = this,
                    model = $item.data('model'),
                    field = $item.data('field'),
                    type = $item.data('type'),
                    values = $item.data('values') || [],
                    pristineValue = self._getPristineValue(model, field),
                    $input = self.templates[type] || self.templates[leq.STRING],
                    value = $item.text();

                self.$editing = $item.addClass('gridview-cell-editing');
                $item.empty();

                if (type === leq.ARRAY) {
                    $input.html('');

                    leq.each(values, function ( val ) {
                        $('<option value="' + val + '" ' + (value === val ? 'selected' : '') + '>' + val + '</option>').appendTo($input);
                    });

                    $item.append($input);
                }
                else {
                    $item.append($input.attr({'placeholder': pristineValue, 'value': value}));
                }

                $input.focus();
            },

            cancel: function ( ) {
                var self = this,
                    model = self.$editing.data('model'),
                    field = self.$editing.data('field');

                // reset to original value
                return self.endEdit(leq.data.unwrap(model, field));
            },

            apply: function ( ) {
                var self = this,
                    type = self.$editing.data('type'),
                    value = $(self.$editing[0].firstChild).val(),
                    newValue = value;

                // validation
                if (type === leq.NUMBER) {
                    newValue = parseFloat(newValue);
                    if (isNaN(newValue)) {
                        self.$editing.children().addClass('error');
                        self.$editing.children().focus();
                        return false;
                    }
                }
                else if (type === leq.BOOLEAN) {
                    newValue = value ? true : false;
                }

                return self.endEdit(newValue);
            },

            endEdit: function ( newValue ) {
                var self = this,
                    colIndex = $(self.$editing.closest('td')).index(),
                    model = self.$editing.data('model'),
                    field = self.$editing.data('field'),
                    pristineValue = self._getPristineValue(model, field);

                if (newValue !== undefined && newValue.toString() === '') {
                    newValue = pristineValue;
                }

                self.overrideDefault = true;
                self.$editing.removeClass('gridview-cell-editing');
                self.$editing.children().removeClass('error');
                self.$editing.children().detach();
                self.overrideDefault = false;



                // update View
                if (self.options.adapters && self.options.adapters[colIndex] && self.options.adapters[colIndex].write) {
                    var adapter = self.options.adapters[colIndex];

                    newValue = adapter.write(leq.data.unwrap(model[field]), newValue);
                    self.$editing.html(adapter.read(newValue));

                }
                else {
                    self.$editing.html(newValue);
                }

                // update Model
                if (leq.data.isObservable(model[field])) {
                    model[field](newValue);
                }
                else {
                    model[field] = newValue;
                }

                // dirty value
                if (newValue !== pristineValue) {
                    self._setPristineValue(model, field, pristineValue);
                    self.$editing.prepend($('<span class="gridview-cell-dirty"/>'));

                }

                self.$editing = null;

                return true;
            },

            getNextCell: function ( $current ) {
                var $cell = $current.next(),
                    $row = $current.parent();

                while (true) {
                    if ($cell.length > 0) {
                        if ($cell.find('.gridview-body-item').first().data('editable')) {
                            return $cell;
                        } else {
                            $cell = $cell.next();
                        }
                    } else {
                        $row = $row.next();
                        if ($row.length > 0) {
                            $cell = $row.children().first();
                        } else {
                            break;
                        }
                    }
                }
                return null;
            },

            getPrevCell: function ( $current ) {
                var $cell = $current.prev(),
                    $row = $current.parent();

                while (true) {
                    if ($cell.length > 0) {
                        if ($cell.find('.gridview-body-item').first().data('editable')) {
                            return $cell;
                        } else {
                            $cell = $cell.prev();
                        }
                    } else {
                        $row = $row.prev();
                        if ($row.length > 0) {
                            $cell = $row.children().last();
                        } else {
                            break;
                        }
                    }
                }
                return null;
            },

            _getPristineValue: function ( model, field ) {
                var context = leq.data.getContext(model, field),
                    oldValue = leq.data.unwrap(model, field),
                    pristineValue = context.data[context.field] ?
                        context.data[context.field][this.options.PRISTINE] :
                        undefined;

                return (pristineValue === undefined) ?
                    oldValue :
                    pristineValue;
            },

            _setPristineValue: function ( model, field, value ) {
                var context = leq.data.getContext(model, field);

                context.data[context.field][this.options.PRISTINE] = value;
            }
        });

        return GridViewEditor;
    }
);