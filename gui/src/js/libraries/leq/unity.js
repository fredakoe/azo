
define(
    [
        'library/leq/core'
    ],
    function ( leq ) {
        var collection = {};

        leq.unity = leq.unity || {};

        leq.extend(leq.unity, {
            lifetimes : {
                'EXTERNALLY_CONTROLLED': 1,
                'CONTAINER_CONTROLLED': 2
            },

            registerInstance: function ( type, instance, lifetime ) {
                if (!leq.has(collection, type)) {
                    collection[type] = {
                        Instanciator: null,
                        lifetime: lifetime || leq.unity.lifetimes.CONTAINER_CONTROLLED,
                        instance: instance
                    };
                }
                else {
                    throw new Error('Object type "' + type + '" is already registered!');
                }

                return this;
            },

            registerType: function ( type, Instanciator, lifetime ) {
                if (!leq.has(collection, type)) {
                    collection[type] = {
                        Instanciator: Instanciator,
                        lifetime: lifetime || leq.unity.lifetimes.CONTAINER_CONTROLLED,
                        instance: null
                    };
                }
                else {
                    throw new Error('Object type "' + type + '" is already registered!');
                }

                return this;
            },

            resolve: function ( type, options ) {
                if (leq.has(collection, type)) {
                    var obj = collection[type],
                        args = options || {};

                    obj.instance = obj.instance || new obj.Instanciator(args);
                    return obj.instance;
                }
                else {
                    throw new Error('Object type "' + type + '" not found!');
                }
            }
        });
    }
);