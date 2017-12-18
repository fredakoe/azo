
define(
    [
        'leq',
        'model/candidats/cvCandidat'
    ],
    function ( leq, cvCandidat ) {
        var cvCandStore = leq.data.DataStore.create({
            name: 'offre',
            transport: {
                read: {
                    url: leq.settings.getValue('serviceBaseUrl') + "includes/candidats/cv/cv.php",
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
                        return new cvCandidat(data) ;
                    });
                }
            }
        });
        return cvCandStore;


    }
);

