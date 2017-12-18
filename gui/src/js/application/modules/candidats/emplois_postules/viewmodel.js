
    define(
        [
            'jquery',
            'leq',

            'datastore/candidats/emploispostules',
            'datastore/idselectfromgridview/idselected',
            'datastore/offres/OffreStore',
            'datastore/iduser',
            'model/emploispostules/emploispostules',
            'model/offres/offre'

        ],
        function ( $, leq, emploispostules,datastoreidselected,OffreStore,iduser, emploispostulesmodel,offremodel) {
            var EmploisPostulesViewModel = leq.extensions.ViewModel.extend({
               initialize: function ( ) {
                    var self = this,
                        dataStore = leq.data.DataStore.create({ data:[], autoFetch:true});
                        leq.extensions.ViewModel.fn.initialize.call(self);

                   self.selectedOffre = function ( offredescription ) {

                       self.root.EntrepriseName(offredescription.getValue('entreprise'));
                       self.root.DescriptionOffre(offredescription.getValue('description'));
                       self.root.OffreTitre(offredescription.getValue('offre'));
                       self.root.OffreDateEnd(offredescription.getValue('end'));
                       self.root.OffreStatus(offredescription.getValue('statut'))

                   };

                   emploispostules.fetch({
                       data: leq.json.stringify({
                           "id": iduser.last().id
                       }),
                       success: function () {
                           var emploispostulesData = [];
                            leq.each(emploispostules.getAll(), function(emplois){
                                createData(emplois.getValue('titre'), emplois.getValue('entreprise'), emplois.getValue('date'),
                                    emplois.getValue('statut'),  emplois.getValue('idOffre'));
                            });
                            dataStore.add(emploispostulesData);

                            function createData(offre, entreprise, date, statut,id) {
                                var data = new emploispostulesmodel();
                                data.offre(offre);
                                data.entreprise(entreprise);
                                data.date(date);
                                data.statut(statut);
                                data.idOffre(id);
                                emploispostulesData.push(data);
                            }
                       }
                    });
                        self.offres={
                        emploispostulesGridViewAdapter :{
                            className: 'auto-height',
                            dataStore: dataStore,
                            headers: [
                                {text:'Offre<br>',field:'offre',type: leq.STRING,bodySelector:true, editable:false,sortable:true, styles: {'text-align': 'center'}},
                                {text: 'Entreprise',field:'entreprise',type: leq.STRING, editable:false , sortable:true, styles: {width:'10%'}},
                                {text: 'Date',field:'date',type: leq.DATE, editable:false , sortable:true, styles: {width:'10%'}},
                                {text: 'Statut',field:'statut',type: leq.STRING, editable:false , sortable:false, styles: {width:'5%'}}
                            ],
                            //editable: true
                            sortable: true,
                            sort:[
                                {
                                    field: 'date',
                                    order: 'asc'
                                },
                                {
                                    field: 'offre',
                                    order: 'asc'
                                }
                            ],
                            scalable: true,
                            pageable: true,
                            pageSize: 10,
                            scrollable: true,
                            bodySelector:true
                        }
                    };
                   datastoreidselected.on('change',function(){
                       if(datastoreidselected.getAll()[0].idOrigin()=='TableEnmploiPostule') {
                           OffreStore.clear();
                           $.ajax({
                               url: leq.settings.getValue('serviceBaseUrl')+'includes/offres/get_info_offre.php/',
                               type: 'POST',
                               data: 'id=' + datastoreidselected.last().id(),
                               success: function (data) {
                                   var dataJson = JSON.parse(data),
                                       offredata = new offremodel();
                                   offredata.offre(dataJson.titre);
                                   offredata.entreprise(dataJson.entreprise);
                                   offredata.date(dataJson.date);
                                   offredata.end(dataJson.end);
                                   offredata.statut(dataJson.statut);
                                   offredata.description(dataJson.description);
                                   OffreStore.add(offredata);
                                   self.selectedOffre(OffreStore.getAll()[0]);
                               }

                           });

                           $('#DescriptionOffrePostuleModal').modal({
                               show: true
                           })

                       }
                   });
                    self.root = {
                        EntrepriseName: leq.data.observable(),
                        DescriptionOffre: leq.data.observable(),
                        OffreTitre:leq.data.observable(),
                        OffreDateEnd:leq.data.observable(),
                        OffreStatus:leq.data.observable(),
                        dataURL:leq.data.observable(),
                        JobId:leq.data.observable(),

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
            return EmploisPostulesViewModel;
        }
    );