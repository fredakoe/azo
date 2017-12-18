
define(
    [
        'jquery',
        'leq',
        'text!module/entreprises/view.tmpl.html',
        'module/entreprises/viewmodel'
    ],
    function ($, leq, template, ViewModel ) {
        var EntreprisesView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#1',
                        template: template,
                        templateId: '#11',
                        viewModel: new ViewModel(),
                        insertionMethod: 'html'
                    };
                leq.extensions.TabView.fn.initialize.call(self, options);

            },
            resize: function ( options ) {
                var self = this,
                    $grids = self.$element.find('.gridview.auto-height .gridview-body-wrap');
                self.resizeElements($grids, options.windowHeight);
            }
        });
        return EntreprisesView;
    }
);