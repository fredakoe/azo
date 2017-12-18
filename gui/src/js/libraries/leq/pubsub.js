
define(
    [
        'library/leq/base',
        'amplify'
    ],
    function ( leq, amplify ) {
        leq.pubsub = leq.pubsub || {};

        leq.extend(leq.pubsub, {
            /**
             * string topic, function callback
             * string topic, object context, function callback
             * string topic, function callback, number priority
             * string topic, object context, function callback, number priority
             */
            subscribe: amplify.subscribe,

            /**
             * string topic, function callback
             */
            unsubscribe: amplify.unsubscribe,

            /**
             * string topic, ...
             */
            publish: amplify.publish
        });
    }
);