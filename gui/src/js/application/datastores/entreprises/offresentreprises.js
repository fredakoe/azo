/**
 * Created with JetBrains PhpStorm.
 * User: rquenum
 * Date: 12/10/13
 * Time: 11:13 AM
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'leq',
        'model/offresentreprises/offresentreprisesJson'
    ],
    function ( leq, offreEntreprises ) {
        var offresEntreprisesStore = leq.data.DataStore.create({
            name: 'offre',
            transport: {
                read: {
                   url: leq.settings.getValue('serviceBaseUrl') + "includes/entreprises/liste_offres_entreprises/liste_offre_entreprise.php",
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
                        var offreEntreprisesSend = new offreEntreprises(data);
                        return offreEntreprisesSend ;
                    })
                }
            }
        });
            return offresEntreprisesStore;


    }
);

