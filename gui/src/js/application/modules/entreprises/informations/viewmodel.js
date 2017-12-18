
define(
    [
        'jquery',
        'leq',
        //'nodvalidator',
        'datastore/iduser',
        'datastore/entreprises/entrepriseinformation'

    ],
    function ( $, leq, iduser,entrepriseinformation) {
        var InformationsViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this;
                entrepriseinformation.fetch({
                    data: leq.json.stringify({
                        "id": iduser.last().id
                    }),
                    success: function () {
                        self.Information.EntrepriseName( entrepriseinformation.last().entreprise()),
                        self.Information.Address(entrepriseinformation.last().address()),
                        self.Information.Email(entrepriseinformation.last().email()),
                        self.Information.SiteWeb(entrepriseinformation.last().siteWeb()),
                        self.Information.Telephone(entrepriseinformation.last().telephone()),
                        self.Information.Login(entrepriseinformation.last().login()),
                        self.Information.Password(entrepriseinformation.last().password())
                        self.Information.DescriptionEntreprise(entrepriseinformation.last().descriptionEntreprise())
                    }
                });

                leq.extensions.ViewModel.fn.initialize.call(self);
                self.Information = {
                    EntrepriseName:leq.data.observable(),
                    Address:leq.data.observable(),
                    Email:leq.data.observable(),
                    SiteWeb:leq.data.observable(),
                    Telephone:leq.data.observable(),
                    Login:leq.data.observable(),
                    Password:leq.data.observable(),
                    DescriptionEntreprise:leq.data.observable()

                };

               /* transportEntrepriseInfo.read({

                    data: leq.json.stringify({
                        "id": iduser.last().id
                    }),
                    success: function(Data) {
                        self.AjoutOffre.AjoutOffre.EntrepriseName(),
                        self.AjoutOffre.AjoutOffre.Address(),
                        self.AjoutOffre.AjoutOffre.Email(),
                        self.AjoutOffre.AjoutOffre.SiteWeb(),
                        self.AjoutOffre.AjoutOffre.Telephone(),
                        self.AjoutOffre.AjoutOffre.Titre(),
                        self.AjoutOffre.AjoutOffre.DateFin(),
                        self.AjoutOffre.AjoutOffre.DescriptionOffre(),
                        self.AjoutOffre.AjoutOffre.DescriptionEntreprise()

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
                self.root = {
                    save: function ( ) {


                    }
                };
            }
        });

        return InformationsViewModel;
    }
);