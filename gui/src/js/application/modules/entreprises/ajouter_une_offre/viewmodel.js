
define(
    [
        'jquery',
        'leq',

        'datastore/entreprises/ajoutoffre',
        'datastore/iduser',
        'model/offresentreprises/ajouteroffre',
        'datastore/entreprises/entrepriseinformation'

    ],
    function ( $, leq, ajoutoffre,iduser, ajoutoffremodel,entrepriseinformation) {
        var AjouterOffreViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this,
                    dataAjoutOffre= new ajoutoffremodel();
                //leq.extensions.ViewModel.fn.initialize.call(self);
                var date=  new Date();
                entrepriseinformation.fetch({
                    data: leq.json.stringify({
                        "id": iduser.last().id
                    }),
                    success: function () {
                        self.AjoutOffre.EntrepriseName( entrepriseinformation.last().entreprise()),
                        self.AjoutOffre.Address(entrepriseinformation.last().address()),
                        self.AjoutOffre.Email(entrepriseinformation.last().email()),
                        self.AjoutOffre.SiteWeb(entrepriseinformation.last().siteWeb()),
                        self.AjoutOffre.Telephone(entrepriseinformation.last().telephone()),
                        self.AjoutOffre.DescriptionEntreprise(entrepriseinformation.last().descriptionEntreprise())
                    }
                });
                self.AjoutOffre = {

                    EntrepriseName:leq.data.observable(),
                    Address:leq.data.observable(),
                    Email:leq.data.observable(),
                    SiteWeb:leq.data.observable(),
                    Telephone:leq.data.observable(),
                    TitreDefault:'Titre',
                    Titre:leq.data.observable(),
                    DateFinDefault:date,
                    DateFin:leq.data.observable(),
                    DescriptionOffreDefault:" Donner des informations sur l'offre ",
                    DescriptionOffre:leq.data.observable(),
                    DescriptionEntreprise:leq.data.observable()

                };

                self.root = {
                    ajouter: function ( ) {
                        var transportajoutOffre = getTransport('transportajoutOffre','includes/entreprises/ajouter_une_offre/ajouter_une_offre.php ','POST');

                        dataToOffres(
                            self.AjoutOffre.EntrepriseName(),
                            self.AjoutOffre.Address(),
                            self.AjoutOffre.Email(),
                            self.AjoutOffre.SiteWeb(),
                            self.AjoutOffre.Telephone(),
                            self.AjoutOffre.Titre(),
                            self.AjoutOffre.DateFin(),
                            self.AjoutOffre.DescriptionOffre(),
                            self.AjoutOffre.DescriptionEntreprise()
                        );

                        ajoutoffre.add(dataAjoutOffre);

                        var offreAjoutJson ={
                            entreprise:ajoutoffre.last().entrepriseName(),
                            address:ajoutoffre.last().address(),
                            email:ajoutoffre.last().email(),
                            siteWeb:ajoutoffre.last().siteWeb(),
                            telephone:ajoutoffre.last().telephone(),
                            titre:ajoutoffre.last().titre(),
                            dateFin:ajoutoffre.last().dateFin(),
                            descriptionOffre:ajoutoffre.last().descriptionOffre(),
                            descriptionEntreprise:ajoutoffre.last().descriptionEntreprise()
                        }
                       var  dataleq = JSON.stringify(offreAjoutJson);


                       /* $.ajax({
                            url: 'http://localhost:8080/azo14/includes/entreprises/ajouter_une_offre/ajouter_une_offre.php',
                            type: 'POST',
                            data:{'offre': dataleq} ,
                            success: function(data){
                            }
                        });*/

                        transportajoutOffre.read({

                            data: dataleq,
                            success: function(Data) {

                            }
                        });


                    }
                };

                function getTransport(transport,url,type){
                    transport = new leq.data.RemoteTransport({
                        read: {
                            url: leq.settings.getValue('serviceBaseUrl') + url,
                            headers: {
                                "Accept": "application/json; charset=utf-8",
                                "Content-Type": "application/json",
                                "X-LeqAuthToken": leq.settings.getValue('leqAuthToken')
                            },
                            type: type
                        }
                    });
                    return transport;
                }

                function dataToOffres(EntrepriseName,Address,Email,SiteWeb, Telephone,Titre,DateFin,DescriptionOffre,DescriptionEntreprise ){

                    dataAjoutOffre.entrepriseName(EntrepriseName);
                    dataAjoutOffre.address(Address);
                    dataAjoutOffre.email(Email);
                    dataAjoutOffre.siteWeb(SiteWeb);
                    dataAjoutOffre.telephone(Telephone);
                    dataAjoutOffre.titre(Titre);
                    dataAjoutOffre.dateFin(DateFin);
                    dataAjoutOffre.descriptionOffre(DescriptionOffre);
                    dataAjoutOffre.descriptionEntreprise(DescriptionEntreprise);
                }
            }
    });
        return AjouterOffreViewModel;
    }
);