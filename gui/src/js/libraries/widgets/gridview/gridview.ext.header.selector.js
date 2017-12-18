
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq) {

        var GridViewHeaderSelector = leq.ui.Widget.extend({

            initialize: function ( element, options, datanetwork, optionsDatastore) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.optionsDatastore = optionsDatastore;

                self.$gridHeader = self.$element.find('.gridview-header-wrap');
                self.$gridBody   = self.$element.find('.gridview-body-wrap');

                self.templates = {
                    'array': $(leq.template(self.options.templates[leq.ARRAY])())
                };
                leq.each(self.$element.find('.gridview-header-wrap').find('.gridview-header-item'), function ( item ) {

                    var $item = $(item),
                        field = $item.data('field'),
                        value = $item.text();

                    if (field == 'networkId'){
                        self.$input =  self.templates['array'];
                        self.$input.html('');

                        leq.each(datanetwork, function ( val ) {
                            $('<option value="'+ val +'">'+ val +'</option>').appendTo( self.$input);
                        });
                        $item.append( self.$input);
                    }
                });
                self.$element.on('click.header.gridview','select.select-head', leq.proxy(self.selectAllNetworkId, self));
            },
            options: {

                dataStore: {},
                headers: [],
                templates: {
                    'array': '<select class="select-head"/>'
                }
            },
            selectAllNetworkId: function(){

                var self = this;

                leq.each(self.$element.find('.gridview-header-wrap').find('.gridview-header-item'),function (itemHead){

                    var $itemHead = $(itemHead),
                        field = $itemHead.data('field');

                    if(field ==  "networkId"){
                        self.neworkIdSelected =  $itemHead.find('.select-head')[0].value;
                    }
                });
                leq.each(self.optionsDatastore.getAll(),function(items){
                    items.setValue('networkId',self.neworkIdSelected);
                });

//                self.$element.find('.gridview-body-wrap').find('.gridview-body-item')
//                    .each( function (i,item) {
//
//                        var $item = $(item),
//                            model = $item.data('model'),
//                            field = $item.data('field'),
//                            type = $item.data('type')
//
//                        if(field == 'networkId'){
//
//                            $item.html(self.neworkIdSelected);
//                           // model[field] =self.neworkIdSelected;
//                            // $item.prepend($('<span class="gridview-cell-dirty"/>'));
//                        }
//                    });
            }
        });

        return GridViewHeaderSelector;
    }
);

