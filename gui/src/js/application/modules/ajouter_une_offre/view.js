
define(
    [
        'leq',
        'text!module/ajouter_une_offre/view.tmpl.html',
        'module/ajouter_une_offre/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var AjouterOffreView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#1234',
                        template: template,
                        templateId: '#12341',
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