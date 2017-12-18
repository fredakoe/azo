/*
    propertysheet v1.0.0
    Usage:
        $('selector').propertysheet({
            model: model,
            [overflow: {x: 'hidden' || 'scroll' || 'auto', y: 'hidden' || 'scroll' || 'auto'},]
            [filter: { field: 'orderId', operator: 'eq', value: 10248 } [, ...]]
            [range: {start: x, count: y}]
            [sort: { field: 'orderId', order: 'asc' } [, ...]]
            [group: { field: 'orderId' }]
            [height: 250 || 'auto',]
            [sortable: {mode: 'single' || 'multi'} || false,]
            [pageable: false,]
            [pageSize: 10,]
            [scrollable: false,]
        });
*/

define(
    [
        'leq',
        'library/widgets/propertysheet/modelasproperties',

        'library/widgets/gridview/gridview'
    ],
    function ( leq, ModelAsProperties ) {
        var PropertySheet = leq.ui.GridView.extend({
            initialize: function ( element, options ) {
                var self = this;

                options = leq.extend(options, {
                    dataStore: leq.data.DataStore.create({
                        data: new ModelAsProperties(options.model).properties,
                        autoFetch: true
                    }),
                    headers: [
                        {text: 'Property', field: 'property', styles: {width: '60%'}, editable: false},
                        {text: 'Value', field: 'value', styles: {width: '40%'}, editable: true}
                    ],
                    editable: true,
                    sortable: true,
                    scalable: false
                });

                leq.ui.GridView.fn.initialize.call(self, element, options);
            },

            options: {
                name: 'PropertySheet',
                model: {}
            }
        });

        // Register the Widget
        leq.ui.registerWidget(PropertySheet);
});