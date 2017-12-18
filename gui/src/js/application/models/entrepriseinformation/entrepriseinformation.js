define(
    [
        'leq'
    ],
    function ( leq ) {
        var EntrepriseInformation = leq.data.Model.define({

            fields: {
                'entreprise': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'address': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'descriptionEntreprise': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'email': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'siteWeb': {
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


        return EntrepriseInformation;
    }
);