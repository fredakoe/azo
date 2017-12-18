
define(
    [
        'leq',
        'library/widgets/propertysheet/modelproperty'
    ],
    function ( leq, ModelProperty ) {
        var ModelAsProperties = leq.data.Model.define({
            fields: {
                'properties': {
                    nullable: false,
                    mapping: function ( model ) {
                        return leq.map(model.fields, function ( value, field ) {
                            return new ModelProperty({
                                property: field,
                                value: model[field],
                                type: value.type
                            });
                        });
                    },
                    type: leq.ARRAY,
                    editable: false
                }
            }
        });

        return ModelAsProperties;
    }
);