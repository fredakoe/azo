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
        'model/offres/offreJson'
    ],
    function ( leq, offre ) {
        var offreStore = leq.data.DataStore.create({
            name: 'offre',
            transport: {
                read: {
                   url: leq.settings.getValue('serviceBaseUrl') + "includes/offres/liste_offre.php",
                   headers: {
                        "Accept": "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8",
                        "X-LeqAuthToken": leq.settings.getValue('leqAuthToken')
                    },
                    type: "GET"
                }
            },
            schema: {
                mapping: function ( data ) {
                   data = leq.toArray(data);
                    return leq.map(data, function ( data ) {
                       var offreSend = new offre(data);
                       return offreSend ;
                    });
                }
            }
        });
            return offreStore;
    }
);

