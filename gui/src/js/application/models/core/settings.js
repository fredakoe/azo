
define(
    [
        'leq',
        'model/databases/database'
    ],
    function ( leq, Database ) {
        var Settings = leq.data.Model.define({
            fields: {
                'activeDatabaseConnection': {
                    nullable: true,
                    type: leq.OBJECT,
                    editable: true,
                    model: Database
                },
                'leqAuthToken': {
                    nullable: false,
                    type: leq.STRING,
                    editable: true
                },
                'serviceBaseUrl': {
                    nullable: false,
                    type: leq.STRING,
                    editable: false
                }
            }
        });

        return Settings;
    }
);