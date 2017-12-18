
define(
    [
        'jquery',
        'leq'
        //'nodvalidator',
    ],
    function ( $, leq) {
        var CreerCompteEntrepriseViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this;


                leq.extensions.ViewModel.fn.initialize.call(self);
                self.Information = {
                        EntrepriseNameDefault:'Entreprise',
                        EntrepriseName:leq.data.observable(),
                        AddressDefault:'Cotonou',
                        Address:leq.data.observable(),
                        EmailDefault:'Email',
                        Email:leq.data.observable(),
                        SiteWebDefault:'Site web',
                        SiteWeb:leq.data.observable(),
                        TelephoneDefault:'Numéro de téléphone',
                        Telephone:leq.data.observable(),
                        LoginDefault:'Login',
                        Login:leq.data.observable(),
                        PasswordDefault:'Mot de pass',
                        Password:leq.data.observable(),
                        DescriptionEntrepriseDefault:'Description de l\'entreprise',
                        DescriptionEntreprise:leq.data.observable()

                };


                self.root = {
                    save: function ( ) {
                        var	transportNewEntreprise = getTransport('transportNewEntreprise',
                            'includes/entreprises/ajouter_une_entreprise/new_entreprise.php','POST');
                        var NewEntrepriseAjoutJson ={
                            entreprise:self.Information.EntrepriseName(),
                            address:self.Information.Address(),
                            email:self.Information.Email(),
                            siteWeb:self.Information.SiteWeb(),
                            telephone:self.Information.Telephone(),
                            login:self.Information.Login(),
                            password:self.Information.Password(),
                            descriptionEntreprise:self.Information.DescriptionEntreprise()
                        }
                        var  dataNewEntreprise = JSON.stringify(NewEntrepriseAjoutJson);

                        transportNewEntreprise.read({
                            data:dataNewEntreprise,
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
            }
        });

        return CreerCompteEntrepriseViewModel;
    }
);