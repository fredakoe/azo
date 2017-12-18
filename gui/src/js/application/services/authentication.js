
define(
    [
        'leq'
    ],
    function ( leq ) {
        /**
         * 
         */
        leq.pubsub.subscribe('authentication.signIn', function ( login, password, callback ) {
            var transport = new leq.data.RemoteTransport({
                read: {
                    url: leq.settings.getValue('serviceBaseUrl') + "includes/authentification/login.php",
                    headers: {
                        "Accept": "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    type: "POST"
                }
            });

            transport.read({
                data: leq.json.stringify({
                    "Login": login,
                    "Password": password
                }),

                success: function( data ) {
//>>includeStart("debug", pragmas.debug);
                    if (leq.isEmpty(data)) {
                        throw new Error('Authentication: data is empty!');
                    }
//>>includeEnd("debug");

                    leq.settings.setValue('leqAuthToken', data);
                    if(data.level == 0 || data.level == 2){
                       leq.isFunction(callback) && callback.call(callback, true, data);
                    }
                    else{
                        leq.isFunction(callback) && callback.call(callback, false, data.msg);
                    }
                },
                error: function( data ) {
                    leq.isFunction(callback) && callback.call(callback, false, data ? data.Error : data);
                }
            });
        });

        /**
         *
         */
       /* leq.pubsub.subscribe('authentication.signOut', function ( callback ) {
            var transport = new leq.data.RemoteTransport({
                read: {
                    url: leq.settings.getValue('serviceBaseUrl') + "leq/rest/signout/",
                    headers: {
                        "Accept": "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8",
                        "X-LeqAuthToken": leq.settings.getValue('leqAuthToken')
                    },
                    type: "POST"
                }
            });
            transport.read({
                success: function( data ) {
                    leq.settings.setValue('leqAuthToken', null);

                    leq.isFunction(callback) && callback.call(callback, true);
                },

                error: function( data ) {
                    leq.isFunction(callback) && callback.call(callback, false, data ? data.Error : data);
                }
            });
        });*/
    }
);