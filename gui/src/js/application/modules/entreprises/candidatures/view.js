
define(
    [
        'leq',
        'text!module/entreprises/candidatures/view.tmpl.html',
        'module/entreprises/candidatures/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var CandidaturesView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#111',
                        template: template,
                        templateId: '#1111',
                        viewModel: new ViewModel()
                    };
                leq.extensions.TabView.fn.initialize.call(self, options);
            },

            resize: function ( options ) {
                var self = this,
                    $grids = self.$element.find('.gridview.auto-height .gridview-body-wrap');
                self.resizeElements($grids, options.windowHeight);
            }
        });

        return CandidaturesView;
    }
);