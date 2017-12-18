

define(
    [
        'leq'
    ],
    function ( leq ) {
        var IdSelected = leq.data.Model.define({
            fields: {
                'id': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'idOrigin': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                }
            }
        });
        return IdSelected;
    }
);