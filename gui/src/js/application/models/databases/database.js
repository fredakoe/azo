
define(
    [
        'leq'
    ],
    function ( leq ) {
        var Database = leq.data.Model.define({
            fields: {
                'name': {
                    nullable: false,
                    mapping: 'Name',
                    type: leq.STRING,
                    editable: false
                },
                'connected': {
                    nullable: false,
                    type: leq.BOOLEAN,
                    editable: true
                },
                'asDefault': {
                    nullable: false,
                    type: leq.BOOLEAN,
                    editable: true
                }
            }




        });


        /**
         * helper function to convert type string to int
         * @param type
         * @return {Number}
         */
        function convertTypeToValue ( type ) {
            switch (type) {
                case "Oracle":
                    return 1;

                case "Access":
                    return 2;

                case "Xml":
                    return 3;

                case "Sql":
                    return 4;

                default:    // "None"
                    return 0;
            }
        }

        return Database;
    }
);