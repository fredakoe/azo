
define(
    [
        'leq'
    ],
    function ( leq ) {
        /**
         *
         */
        leq.pubsub.subscribe('settings.read', function ( callback ) {
            var transport = new leq.data.RemoteTransport({
                read: {
                    url: 'settings.json'
                }
            });

            transport.read({
                success: function ( data ) {

                    leq.settings.setData(data);

                    leq.isFunction(callback) && callback.call(callback, true);
                },
                error: function ( data ) {
                    leq.isFunction(callback) && callback.call(callback, false);
                }
            });
        });
    }
);