
define(
    [
        'jquery',
        'leq',
        'datastore/iduser',
        'datastore/candidats/profil'
    ],
    function ( $, leq, iduser,profil) {
        var ProfilViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this;

                profil.fetch({

                    data: leq.json.stringify({
                        "id": iduser.last().id
                    }),

                    success: function () {
                        self.CandidatProfil.LastName(profil.last().lastname()),
                        self.CandidatProfil.FirstName( profil.last().firstname()),
                        self.CandidatProfil.Address(profil.last().address()),
                        self.CandidatProfil.Email(profil.last().email()),
                        self.CandidatProfil.Telephone(profil.last().telephone()),
                        self.CandidatProfil.Login(profil.last().login()),
                        self.CandidatProfil.Password(profil.last().password())
                    }
                });
                leq.extensions.ViewModel.fn.initialize.call(self);
                self.CandidatProfil = {

                    FirstName:leq.data.observable(),
                    LastName:leq.data.observable(),
                    Address:leq.data.observable(),
                    Email:leq.data.observable(),
                    Telephone:leq.data.observable(),
                    Login:leq.data.observable(),
                    Password:leq.data.observable()
                };
                self.root = {
                    save: function ( ) {
                    }
                };
            }
        });

        return ProfilViewModel;
    }
);