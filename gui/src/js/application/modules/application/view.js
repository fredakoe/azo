
define(
    [
        'leq',
        'text!module/application/view.tmpl.html',
        'module/application/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var ApplicationView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#81b763df-8340-482f-82aa-5bbe35c48052',
                        template: template,
                        templateId: '#a8058842-d21b-4239-8bfa-b9541e44687b',
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

        return ApplicationView;
    }
);