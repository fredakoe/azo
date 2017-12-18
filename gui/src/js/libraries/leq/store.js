
define(
    [
        'library/leq/base',
        'amplify'
    ],
    function ( leq, amplify ) {
        leq.store = leq.store || {};

        leq.extend(leq.store, {
            get: function ( key ) {
                return amplify.store.call(amplify, key);
            },

            set: function ( key, value ) {
                return amplify.store.call(amplify, key, value);
            }
        });
    }
);