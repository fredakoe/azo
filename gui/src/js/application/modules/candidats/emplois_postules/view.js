
define(
    [
        'leq',
        'text!module/candidats/emplois_postules/view.tmpl.html',
        'module/candidats/emplois_postules/viewmodel'
    ],
    function ( leq, template, ViewModel ) {
        var EmploisPostulesView = leq.extensions.View.extend({
            initialize: function ( ) {
                var self = this,
                    options = {
                        target: '#213',
                        template: template,
                        templateId: '#2131',
                        viewModel: new ViewModel()
                    };

                leq.extensions.TabView.fn.initialize.call(self, options);

//                self.$element.find('a[data-toggle="tab"]').on('shown.bs.tab', function ( ) {
//                    self.triggerResize();
//                });
            },

            resize: function ( options ) {
                var self = this,
                    $grids = self.$element.find('.gridview.auto-height .gridview-body-wrap');

                self.resizeElements($grids, options.windowHeight);
            }
        });

        return EmploisPostulesView;
    }
);