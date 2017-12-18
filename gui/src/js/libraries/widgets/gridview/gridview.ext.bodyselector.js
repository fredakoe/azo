
define(
    [
        'jquery',
        'leq'
    ],
    function ( $, leq) {

        var GridViewBodySelector = leq.ui.Widget.extend({

            initialize: function ( element, options,idselected,datastoreidselected) {
                var self = this;

                leq.ui.Widget.fn.initialize.call(self, element, options);

                self.dataStore = self.options.dataStore;
                self.Send = idselected;
                self.Id = datastoreidselected;
                self.$gridHeader = self.$element.find('.gridview-header-wrap');
                self.$gridBody   = self.$element.find('.gridview-body-wrap');
                self.templates = {
                    'idOff': leq.template(self.options.template.idOff),
                    'url': leq.template(self.options.template.url)
                }
                self.dataStore.on('change', leq.proxy(self.refresh, self));
                self.$element.on('click.body.gridview','a.body-linkOffre', leq.proxy(self.sendIdOffre, self));
                self.$element.on('click.body.gridview','a.body-linkCV', leq.proxy(self.sendIdCV, self));
            },
            options: {
                dataStore: {},
                headers: [],
                template:{
                    idOff:'<a href="#" class="body-linkOffre"><%= Offre %></a>',
                    url:'<a href="http://localhost:8080/azo14/includes/offres/candidats_cv/download_cv.php?ID=<%=ID%>" class="body-linkCV"><%= Download %></a>'
                }
            },
            refresh: function ( ) {
                var self = this;
                self.$gridBody.find('.gridview-body-item').each( function ( i, item ) {
                    var $item = $(item),
                        field = $item.data('field'),
                        model = $item.data('model');
                    if(field == 'offre'){
                        $item.empty();
                        $item.append( self.templates.idOff({
                            Offre: model['offre']()
                        }));
                    }
                    if(field == 'url'){
                        $item.empty();
                        $item.append( self.templates.url({
                                Download: model['url'](),
                                ID: model['idCand']()
                        }
                        ));
                    }
                });
            },
            sendIdOffre: function(e){
                var self = this,
                    $target = $(e.target).closest('.gridview-body-item'),
                    model = $target.data('model'),
                    field = $target.data('field');
                leq.console.log('$element.parent',self.$element.parent()[0].id)

                if(field == 'offre'){

                    self.SendNew=  new self.Send();
                    self.SendNew.id(model['idOffre']());
                    self.SendNew.idOrigin(self.$element.parent()[0].id);
                    self.Id.add(self.SendNew);
                }
            },
            sendIdCV: function(e){
               /* var self = this,
                    $target = $(e.target).closest('.gridview-body-item'),
                    model = $target.data('model'),
                    field = $target.data('field');
                if(field == 'url'){
                    self.Send.id(model['idCand']());
                    self.Send.idOrigin(self.$element.parent()[0].id);
                    self.Id.add(self.Send);
                }*/
            }
        });

        return GridViewBodySelector;
    }
);

