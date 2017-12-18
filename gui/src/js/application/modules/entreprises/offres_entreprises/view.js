
define(
    [
        'leq',
        'text!module/entreprises/offres_entreprises/view.tmpl.html',
        'module/entreprises/offres_entreprises/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var OffresEntreprisesView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#113',
                        template: template,
                        templateId: '#1131',
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

        return OffresEntreprisesView;
    }
);