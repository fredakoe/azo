
define(
    [
        'leq',
        'mm',
        'model/core/settings',
        'model/core/user',
        'datastore/iduser'
    ],
    function ( leq, mm, Settings, User,iduser ) {
        mm.register('module/core.initiator', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                // create instances of Settings and User
                leq.settings = new Settings();
                leq.user = new User();

                // fetch the settings from the server
                leq.pubsub.publish('settings.read', function ( result ) {
                    if (result) {
                       /* require(['module/authentication'], function ( ) {
                            mm.start('module/authentication');
                        });*/
                        var data={level:-1};
                        iduser.clear();
                        iduser.add(data)
                        require(['module/application'], function ( ) {
                            mm.start('module/application');
                        });
                    }
                    else {
                        throw new Error('Could not read settings from server.');
                    }
                });
            }
        }));
    }
);