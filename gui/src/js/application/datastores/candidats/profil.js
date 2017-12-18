define(
    [
        'leq',
        'model/profilcandidat/profilcandidat'
    ],
    function ( leq, profilcandidat ) {
        var entrepriseInformationStore = leq.data.DataStore.create({
            name: 'offre',
            transport: {
                read: {
                   url: leq.settings.getValue('serviceBaseUrl') + "includes/candidats/profil/compte_candidat.php",
                   headers: {
                        "Accept": "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8",
                        "X-LeqAuthToken": leq.settings.getValue('leqAuthToken')
                    },
                    type: "POST"
                }
            },
            schema: {
                mapping: function ( data ) {

                    data = leq.toArray(data);

                    return leq.map(data, function ( data ) {
                        var entrepriseInformationSend = new profilcandidat(data);
                        return entrepriseInformationSend ;
                    })
                }
            }
        });
            return entrepriseInformationStore;
    }
);