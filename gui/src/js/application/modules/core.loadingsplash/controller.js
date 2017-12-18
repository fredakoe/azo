
define(
    [
        'leq',
        'mm',
        'module/core.loadingsplash/view',
        'module/core.loadingsplash/splash.manager'
    ],
    function ( leq, mm, View, SplashManager ) {
        mm.register('module/core.loadingsplash', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();

                self.splashManager = new SplashManager();

                leq.pubsub.subscribe('loadingsplash.reset', self, self.splashManager.reset);
                leq.pubsub.subscribe('loadingsplash.step', self, self.splashManager.step);
                leq.pubsub.subscribe('loadingsplash.show', self, self.splashManager.show);
                leq.pubsub.subscribe('loadingsplash.hide', self, self.splashManager.hide);
            },

            destroy: function ( ) {
                var self = this;

                leq.pubsub.unsubscribe('loadingsplash.reset', self.splashManager.reset);
                leq.pubsub.unsubscribe('loadingsplash.step', self.splashManager.step);
                leq.pubsub.unsubscribe('loadingsplash.show', self.splashManager.show);
                leq.pubsub.unsubscribe('loadingsplash.hide', self.splashManager.hide);
            }
        }));
    }
);