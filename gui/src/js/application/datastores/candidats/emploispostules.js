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
        'model/emploispostules/emploispostulesJson'
    ],
    function ( leq, emploispostules ) {
        var emploisPostulesStore = leq.data.DataStore.create({
            name: 'Emploispostules',
            transport: {
                read: {
                   url: leq.settings.getValue('serviceBaseUrl') + "includes/candidats/emplois_postules/candidat_liste_offre_postule.php",
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
                           return new emploispostules(data) ;
                    });
                }
            }
        });
            return emploisPostulesStore;


    }
);

