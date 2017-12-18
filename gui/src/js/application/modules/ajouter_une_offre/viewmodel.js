
define(
    [
        'jquery',
        'leq',

        'datastore/entreprises/ajoutoffre',
        'model/offresentreprises/ajouteroffre'

    ],
    function ( $, leq, ajoutoffre, ajoutoffremodel) {
        var AjouterOffreViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this,
                    dataAjoutOffre= new ajoutoffremodel();
                //leq.extensions.ViewModel.fn.initialize.call(self);
                var date=  new Date();
                self.AjoutOffre = {
                    AjoutOffre: {

                        EntrepriseNameDefault:"Nom de l'entreprise",
                        EntrepriseName:leq.data.observable(),
                        AddressDefault:"Cotonou",
                        Address:leq.data.observable(),
                        EmailDefault:"Adresse E-mail",
                        Email:leq.data.observable(),
                        SiteWebDefault:"Site web de l'entreprise",
                        SiteWeb:leq.data.observable(),
                        TelephoneDefault:"21 00 00 00",
                        Telephone:leq.data.observable(),
                        TitreDefault:'Titre',
                        Titre:leq.data.observable(),
                        DateFinDefault:date,
                        DateFin:leq.data.observable(),
                        DescriptionOffreDefault:" Donner des informations sur l'offre ",
                        DescriptionOffre:leq.data.observable(),
                        DescriptionEntrepriseDefault:"Donner des informations sur l'entreprise",
                        DescriptionEntreprise:leq.data.observable()
                    }
                };

                self.root = {
                    ajouter: function ( ) {
                        var transportajoutOffre = getTransport('transportajoutOffre','includes/entreprises/ajouter_une_offre/ajouter_une_offre.php ','POST');

                        dataToOffres(
                            self.AjoutOffre.AjoutOffre.EntrepriseName(),
                            self.AjoutOffre.AjoutOffre.Address(),
                            self.AjoutOffre.AjoutOffre.Email(),
                            self.AjoutOffre.AjoutOffre.SiteWeb(),
                            self.AjoutOffre.AjoutOffre.Telephone(),
                            self.AjoutOffre.AjoutOffre.Titre(),
                            self.AjoutOffre.AjoutOffre.DateFin(),
                            self.AjoutOffre.AjoutOffre.DescriptionOffre(),
                            self.AjoutOffre.AjoutOffre.DescriptionEntreprise()
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
                        $.ajax({
                            url:leq.settings.getValue('serviceBaseUrl')+ 'includes/entreprises/ajouter_une_offre/ajouter_une_offre.php',
                            type: 'POST',
                            data:{'offre': dataleq} ,
                            success: function(data){
                            }
                        });

                      /*  transportajoutOffre.read({

                            data: 'dataleq='+ajoutoffre.first().entrepriseName(),
                                //leq.json.stringify({"offre":ajoutoffre.first()}),
                            success: function(Data) {

                            }
                        });*/

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
                    }
                };
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