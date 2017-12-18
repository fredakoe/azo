define(
    [
        'leq',
        'model/entrepriseinformation/entrepriseinformation'
    ],
    function ( leq, entrepriseinformation ) {
        var entrepriseInformationStore = leq.data.DataStore.create({
            name: 'offre',
            transport: {
                read: {
                   url: leq.settings.getValue('serviceBaseUrl') + "includes/entreprises/informations/compte_entreprise.php",
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
                        var entrepriseInformationSend = new entrepriseinformation(data);
                        return entrepriseInformationSend ;
                    })
                }
            }
        });
            return entrepriseInformationStore;
    }
);