/*
    gridview v1.0.0
    Usage:
        $('selector').gridview({
            dataStore: dateSource,
            [headers: [{text: '', field: '' [, type: ''] [, styles: {width: '' [, ...]}] [, editable: false] [ , sortable: false]} [, ...]],]
            [overflow: {x: 'hidden' || 'scroll' || 'auto', y: 'hidden' || 'scroll' || 'auto'},]
            [filter: { field: 'orderId', operator: 'eq', value: 10248 } [, ...]]
            [range: {start: x, count: y}]
            [sort: { field: 'orderId', order: 'asc' } [, ...]]
            [group: { field: 'orderId' }]
            [height: 250 || 'auto',]
            [sortable: {mode: 'single' || 'multi'} || false,]
            [editable: false,]
            [pageable: false,]
            [pageSize: 10,]
            [scrollable: false,]
            [scalable: false,]
            [checbox: false,]
            [headerSelector: false,]
            [selectable: false]
            [bodySelector: false]
        });
*/

define(
    [
        'jquery',
        'leq',
        'text!library/widgets/gridview/gridview.tmpl.html',
        'library/widgets/gridview/gridview.ext.editor',
        'library/widgets/gridview/gridview.ext.grouphandler',
        'library/widgets/gridview/gridview.ext.header',
        'library/widgets/gridview/gridview.ext.pager',
        'library/widgets/gridview/gridview.ext.renderer',
        'library/widgets/gridview/gridview.ext.scaler',
        'library/widgets/gridview/gridview.ext.selector',
        'library/widgets/gridview/gridview.ext.sorter',
        'library/widgets/gridview/gridview.ext.toolbar',
        'library/widgets/gridview/gridview.ext.virtualscroller',
        'library/widgets/gridview/gridview.ext.checkbox',
        'library/widgets/gridview/gridview.ext.header.selector',
        'library/widgets/gridview/gridview.ext.bodyselector',

        'model/idselectfromgridview/idselected',
        'datastore/idselectfromgridview/idselected'


    ],
    function ( $, leq, template,
               GridViewEditor, GridViewGroupHandler, GridViewHeader,
               GridViewPager, GridViewRenderer, GridViewScaler,
               GridViewSelector, GridViewSorter, GridViewToolbar, GridViewVirtualScroller, GridViewCheckbox ,
               GridViewHeaderSelector,GridViewBodySelector,idselected,datastoreidselected) {
        var GridView = leq.ui.Widget.extend({
            initialize: function ( element, options) {
                var self = this,
                    $gridBody,
                    heightRegEx = /px|%$/;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.normalizeHeaders();

                if (self.options.dataStore instanceof leq.data.Queryable) {
                    self.dataStore = self.options.dataStore;
                }
                else {
                    self.dataStore = self.options.dataStore.asQueryable(options);
                    leq.each( options.dataStore, function(datas){

                        leq.each( datas._data, function(dataSt){

                        })
                    })
                }
                self.dataStore.on('change', function ( ) {
                    self.trigger('change');
                });

                self.$element
                    .addClass('gridview')
                    .addClass(self.options.className);

                self.$grid = $(template).appendTo(self.$element);

                if (!leq.support.scrollbar) {
                    self.$grid.find('.gridview-body')
                        .css({ 'padding-right': leq.support.DEFAULTSCROLLBARSIZE + 'px' });
                }

                self.$grid.find('.gridview-body-wrap')
                    .css('overflow-x', self.options.overflow.x)
                    .css('overflow-y', self.options.overflow.y);

                if (self.options.overflow.x === 'hidden') {
                    self.$grid
                        .find('.gridview-toolbar')
                        .css('padding-right', 0);
                    self.$grid
                        .find('.gridview-header')
                        .css('padding-right', 0);
                    self.$grid
                        .find('.gridview-pager')
                        .css('padding-right', 0);
                }

                if (!self.options.cellWraping) {
                    self.$grid.addClass('cellWrap');
                }

                // Default Extensions
                self.extensions = {
                    'header': new GridViewHeader(self.$grid.find('.gridview-header-wrap thead'), {
                        parent: self,
                        dataStore: self.dataStore,
                        headers: self.options.headers,
                        sortable: self.options.sortable
                    }),
                    'renderer': new GridViewRenderer(self.$grid.find('.gridview-body-wrap tbody'), {
                        parent: self,
                        dataStore: self.dataStore,
                        headers: self.options.headers,
                        adapters: self.options.adapters,
                        templates: self.options.templates
                    }),
                    'groupHandler': new GridViewGroupHandler(self.$grid.find('.gridview-body-wrap tbody'), {
                        parent: self,
                        dataStore: self.dataStore
                    }),
                    'toolbar': new GridViewToolbar(self.$grid.find('.gridview-toolbar-wrap'), {
                        parent: self,
                        dataStore: self.dataStore,
                        toolbar: self.options.toolbar
                    })
                };

                // Calculate the body height accordingly
                $gridBody = self.$grid.find('.gridview-body-wrap');

                if (!heightRegEx.test(self.options.height)) {
                    var height = self.calculateOptimalBodyHeight(parseFloat(self.options.height));
                    $gridBody.css('max-height', height);

                    if ($gridBody.outerHeight() < height) {
                        $gridBody.css('height', height);
                    }
                } else {
                    self.$grid.css('height', self.options.height);
                }

                // Optional Extensions
                if (self.options.sortable) {
                    self.extensions.sorter = new GridViewSorter(self.$grid.find('.gridview-header-wrap thead'), {
                        parent: self,
                        dataStore: self.dataStore,
                        headers: self.options.headers
                    });
                }

                if (self.options.editable) {
                    self.extensions.editor = new GridViewEditor(self.$grid.find('.gridview-body-wrap tbody'), {
                        parent: self,
                        dataStore: self.dataStore,
                        adapters: self.options.adapters
                    });
                }

                if (self.options.scalable) {
                    self.extensions.scaler = new GridViewScaler(self.$grid, {
                        parent: self,
                        dataStore: self.dataStore,
                        headers: self.options.headers
                    },
                    options.dataStore);

                }

                if (self.options.checkbox) {
                    self.extensions.checkbox = new GridViewCheckbox(
                        self.$grid,
                        {
                            parent: self,
                            dataStore: self.dataStore,
                            headers: self.options.headers
                        },
                        options.dataStore
                    );
                }

                if (self.options.bodySelector) {
                   self.extensions.bodyselector = new GridViewBodySelector(
                        self.$grid,
                        {
                            parent: self,
                            dataStore: self.dataStore,
                            headers: self.options.headers
                        },
                        idselected,
                       datastoreidselected
                    );
                }

                if (self.options.scrollable) {
                    self.extensions.virtualscroller = new GridViewVirtualScroller(self.$grid.find('.gridview-body-wrap'), {
                        parent: self,
                        dataStore: self.dataStore,
                        rowHeight: self.rowHeight(),
                        headers: self.options.headers
                    });
                }



                // Mutually exclusive extensions
                if (!self.options.scrollable && self.options.pageable) {
                    self.extensions.pager = new GridViewPager(self.$grid.find('.gridview-pager-wrap'), {
                        parent: self,
                        dataStore: self.dataStore,
                        pageSize: self.options.pageSize
                    });
                }

                // Mutually exclusive extensions
                if (!self.options.editable && self.options.selectable) {
                    self.extensions.selector = new GridViewSelector(self.$grid.find('.gridview-body-wrap tbody'), {
                        parent: self,
                        dataStore: self.dataStore,
                        headers: self.options.headers
                    });
                }

                // Trigger a change accordingly
                if (!self.options.scrollable && !self.options.pageable) {
                    self.dataStore.trigger('change');
                }
            },

            destroy: function ( ) {
                var self = this;
                self.dataStore.off('change');

                for (var extension in self.extensions) {
                    if (leq.has(self.extensions, extension)) {
                        self.extensions[extension].destroy.call(self.extensions[extension]);
                    }
                }

                self.$element.removeClass('gridview');
                self.$element.children('.gridview-wrap').remove();
            },

            options: {
                name: 'GridView',
                className: '',
                dataStore: {},
                headers: [],
                adapters: {},
                events: {},
                templates: {},
                overflow: {
                    x: 'auto',
                    y: 'scroll'
                },
                cellWraping: true,
                height: 'auto',
                group: {},
                editable: false,
                sortable: false,
                pageable: false,
                pageSize: 10,
                scrollable: false,
                scalable: false,
                selectable: false,
                checkbox: false,
                headerSelector:false,
                bodySelector:false
            },

            events: [
                'change',
                'selected',
                'row.clicked'
            ],

            refresh: function ( ) {
                this.dataStore.trigger('change');
            },

            headerHeight: function ( ) {
                return this.$grid.find('.gridview-header').outerHeight();
            },

            pagerHeight: function ( ) {
                return this.$grid.find('.gridview-pager').outerHeight();
            },

            rowHeight: function ( ) {
                return (this.$grid.find('thead tr').outerHeight() || 29);
            },

            calculateOptimalBodyHeight: function ( wantedHeight ) {
                var self = this,
                    headerHeight = self.headerHeight(),
                    pagerHeight = self.pagerHeight(),
                    rowHeight = self.rowHeight();

                return Math.floor((wantedHeight - (headerHeight + pagerHeight)) / rowHeight) * rowHeight;
            },

            normalizeHeaders: function ( ) {
                var self = this;

                leq.each(self.options.headers, function ( header, i ) {
                    self.options.headers[i] = leq.extend({
                        type: leq.STRING,
                        editable: true,
                        sortable: true
                    }, header);
                });
            }
        });

        // Register the Widget
        leq.ui.registerWidget(GridView);
});