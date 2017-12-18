
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {
        var GridViewRenderer = leq.ui.Widget.extend({
            initialize: function ( element, options ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.dataStore.on('change', leq.proxy(self.refresh, self));

                self.templates =  {
                    'checkbox': leq.template(self.options._templates.checkbox),
                    'groupRow': leq.template(self.options._templates.groupRow),
                    'bodyCell': leq.template(self.options._templates.bodyCell)
                };

                self.$element.on('click.gridview.renderer', 'td', leq.proxy(self.cellClick, self));
            },

            destroy: function ( ) {
                var self = this;

                self.dataStore.off('change');
                self.$element.off('click.gridview.renderer');
            },

            options: {
                dataStore: {},
                headers: [],
                adapters: {},
                templates: {},
                _templates: {
                    'checkbox': '<input type="checkbox" class="gridview-item-select">',
                    'groupRow':
                        '<% if ( count!=0) { %>' +
                        '<tr class="gridview-body-group-row">' +
                            '<td class="gridview-body-group-cell-expander"><a href="#"><i class="<%= expanded ? "icon-chevron-down" : "icon-chevron-right" %>"></i></a></td>' +
                            '<% for (var i = 0; i < headers.length; i++) { %>' +
                            '<td class="gridview-body-group-cell" style=" width: <%= headers[i].styles ? headers[i].styles.width : "auto" %>;">' +
                            '<% if (i === 0) { %>' +
                            '<input type="checkbox" class="gridview-item-select" name="<%= name %>" >'+
                            '<span class="gridview-body-group-title" style="margin-left: 20px;"><%= name %> (<%= count %>)</span>' +
                            '<% } %>' +
                            '&nbsp;'+
                            '</td>' +
                            '<% } %>' +
                            '</tr>'+
                            '<% } %>' ,

                    'bodyCell': '<td class="gridview-body-cell"><span><span class="gridview-body-item"></span></span></td>'
                }
            },

            refresh: function ( ) {
                var self = this;

                // cleanup
                self.$element.find('tr').remove();

                // grouped scenario
                if (self.dataStore.isGrouped()) {
                    var $gridRow;

                    leq.each(self.dataStore.getAll(), function ( group ) {
                        // Group Row
                        $gridRow = $(self.templates.groupRow({
                            headers: self.options.headers,
                            expanded: group.expanded,
                            name: group.value,
                            count: group.items.length
                        })).appendTo(self.$element);

                        $gridRow.data('uid', group.uid);
                        $gridRow.data('group', group);

                        // Group items Rows
                        group.expanded && self._createRows(group.items);

                    });
                }
                // ungrouped scenario
                else {
                    self._createRows(self.dataStore.getAll());
                }
            },

            cellClick: function ( e ) {
                var self = this,
                    $item = $(e.target).closest('.gridview-body-item'),
                    $target = $item.length ? $item : $(e.target).find('.gridview-body-item'),
                    model = $target.data('model'),

                    rowIndex = $($target.closest('tr')).index(),
                    cellIndex = $($target.closest('td')).index(),
                    field,
                    context,
                    value;

                   if( model!= undefined ){

                           field = $target.data('field');
                           context = leq.data.getContext(model, field);
                           value = leq.data.unwrap(context.data, context.field);

                   }else{

                           field = 'null';
                           context ='null';
                           value = 'null';
                   }

                if (self.options.adapters[cellIndex] && self.options.adapters[cellIndex].read) {
                    value = self.options.adapters[cellIndex].read(value);
                }

                self.options.parent.trigger('row.clicked', {
                    row: rowIndex,
                    cell: cellIndex,
                    model: model,
                    field: field,
                    value: value
                });
            },

            _createRows: function ( data ) {
                var self = this,
                    $gridRow;

                leq.each(leq.data.unwrap(data), function ( item, rowIndex ) {
                    $gridRow = $('<tr></tr>').appendTo(self.$element);
                    $gridRow.data('uid', leq.guid());

                    if (self.dataStore.isGrouped()) {
                        $('<td class="gridview-body-group-cell-expander">&nbsp;</td>').appendTo($gridRow);
                    }

                    leq.each(self.options.headers, function ( header, index ) {
                        var $cell = $(self.templates.bodyCell()).appendTo($gridRow),
                            context = leq.data.getContext(item, header.field),
                            $bodyItem,
                            value = leq.data.unwrap(context.data, context.field);

                        if (self.options.adapters[index] && self.options.adapters[index].read) {
                            value = self.options.adapters[index].read(value);
                        }

                        if (self.options.templates[index]) {
                            value = self.options.templates[index]({data: value});
                        }

                        if (!self.options.adapters[index] && !self.options.templates[index] && header.type === leq.DATE) {
                            value = value.toString();
                        }

                        if (leq.data.isObservable(context.data[context.field])) {
                            context.data[context.field].subscribe(function ( newValue ) {
                                if (self.options.value) {
                                    newValue = self.options.value.get(index, newValue);
                                }
                                $bodyItem.html(newValue.toString());
                            });
                        }

                        if (context.data.fields && context.data.fields[context.field] && context.data.fields[context.field].backgroundColor) {
                            $cell.css('background-color', context.data.fields[context.field].backgroundColor);
                        }

                        if (!$gridRow.data('model')) {
                            $gridRow.data('model', context.data);
                        }

                        if (leq.isBoolean(value)) {
                            value = value.toString();
                        }

                        $bodyItem = $cell.find('.gridview-body-item');
                        $bodyItem.append(value);

                        $bodyItem.data('field', context.field);
                        $bodyItem.data('type', header.type);
                        $bodyItem.data('sortable', header.sortable);
                        $bodyItem.data('editable', value !== undefined ? header.editable : false);
                        $bodyItem.data('model', context.data);
                        $bodyItem.data('values', header.values);


                        // apply styles, if any
                        header.styles && $cell.css(header.styles);
                    });
                });
            }
        });

        return GridViewRenderer;
    }
);

