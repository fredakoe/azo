
define(
    [
        'leq',
        'text!module/entreprises/ajouter_une_offre/view.tmpl.html',
        'module/entreprises/ajouter_une_offre/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var AjouterOffreView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#114',
                        template: template,
                        templateId: '#1141',
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
        return AjouterOffreView;
    }
);