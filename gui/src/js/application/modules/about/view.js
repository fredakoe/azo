
define(
    [
        'leq',
        'text!module/about/view.tmpl.html',
        'module/about/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var AboutView = leq.extensions.TabView.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#c9dd9920-2327-4e44-b541-76b307f3fe2e',
                        template: template,
                        templateId: '#241e9733-213e-4f69-8e64-554768f25208',
                        viewModel: new ViewModel()
                    };

                leq.extensions.TabView.fn.initialize.call(self, options);
            }
        });

        return AboutView;
    }
);