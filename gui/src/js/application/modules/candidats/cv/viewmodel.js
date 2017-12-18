
define(
    [
        'jquery',
        'leq',
        'datastore/candidats/cvCandidat',
        'datastore/iduser',
        'model/candidats/cvCandidat'
    ],
    function ( $, leq,cvcandstore, iduser, cvcandmodel) {
        var CVViewModel = leq.extensions.ViewModel.extend({
            initialize: function ( ) {
                var self = this,
                    dataStore = leq.data.DataStore.create({ data:[], autoFetch:true});
                leq.extensions.ViewModel.fn.initialize.call(self);

                cvcandstore.fetch({
                    data: leq.json.stringify({
                        "id": iduser.last().id
                    }),
                    success: function () {
                        var candidaturesData = [];
                        leq.each(cvcandstore.getAll(), function(cvcand){
                            createData( cvcand.getValue('url'),cvcand.getValue('idCand'));
                        });
                        dataStore.add(candidaturesData);
                        function createData( url,idCand) {
                            var data = new cvcandmodel();
                            data.url(url);
                            data.idCand(idCand);
                            candidaturesData.push(data);
                        }
                        self.cvsCandidat.CvCandidat(dataStore.last().url());
                        self.cvsCandidat.CandidatID(dataStore.last().idCand());
                    }
                });
                self.cvsCandidat= {

                    CvCandidatDefault:"CV",
                    CvCandidat:leq.data.observable(),
                    CandidatID:leq.data.observable(),
                    methodType:leq.data.observable("POST"),
                    referenceLink:leq.data.observable(leq.settings.getValue('serviceBaseUrl')+"includes/offres/candidats_cv/add_cv.php?ID="+iduser.last().id),
                    enctype:leq.data.observable("multipart/form-data"),
                    href:leq.data.observable(leq.settings.getValue('serviceBaseUrl')+"includes/offres/candidats_cv/download_cv.php?ID="+iduser.last().id)
                };
                self.root = {
                    save: function ( ) {
                       var transportIdUser= getTransport('transportIdUser','includes/candidats/cv/cv.php','POST');
                        transportIdUser.read({
                            data: leq.json.stringify({
                                "id": iduser.last().id
                            }),
                            success: function (data) {
                               var newCVCandJson = data;
                                self.cvsCandidat.CvCandidat(newCVCandJson.url);
                                self.cvsCandidat.CandidatID(newCVCandJson.idCand)
                            }
                        });
                    }
                };
                function getTransport(transport,url,type){
                    transport = new leq.data.RemoteTransport({
                        read: {
                            url: leq.settings.getValue('serviceBaseUrl') + url,
                            headers: {
                                "Accept": "application/json; charset=utf-8",
                                "Content-Type": "application/json",
                                "X-LeqAuthToken": leq.settings.getValue('leqAuthToken')
                            },
                            type: type
                        }
                    });
                    return transport;
                }
            }
        });
        return CVViewModel;
    }
);