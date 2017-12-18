
define(
    [

        'leq',
        'text!module/candidats/cv/view.tmpl.html',
        'module/candidats/cv/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var CVView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#211',
                        template: template,
                        templateId: '#2111',
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
        return CVView;
    }
);