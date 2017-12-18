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
        'model/candidatures/candidaturesJson'
    ],
    function ( leq, candidatures ) {
        var candidaturesStore = leq.data.DataStore.create({
            name: 'candidaturesStore',
            transport: {
                read: {
                   url: leq.settings.getValue('serviceBaseUrl') + "includes/entreprises/candidatures/liste_candidat_pour_une_offre.php",
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
                           return new candidatures(data) ;
                    });
                }
            }
        });
        return candidaturesStore;


    }
);

