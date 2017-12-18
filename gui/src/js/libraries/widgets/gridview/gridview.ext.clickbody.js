define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq, undefined ) {

        var GridViewChecbox = leq.ui.Widget.extend({

            initialize: function ( element, options,optionsDatastore ) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.optionsDatastore = optionsDatastore;

                self.$gridHeader = self.$element.find('.gridview-header-wrap');
                self.$gridBody   = self.$element.find('.gridview-body-wrap');
                self.templates = {
                    'checkheadbox': leq.template(self.options.templates.checkheadbox)
                };

                self.$element.find('.gridview-header-wrap').find('.gridview-header-item').each( function ( i, item ) {
                    var $item = $(item),
                        field = $item.data('field'),
                        value = $item.text();
                    if (value == ''){
                        $item.append(self.templates["checkheadbox"]);
                    }
                });
                self.dataStore.on('change', leq.proxy(self.refresh, self));

                self.$element.on('click.header.gridview' ,'input.head-checkbox', leq.proxy(self.checkboxHeadClick, self))
                    .on('click.body.gridview','input.body-checkbox', leq.proxy(self.checkboxBodyClick, self))
                    .on('click.header.gridview','.gridview-header-item[role="sortable"]', leq.proxy(self.refresh, self))
                    .on('click.body.gridview','.gridview-item-select', leq.proxy(self.checkboxGroupClick, self))
                    .on('click.gridview.group', '.gridview-body-group-cell-expander a', leq.proxy(self.refresh, self))
                    .on(leq.dom.events.MOZMOUSEWHEEL + '.scroller.gridview.body', leq.proxy(self.refresh, self))
                    .on(leq.dom.events.MOUSEWHEEL + '.scroller.gridview.body', leq.proxy(self.refresh, self))
                    .on(leq.dom.events.SCROLL + '.scroller.gridview.body', leq.proxy(self.refresh, self))
                    .on('click.gridview.button', '.gridview-button-item', leq.proxy(self.refresh, self));
            },

            options: {

                dataStore: {},
                headers: [],
                templates: {
                    'checkheadbox': '<input  type="checkbox" class="head-checkbox" name="head"/>'
                },
                PRISTINEBODY: '_pristinebody_',
                PRISTINEHEAD: '_pristinehead_',
                PRISTINEGROUP:'_pristinegroup_',
                CHECKED:'_checked'
            },

            refresh: function ( ) {

                var self = this;

                self.$element.find('.gridview-body-wrap').find('.gridview-body-item')
                    .find('.body-checkbox').each( function ( i, item ) {

                        self.itemBody = $(item);

                        if(self.itemBody.parent().data('model')._checked){

                            // self.itemBody.context.checked = self._getPristineBodyValue(self.itemBody);
                            self.itemBody.context.checked = self.itemBody.parent().data('model')._pristinebody_;

                        }
                    });

                self.$element.find('.gridview-header-wrap').find('.gridview-header-item')
                    .find('.head-checkbox').each( function (i, item) {

                        self.itemHead = $(item);

                        self.itemHead.context.checked = self._getPristineHeadValue(self.optionsDatastore,self.itemHead);
                        // self.itemHead.context.checked = self.itemBody.parent().data('model')._pristinehead_;

                    });

                self.$element.find('.gridview-body-wrap').find('.gridview-body-group-row')
                    .find('.gridview-item-select').each( function ( i, item ) {
                        self.itemGroup = $(item);

                        self.itemGroup.context.checked = self._getPristineGroupValue(self.optionsDatastore,self.itemGroup);

                    });

            },

            checkboxBodyClick: function (e) {

                var self = this,
                    $el = $(e.target).closest('.body-checkbox'),
                    value = $el.parent().data('model').cableId();

                $el.parent().data('model')[self.options.PRISTINEBODY]= $el.context.checked;
                $el.parent().data('model')[self.options.CHECKED]= $el.context.checked;


                self.$element.find('.gridview-body-wrap').find('.gridview-body-group-row')
                    .find('.gridview-item-select').each( function ( i, item ) {

                        var $item = $(item),
                            name =  $item.context.name;

                        if(value == name){
                            $item.context.checked = false;
                            $el.parent().data('model')[self.options.PRISTINEGROUP]=  $item.context.checked;
                        }
                    });

                self.$element.find('.gridview-header-wrap').find('.gridview-header-item')
                    .find('.head-checkbox').each( function ( i, item ) {

                        var $item = $(item);
                        $item.context.checked = false;
                        $el.parent().data('model')[self.options.PRISTINEHEAD]=  $item.context.checked;

                    });
            },

            checkboxHeadClick: function (e) {

                var self = this,
                    $el = $(e.target).closest('.gridview-header-item'),
                    checkedhead =  $el.context.checked;

                self.cableChecked  =  $el.context.checked;

                leq.each(self.optionsDatastore.getAll(),function(itemsChecked){
                    itemsChecked[self.options.CHECKED]= $el.context.checked;
                    itemsChecked[self.options.PRISTINEHEAD]= $el.context.checked;
                    itemsChecked[self.options.PRISTINEBODY]= $el.context.checked;
                    itemsChecked[self.options.PRISTINEGROUP]= $el.context.checked;

                });

                if(checkedhead){

                    self.$element.find('.gridview-body-wrap').find('.gridview-body-group-row')
                        .find('.gridview-item-select').each( function (i,item) {

                            var $item = $(item);

                            $item.context.checked = true;

                        });

                    self.$element.find('.gridview-body-wrap').find('.gridview-body-item').find('.body-checkbox')
                        .each( function (i,item) {

                            var $item = $(item);

                            $item.context.checked = true;
                        });
                }
                else{

                    self.$element.find('.gridview-body-wrap').find('.gridview-body-group-row')
                        .find('.gridview-item-select').each( function ( i, item ) {

                            var $item =$(item);

                            $item.context.checked = false;
                            $item.parent().parent().data('group')[self.options.PRISTINEGROUP]= $item.context.checked;
                            $item.parent().parent().data('group')[self.options.PRISTINEGROUPSELECT]=$item.context.checked;
                        });

                    self.$element.find('.gridview-body-wrap').find('.gridview-body-item').find('.body-checkbox')
                        .each( function (i,item) {

                            var $item =$(item);

                            $item.context.checked = false;
                        });

                }
            },

            checkboxGroupClick: function (e) {

                var self = this,
                    $el = $(e.target).closest('.gridview-item-select'),
                    checkedgroup =  $el.context.checked,
                    value =  $el.context.name;

                $el.parent().parent().data('group')[self.options.PRISTINEGROUP]= checkedgroup ;
                $el.parent().parent().data('group')[self.options.PRISTINEGROUPSELECT]=checkedgroup;
                self.cableChecked  = checkedgroup;
                self.$element.find('.gridview-header-wrap').find('.gridview-header-item')
                    .find('.head-checkbox').each( function ( i, item ) {

                        var $item = $(item);

                        $item.context.checked = false;

                    });

                if(checkedgroup){

                    self.$element.find('.gridview-body-wrap').find('span.gridview-body-item')
                        .find('.body-checkbox' ).each( function (i, item) {

                            var $item = $(item);

                            leq.each(self.optionsDatastore.getAll(),function(itemsChecked){

                                if(value == itemsChecked.cableId()){
                                    itemsChecked[self.options.CHECKED]= true;
                                    itemsChecked[self.options.PRISTINEBODY]= true;
                                    itemsChecked[self.options.PRISTINEGROUP]= true;
                                    itemsChecked[self.options.PRISTINEHEAD]= false;
                                }
                            });

                            if( value == $item.parent().data('model').cableId()){
                                $item.context.checked = true;
                            }
                        });
                }
                else{

                    self.$element.find('.gridview-body-wrap').find('span.gridview-body-item')
                        .find('.body-checkbox').each( function ( i, item ) {
                            var $item = $(item);

                            leq.each(self.optionsDatastore.getAll(),function(itemsChecked){
                                if(value == itemsChecked.cableId()){
                                    itemsChecked[self.options.CHECKED]= false;
                                    itemsChecked[self.options.PRISTINEBODY]= false;
                                    itemsChecked[self.options.PRISTINEGROUP]= false;
                                    itemsChecked[self.options.PRISTINEHEAD]= false;
                                }
                            });

                            if(value == $item.parent().data('model').cableId()){
                                $item.context.checked = false;
                            }
                        });
                }
            },


            _getPristineBodyValue: function (item) {

                var context = leq.data.getContext(item.parent().data('model'),item.parent().data('field')),
                    oldValue = item.context.checked,
                    pristineValue = context.data[context.field] ? [this.options.PRISTINEBODY]: undefined;
                return (pristineValue === undefined) ? oldValue : pristineValue;
            },


            _getPristineHeadValue: function (optionsDatastore,item) {

                var context = item.context.name,
                    oldValueHead = item.context.checked;

                leq.each(optionsDatastore.getAll(),function(itemsChecked){

                    if(itemsChecked._checked){

                        if( !itemsChecked._pristinegroup_ && !itemsChecked._pristinebody_){

                            oldValueHead = itemsChecked._pristinehead_;
                        }
                    }
                });

                return oldValueHead;

            },

            _getPristineGroupValue: function (optionsDatastore, item) {

                var self = this;

                var data =  item.parent().parent().data('group'),

                    value =data.value,
                    oldValueGroup = item.context.checked,
                    contexGroup = item.context.name;
                leq.each(optionsDatastore.getAll(),function(itemsChecked){


                    if(value == itemsChecked.cableId() ){


                        oldValueGroup = itemsChecked._pristinebody_;

                        if(itemsChecked._pristinebody_== false){

                            self.cableChecked = false;
                            self.idCable = itemsChecked.cableId();
                        }
                    }

                });

                if(self.idCable==contexGroup){
                    if (self.cableChecked ==false && oldValueGroup==true){
                        oldValueGroup =false;
                    }
                }
                return oldValueGroup;

            },


            _setPristineBodyValue: function ( item, value ) {

                var context = leq.data.getContext(item.parent().data('model'),item.parent().data('field'));
                context.data[context.field][this.options.PRISTINEBODY] = value;
                item.parent().data('model')[this.options.CHECKED] = item.context.checked;
            },
            _setPristineHeadValue: function ( item, value ) {

                var context = item.context.name ;


                [context][this.options.PRISTINEHEAD] = value;
            },
            _setPristineGroupValue: function ( item, value ) {

                var data =  item.parent().parent().data('group'),
                    field =data.field;
                if( !data){

                    data.items[0][field][this.options.PRISTINEGROUP] = value;
                }
            }

        });

        return GridViewChecbox;
    });

