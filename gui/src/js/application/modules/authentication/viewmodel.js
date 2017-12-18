
define(
    [
        'leq',
        'mm',
        'json!application/version.json',
        'datastore/iduser'
    ],
    function ( leq, mm, version,iduser ) {
        var AuthenticationViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this;
                leq.extensions.ViewModel.fn.initialize.call(self);
                self.version = version;
                self.layer1 = {
                    id: '14adcf1e-8dff-4d65-8dd0-74bdfc35bac5',

                    email: leq.data.observable(''),
                    password: leq.data.observable(''),
                    error: leq.data.observable(''),
                    isSigningIn: leq.data.observable(false),

                    signin: function ( ) {
                        self.layer1.isSigningIn(true);
                        self.layer1.error('');
                        leq.pubsub.publish('authentication.signIn',
                            leq.data.unwrap(self.layer1.email),
                            leq.data.unwrap(self.layer1.password),
                            function ( result, data ) {

                                if (result) {
                                    leq.pubsub.publish('loadingsplash.show');
                                    iduser.clear();
                                    iduser.add(data);
                                   leq.setTimeout(function ( ) {

                                          require(['module/application'], function ( ) {
                                               mm.start('module/application');
                                           });
                                       /* require(['module/bootstrapper'], function ( ) {
                                            mm.start('module/bootstrapper');
                                        });*/
                                    }, 500);
                                }
                                else {
                                    // Failure
                                    self.layer1.error(data);
                                }
                                self.layer1.isSigningIn(false);
                            }
                        );

                        function ApplyInformationForCandidat(transport, id){
                            transport.read({
                                data: leq.json.stringify({
                                       "id": id
                                }),
                                success: function(data) {

                                },
                                error:function(data)  {

                                }
                            });
                        }
                        function getTransport(transport,url,type){
                            transport = new leq.data.RemoteTransport({
                                read: {
                                    url: leq.settings.getValue('serviceBaseUrl') + url,
                                    headers: {
                                        "Accept": "application/json; charset=utf-8",
                                        "Content-Type": "application/json; charset=utf-8"
                                    },
                                    type: type
                                }
                            });
                            return transport;
                        }
                    }
                };

                self.layer1.canSignIn = leq.data.computed(function ( ) {
                    return !leq.data.unwrap(self.layer1.isSigningIn);
                }, self.layer1);

                self.activeLayer = leq.data.observable(self.layer1.id);

                leq.pubsub.publish('loadingsplash.hide');
            }
        });

        return AuthenticationViewModel;
    }
);