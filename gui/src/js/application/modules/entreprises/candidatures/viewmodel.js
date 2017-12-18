
define(
    [
        'jquery',
        'leq',

        'datastore/entreprises/candidatures',
        'model/candidatures/candidatures',
        'datastore/idselectfromgridview/idselected',
        'datastore/offres/OffreStore',
        'datastore/iduser',
        'model/offres/offre'

    ],
    function ( $, leq, candidatures, candidaturesmodel,datastoreidselected,OffreStore, iduser,offremodel) {
        var CandidaturesViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this,
                    dataStore = leq.data.DataStore.create({ data:[], autoFetch:true});
                    leq.extensions.ViewModel.fn.initialize.call(self);
                    candidatures.fetch({
                        data: leq.json.stringify({
                            "id": iduser.last().id
                        }),

                        success: function () {
                    
                            var candidaturesData = [];
                            leq.each(candidatures.getAll(), function(candidatures){
                                createData(candidatures.getValue('titre'), candidatures.getValue('nom'),
                                    candidatures.getValue('prenom'), candidatures.getValue('url'),
                                    candidatures.getValue('description'),candidatures.getValue('idOffre'),candidatures.getValue('idCand'));
                            });

                            dataStore.add(candidaturesData);
                            function createData(offre, nom, prenom, url,desciption,id,idCand) {

                                var data = new candidaturesmodel();
                                data.offre(offre);
                                data.description(desciption);
                                data.nom(nom);
                                data.prenom(prenom);
                                data.url(url);
                                data.idOffre(id);
                                data.idCand(idCand);

                                candidaturesData.push(data);
                            }
                        }
                });
                self.selectedOffre = function ( offredescription ) {

                    self.root.EntrepriseName(offredescription.getValue('entreprise'));
                    self.root.DescriptionOffre(offredescription.getValue('description'));
                    self.root.OffreTitre(offredescription.getValue('offre'));
                    self.root.OffreDateEnd(offredescription.getValue('end'));
                    self.root.OffreStatus(offredescription.getValue('statut'));
                };
                    self.offres={
                    candidaturesGridViewAdapter :{
                        className: 'auto-height',
                        dataStore: dataStore,
                        headers: [
                            {text:'Offre<br>',field:'offre',type: leq.STRING,  editable:false,sortable:true, styles: {'text-align': 'center'}},
                            {text: 'Description',field:'desciption',type: leq.STRING, editable:false , sortable:true, styles: {width:'10%'}},
                            {text: 'Nom',field:'nom',type: leq.STRING, editable:false , sortable:false, styles: {width:'10%'}},
                            {text: 'Prenom',field:'prenom',type: leq.STRING, editable:false , sortable:false, styles: {width:'10%'}},
                            {text: 'CV',field:'url',type: leq.STRING, editable:false ,bodySelector:true, sortable:false, styles: {width:'30%'}},
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
                        group: { field: 'offre'},
                        bodySelector:true
                    }
                };

                datastoreidselected.on('change',function(){

                 if(datastoreidselected.getAll()[0].idOrigin()=='TableEntrepriseCandidature') {
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

                     $('#DescriptionCandidatureModal').modal({
                         show: true
                     })
                    }
                   // if(datastoreidselected.getAll()[0].idCand()!=0){

                       /* $.ajax({
                            url: 'http://localhost:8080/azo14/includes/offres/candidats_cv/download_cv.php',
                            type: 'GET',
                            data: 'idCand='+ datastoreidselected.getAll()[0].idCand(),
                            success: function(){
                            }
                        });*/
                   // }
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
        return CandidaturesViewModel;
    }
);