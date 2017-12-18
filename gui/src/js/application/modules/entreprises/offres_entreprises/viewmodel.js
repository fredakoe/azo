
define(
    [
        'jquery',
        'leq',

        'datastore/entreprises/offresentreprises',
        'model/offresentreprises/offresentreprises',
        'model/offres/offre',
        'datastore/idselectfromgridview/idselected',
        'datastore/offres/OffreStore',
        'datastore/iduser'

    ],
    function ( $, leq, offresentreprises, offresentreprisesmodel,offremodel,idselected,OffreStore,iduser) {
        var OffresEntreprisesViewModel = leq.extensions.ViewModel.extend({
              initialize: function ( ) {
                var self = this,
                    dataStore = leq.data.DataStore.create({ data:[], autoFetch:true}),
                    databasesNames= leq.data.observableArray([]);
                    leq.extensions.ViewModel.fn.initialize.call(self);
                    offresentreprises.fetch({
                        data: leq.json.stringify({
                            "id": iduser.last().id
                        }),
                    success: function () {
                                var offreData = [];
                                leq.each(offresentreprises.getAll(), function(offre){
                                    createData(offre.getValue('titre'), offre.getValue('idOffre'), offre.getValue('date'), offre.getValue('statut'));
                                });
                                  dataStore.add(offreData);
                                  function createData(offre, idOffre, date, statut) {
                                    var data = new offresentreprisesmodel();
                                    data.offre(offre);
                                    data.idOffre(idOffre);
                                    data.date(date);
                                    data.statut(statut);
                                    offreData.push(data);
                                }
                    }
                });

                  self.selectedOffre = function ( offredescription ) {
                      self.root.loading(true);
                      self.root.EntrepriseName(offredescription.getValue('entreprise'));
                      self.root.DescriptionOffre(offredescription.getValue('description'));
                      self.root.OffreTitre(offredescription.getValue('offre'));
                      self.root.OffreDateEnd(offredescription.getValue('end'));
                      self.root.OffreStatus(offredescription.getValue('statut'));
                      self.root.DescriptifOfrreDisplay(true);
                  };
        
                    self.offres={
                    offresEntreprisesGridViewAdapter :{
                        className: 'auto-height',
                        dataStore: dataStore,
                        headers: [
                            {text:'Offre<br>',field:'offre',type: leq.STRING,bodySelector:true, editable:false,sortable:true, styles: {'text-align': 'center'}},
                            {text: 'Date de début',field:'date',type: leq.DATE, editable:false , sortable:true, styles: {width:'10%'}},
                            {text: 'Date de fin',field:'end',type: leq.DATE, editable:false , sortable:true, styles: {width:'10%'}},
                            {text: 'Statut',field:'statut',type: leq.STRING, editable:false , sortable:false, styles: {width:'10%'}}
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

                  idselected.on('change',function(){
                      if(idselected.getAll()[0].idOrigin()=='TableOffresEntreprises') {
                          OffreStore.clear();
                          $.ajax({
                              url: leq.settings.getValue('serviceBaseUrl')+'includes/offres/get_info_offre.php/',
                              type: 'POST',
                              data: 'id=' + idselected.last().id(),
                              success: function (data) {
                                  var dataJson = JSON.parse(data),
                                      offredata = new offremodel();
                                  offredata.offre(dataJson.titre);
                                  offredata.entreprise(dataJson.entreprise);
                                  offredata.date(dataJson.date);
                                  offredata.end(dataJson.end);
                                  offredata.statut(dataJson.statut);
                                  offredata.description(dataJson.description);
                                  self.root.JobId(idselected.last().id())
                                  OffreStore.add(offredata);
                                  self.selectedOffre(OffreStore.getAll()[0]);
                              }
                          });

                          $('#DescriptionModal').modal({
                              show: true
                          });
                      }
                  });

                self.root = {
                    loading: leq.data.observable(false),
                    DescriptifOfrreDisplay:leq.data.observable(false),
                    selected: leq.data.observable(),
                    EntrepriseName: leq.data.observable(),
                    DescriptionOffre: leq.data.observable(),
                    OffreTitre:leq.data.observable(),
                    OffreDateEnd:leq.data.observable(),
                    OffreStatus:leq.data.observable(),
                    dataURL:leq.data.observable(),
                    JobId:leq.data.observable(),

                    save: function ( ) {
                        var offreUpdateJson ={
                            titre:self.root.OffreTitre(),
                            dateFin:self.root.OffreDateEnd(),
                            descriptionOffre:self.root.DescriptionOffre(),
                            idOffre:self.root.JobId()
                        }
                        var  dataUpdate = JSON.stringify(offreUpdateJson);
                        $.ajax({
                            url: leq.settings.getValue('serviceBaseUrl')+'includes/offres/update_offre.php',
                            type: 'POST',
                            data:{'offreUpdate': dataUpdate} ,
                            success: function(data){
                            }
                        });
                    },
                    cancelOff:function ( ) {

                        var offreCancelJson ={
                            titre:self.root.OffreTitre(),
                            idOffre:self.root.JobId()
                        }
                        var  dataCancel = JSON.stringify(offreCancelJson);
                        $.ajax({
                            url: leq.settings.getValue('serviceBaseUrl')+'includes/offres/update_offre.php',
                            type: 'POST',
                            data:{'offreCancel': dataCancel} ,
                            success: function(data){
                            }
                        });

                    },

                    deleteOff:function ( ) {

                        var offreDeleteJson ={
                            titre:self.root.OffreTitre(),
                            idOffre:self.root.JobId()
                        }
                        var  dataDelete = JSON.stringify(offreDeleteJson);
                        $.ajax({
                            url: leq.settings.getValue('serviceBaseUrl')+'includes/offres/delete_offre.php',
                            type: 'POST',
                            data:{'offreDelete': dataDelete} ,
                            success: function(data){
                            }
                        });
                    }
                };
        }
    });
        return OffresEntreprisesViewModel;
    }
);