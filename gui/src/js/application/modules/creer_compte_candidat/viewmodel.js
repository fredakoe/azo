
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq) {
        var CreerCompteCandidatViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this;
                leq.extensions.ViewModel.fn.initialize.call(self);
                self.CandidatProfil = {

                    CandidatProfil: {
                        FirstNameDefault:"Prénom",
                        FirstName:leq.data.observable(),
                        LastNameDefault:"Nom de famille",
                        LastName:leq.data.observable(),
                        AddressDefault:"Cotonou",
                        Address:leq.data.observable(),
                        EmailDefault:"Adresse E-mail",
                        Email:leq.data.observable(),
                        TelephoneDefault:"21 00 00 00",
                        Telephone:leq.data.observable(),
                        LoginDefault:"Identifiant",
                        Login:leq.data.observable(),
                        PasswordDefault:"Mots de pass",
                        Password:leq.data.observable()
                    }
                };
                self.root = {

                
                    save: function ( ) {
                        var	transportNewCandidat = getTransport('transportNewCandidat',
                            'includes/candidats/ajouter_un_candidat/new_candidat.php','POST');

                        var NewCandidatAjoutJson ={
                            lastname:self.CandidatProfil.CandidatProfil.LastName(),
                            firstname:self.CandidatProfil.CandidatProfil.FirstName(),
                            address:self.CandidatProfil.CandidatProfil.Address(),
                            email:self.CandidatProfil.CandidatProfil.Email(),
                            telephone:self.CandidatProfil.CandidatProfil.Telephone(),
                            login:self.CandidatProfil.CandidatProfil.Login(),
                            password:self.CandidatProfil.CandidatProfil.Password()
                        }
                        var  dataNewCandidat = JSON.stringify(NewCandidatAjoutJson);

                        transportNewCandidat.read({
                            data:dataNewCandidat,
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

        return CreerCompteCandidatViewModel;
    }
);