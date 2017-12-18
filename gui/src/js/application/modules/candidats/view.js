
define(
    [
        'jquery',
        'leq',
        'text!module/candidats/view.tmpl.html',
        'module/candidats/viewmodel'
    ],
    function ($, leq, template, ViewModel ) {
        var CandidatsView = leq.extensions.View.extend({
            initialize: function ( ) {      
                var self = this,
                    options = {
                        target: '#2',
                        template: template,
                        templateId: '#21',
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

        return CandidatsView;
    }
);