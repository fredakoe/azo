
define(
    [
        'jquery',
        'leq',
        'text!module/offres/view.tmpl.html',
        'module/offres/viewmodel'
    ],
    function ($, leq, template, ViewModel ) {
        var OffresView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#3',
                        template: template,
                        templateId: '#31',
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
        return OffresView;
    }
);