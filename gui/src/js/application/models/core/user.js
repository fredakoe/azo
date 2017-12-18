
define(
    [
        'leq'
    ],
    function ( leq) {
        var User = leq.data.Model.define({
            fields: {
                'defaultDatabaseConnectionName': {
                    nullable: true,
                    type: leq.STRING,
                    editable: true
                },

                'favoriteNetworks': {
                    nullable: false,
                    type: leq.ARRAY,
                    editable: false
                },
                'studies': {
                    nullable: false,
                    type: leq.ARRAY,
                    editable: false
                }
            },

            save: function ( ) {
                var json = this.toJson();

                if (json) {
                    leq.store.set('user', leq.json.stringify(json));
                }
            },

            load: function ( ) {
                var json = leq.store.get('user');

                if (json) {
                    this.setData(leq.json.parse(json));
                }
            }
        });

        return User;
    }
);