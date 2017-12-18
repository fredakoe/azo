
define(
    [

        'leq',
        'text!module/candidats/profil/view.tmpl.html',
        'module/candidats/profil/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var ProfilView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#212',
                        template: template,
                        templateId: '#2121',
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

        return ProfilView;
    }
);