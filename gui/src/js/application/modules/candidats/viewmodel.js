
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq) {

        var CandidatsViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this,
                    networkIdData =[],
                    dataStore = leq.data.DataStore.create({ data: [],autoFetch:true}),
                    databasesNames= leq.data.observableArray([]);
               // leq.extensions.ViewModel.fn.initialize.call(self);
					self.datas={
                    datasGridViewAdapter :{
                        className: 'auto-height',
                        dataStore: dataStore,
                        headers: [
                            {text: '',field:'cableId', editable:false , sortable:false, styles: {width:'3%'}},
                            {text:'Network ID <br>',field:'networkId',type: leq.ARRAY, editable:true,sortable:false, values: networkIdData, styles: {'text-align': 'center'}}
                        ],
                        editable: true,
                        sortable: true,
                        sort:[
                            {
                                field: 'cableSet',
                                order: 'asc'
                            },
                            {
                                field: 'cableId',
                                order: 'asc'
                            },
                            {
                                field: 'cablesSets',
                                order: 'asc'
                            }
                        ],
                        scalable: true,
                        checkbox: true,
                        headerSelector: true,
                        pageable: true,
                        pageSize: 240,
                       // scrollable: true,
                        group: { field: 'cableId'},
                        templates: {
                            0: leq.template(

                                    '<input class = "body-checkbox" type="checkbox" >')
                        }
                    }
                };
                self.root = {

					simulate: function ( ) {
					},
                    cancel: function ( ) {
                    },
                    save: function ( ) {
                    },
                    reset: function ( ) {

                    }
                };
        }
    });
        return CandidatsViewModel;
});