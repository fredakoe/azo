
define(
    [
        'leq',
        'text!module/authentication/view.tmpl.html',
        'module/authentication/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var AuthenticationView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#12345',
                        template: template,
                        templateId: '#239a3167-d88f-43fb-943b-596b6a028270',
                        viewModel: new ViewModel()
                    };
                leq.extensions.View.fn.initialize.call(self, options);
            }
        });

        return AuthenticationView;
    }
);