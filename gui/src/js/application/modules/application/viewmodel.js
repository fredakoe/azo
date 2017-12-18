
    define(
        [
            'jquery',
            'leq',
            'mm'


        ],
        function ( $, leq, mm) {
            var ApplicationViewModel = leq.extensions.ViewModel.extend({
                initialize: function ( ) {
                    var self = this;

                    leq.extensions.ViewModel.fn.initialize.call(self);
                    self.alerts = leq.data.observable(0);
                    self.reports = leq.data.observable(0);
                    self.candidats = leq.data.observable();
                    self.entreprises = leq.data.observable();
                    self.connecter = leq.data.observable();
                    self.deconnecter = leq.data.observable();

                    leq.pubsub.subscribe('connexion', function ( connect ) {

                        if(connect.last().level == -1){
                            self.entreprises("btn btn-default disabled");
                            self.candidats("btn btn-default disabled");
                            self.connecter("btn btn-default")
                            self.deconnecter("btn btn-default disabled")
                        }
                      else  if(connect.last().level == 0){
                            self.entreprises("btn btn-default disabled");
                            self.candidats("btn btn-default");
                            self.connecter("btn btn-default disabled")
                            self.deconnecter("btn btn-default")
                        }
                        else if(connect.last().level == 2){

                            self.candidats("btn btn-default  disabled");
                            self.entreprises("btn btn-default");
                            self.connecter("btn btn-default  disabled")
                            self.deconnecter("btn btn-default")
                        }
                    });
                    leq.pubsub.subscribe('application.tabclicked', function ( moduleName ) {
                        if (/report/.test(moduleName)) {
                            self.reports(0);
                        }
                        if (/dashboard/.test(moduleName)) {
                            self.alerts(0);
                        }
                    });
                    self.signOut = function ( ) {

                    };
                    self.sign = function ( ) {

                    };
                }
            });
            return ApplicationViewModel;
        }
    );