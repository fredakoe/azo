
define(
    [
        'jquery',
        'leq',
        'mm',
        'module/core.errorsplash/view'
    ],
    function ( $, leq, mm, View ) {
        mm.register('module/core.errorsplash', leq.Class.extend({
            initialize: function ( ) {
                var self = this;

                self.view = new View();
                self.$element = $(self.view.getTemplateId());

                leq.pubsub.subscribe('application.error', self, self.onError);
            },

            destroy: function () {
                var self = this;

                leq.pubsub.unsubscribe('application.error', self, self.onError);
            },

            onError: function ( data ) {
                var self = this;

                // Hide the Splash if necessary
                leq.pubsub.publish('loadingsplash.hide');

                // Hide the Content
                $('#81b763df-8340-482f-82aa-5bbe35c48052').fadeOut('fast');

                // Show the Error view
                self.$element
                    .find('.error-message')
                    .html(data.message);

                self.$element.fadeIn();
            }
        }));
    }
);