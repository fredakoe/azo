
define(
    [
        'leq',
        'text!module/core.errorsplash/view.tmpl.html',
        'module/core.errorsplash/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var ErrorView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: 'body',
                        template: template,
                        templateId: '#1c129182-45c6-4f54-b29d-58936d817004',
                        viewModel: new ViewModel(),
                        insertionMethod: 'prepend'
                    };

                leq.extensions.View.fn.initialize.call(self, options);
            }
        });

        return ErrorView;
    }
);