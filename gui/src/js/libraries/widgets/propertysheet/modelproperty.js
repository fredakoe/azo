
define(
    [
        'leq'
    ],
    function ( leq ) {
        var ModelProperty = leq.data.Model.define({
            fields: function ( data ) {
                var self = this;

                self.property = data.property;
                self.value = data.value;

                return {
                    'property': {
                        nullable: false,
                        type: leq.STRING,
                        editable: false
                    },
                    'value': {
                        nullable: true,
                        type: data.type,
                        editable: true
                    }
                };
            }
        });

        return ModelProperty;
    }
);