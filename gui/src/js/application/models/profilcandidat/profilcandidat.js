define(
    [
        'leq'
    ],
    function ( leq ) {
        var ProfileCandidat = leq.data.Model.define({

            fields: {
                'lastname': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'firstname': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'address': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'email': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'telephone': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'login': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'password': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                }
            }
        });

        return ProfileCandidat;
    }
);