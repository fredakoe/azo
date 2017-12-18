
define(
    [
        'leq',
        'text!module/core.loadingsplash/view.tmpl.html',
        'module/core.loadingsplash/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var SplashScreenView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: 'body',
                        template: template,
                        templateId: '#2847d270-930c-4e7c-a061-932184215fd3',
                        viewModel: new ViewModel(),
                        insertionMethod: 'prepend'
                    };

                leq.extensions.View.fn.initialize.call(self, options);
            }
        });

        return SplashScreenView;
    }
);