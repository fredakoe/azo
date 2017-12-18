
define(
    [

        'leq',
        'text!module/creer_compte_entreprise/view.tmpl.html',
        'module/creer_compte_entreprise/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var CreerCompteEntrepriseView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#123456789',
                        template: template,
                        templateId: '#1234567891',
                        viewModel: new ViewModel(),
                        insertionMethod: 'html'
                    };
                leq.extensions.View.fn.initialize.call(self, options);

            },

            resize: function ( options ) {
                var self = this;
                // Resize all child tab-content divs
                self.$element
                    .find('.tab-content.auto-height')
                    .css('min-height', (options.windowHeight - options.totalOffset))
                    .css('padding-bottom', '4px');
            }
        });

        return CreerCompteEntrepriseView;
    }
);