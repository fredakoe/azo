define(
    [
        'leq'
    ],
    function ( leq ) {
        var ajoutOffre = leq.data.Model.define({
            fields: {
                'entrepriseName': {
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
                    type: leq.DATE,
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
                'descriptionOffre': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'titre': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'dateFin': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                },
                'descriptionEntreprise': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                }
            }
        });

        return ajoutOffre;
    }
);

