
define(
    [

        'leq',
        'text!module/entreprises/informations/view.tmpl.html',
        'module/entreprises/informations/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var InformationsView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#112',
                        template: template,
                        templateId: '#1121',
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

        return InformationsView;
    }
);