
define(
    [
        'leq',
        'mm',
        'module/application/view',
        'datastore/iduser',

        'library/bindings/element',
        'library/bindings/gridview'
    ],
    function ( leq, mm, View,iduser ) {
        mm.register('module/application', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();
                leq.pubsub.publish('connexion', iduser);
                // load the Application
                leq.pubsub.publish('loadingsplash.show');
                leq.pubsub.publish('loadingsplash.reset');
               // leq.pubsub.publish('loadingsplash.step', 30);
                leq.pubsub.publish('modulemanager.loadcontent', '#3');
                leq.pubsub.publish('application.loading');
                //leq.pubsub.publish('loadingsplash.step', 40);
                // slowly fade out the splash screen
                leq.setTimeout(function ( ) {
                    leq.pubsub.publish('application.loaded');
                    leq.pubsub.publish('loadingsplash.hide');
                }, 800);
               leq.pubsub.publish('loadingsplash.step', 30);
            }
        }));
    }
);