
define(
    [
        'leq'
    ],
    function ( leq ) {
        var CvCandidat = leq.data.Model.define({
            fields: {
                'url': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'idCand': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                }
            }
        });

        return CvCandidat;
    }
);