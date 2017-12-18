
define(
	[
		'jquery',
		'leq',

		'datastore/offres/offres',
		'datastore/offres/offreDescription',
		'model/offres/offre',
		'model/idselectfromgridview/idselected',
		'datastore/idselectfromgridview/idselected',
		'datastore/offres/OffreStore',
		'datastore/iduser',
		'datastore/candidats/profil'
	],
	function ( $, leq,offres, offredescription, offremodel, idselected,
			   datastoreidselected, OffreStore,iduser,profil) {

		var OffresViewModel = leq.extensions.ViewModel.extend({
			initialize: function ( ) {
				var self = this,
				    offresList = leq.data.observableArray([]),
					dataStore  = leq.data.DataStore.create({data:[], autoFetch:true});
				leq.extensions.ViewModel.fn.initialize.call(self);

				var num=0;
				self.getContrastColor = function ( color ) {
					return leq.media.getContrastYIQ(leq.data.unwrap(color));
				};

				self.selectedOffre = function ( offredescription ) {
					self.layer2.loading(true);
					self.layer2.EntrepriseName(offredescription.getValue('entreprise'));
					self.layer2.DescriptionOffre(offredescription.getValue('description'));
					self.layer2.OffreTitre(offredescription.getValue('offre'));
					self.layer2.OffreDateEnd(offredescription.getValue('end'));
					self.layer2.OffreStatus(offredescription.getValue('statut'));
					self.layer2.JobId(offredescription.getValue('idOffre'));
					self.layer2.DescriptifOfrreDisplay(true);

				};

				offres.fetch({

					success: function () {
						var offreData=[];

						leq.each(offres.getAll(), function(offre){
							offresList.push(offre);
							createData(offre.getValue('titre'), offre.getValue('entreprise'),
								offre.getValue('date'),offre.getValue('end'),
								offre.getValue('statut'),offre.getValue('idOffre'));
						});
						dataStore.add(offreData);
						function createData(offre, entreprise, date,end, statut,id) {
							var data = new offremodel();
							data.offre(offre);
							data.entreprise(entreprise);
							data.date(date);
							data.end(end);
							data.statut(statut);
							data.idOffre(id);
							offreData.push(data);
						}
					}
				});

				self.layer1 = {
					id: '311',
					offresGridViewAdapter :{
						className: 'auto-height',
						dataStore: dataStore,
						headers: [
							{text: 'Entreprise',field:'entreprise',type: leq.STRING, editable:false , sortable:true,selectable: true, styles: {width:'20%','text-align': 'center'}},
							{text: 'Offre',field:'offre',type: leq.STRING, editable:false,sortable:true,bodySelector:true, selectable: true, styles: {'text-align': 'center'}},
							{text: 'Date',field:'date',type: leq.DATE, editable:false , sortable:true,  styles: {width:'10%','text-align': 'center'}},
							{text: 'Fin',field:'end',type: leq.DATE, editable:false , sortable:true, styles: {width:'10%','text-align': 'center'}},
							{text: 'Statut',field:'statut',type: leq.STRING, editable:false, sortable:false, styles: {width:'10%','text-align': 'center'}}
						],
						editable: true,
						sortable: true,
						sort:[
							{
								field: 'date',
								order: 'asc'
							},
							{
								field: 'date',
								order: 'asc'
							}
						],
						selectable: true,
						scalable: true,
						pageable: true,
						pageSize: 10,
						scrollable: true,
						bodySelector:true
					},
					showDetails: function () {
						self.layer2.selected(true);

						if(iduser.last().id){
							profil.fetch({
								data: leq.json.stringify({
									"id": iduser.last().id
								}),
								success: function () {
									self.layer2.LastName(profil.last().lastname());
									self.layer2.FirstName( profil.last().firstname());
									self.layer2.Email(profil.last().email());
									self.layer2.Telephone(profil.last().telephone());
									self.layer2.OldCv(true);
								}
							});
						}else{
							self.layer2.LastNameDefault('Nom');
							self.layer2.FirstNameDefault('Prénom');
							self.layer2.EmailDefault('Adresse E-mail');
							self.layer2.TelephoneDefault('Téléphone');
							self.layer2.OldCv(false);
						}
						self.activeLayer(self.layer2.id);
					}
				};
				datastoreidselected.on('change',function(){

					leq.console.log('num',num)

					if(datastoreidselected.last().idOrigin()=='TableOffres') {
						OffreStore.clear();
						self.layer1.showDetails();

						leq.pubsub.subscribe('typeUser', function ( typeUser ) {
							leq.console.log('typeUser',typeUser)
							num=typeUser;
							self.layer2.ViewPostul(true);
						});

						$.ajax({
							url: leq.settings.getValue('serviceBaseUrl')+'includes/offres/get_info_offre.php/',
							type: 'POST',
							data: 'id=' + datastoreidselected.last().id(),
							success: function (data) {
								var dataJson = JSON.parse(data),
									offredata = new offremodel();
								offredata.offre(dataJson.titre);
								offredata.entreprise(dataJson.entreprise);
								offredata.date(dataJson.date);
								offredata.end(dataJson.end);
								offredata.statut(dataJson.statut);
								offredata.description(dataJson.description);
								offredata.idOffre(dataJson.id);
								OffreStore.add(offredata);
								self.selectedOffre(OffreStore.last());
							}
						});
					}
				});
				self.layer2 = {
					id: '312',
					loading: leq.data.observable(false),
					DescriptifOfrreDisplay:leq.data.observable(false),
					selected: leq.data.observable(),
					EntrepriseName: leq.data.observable(),
					DescriptionOffre: leq.data.observable(),
					OffreTitre:leq.data.observable(),
					OffreDateEnd:leq.data.observable(),
					OffreStatus:leq.data.observable(),
					dataURL:leq.data.observable(),
					JobId:leq.data.observable(),
					OldCv:leq.data.observable(),
					ViewPostul:leq.data.observable(),

					goBack: function ( ) {
						self.activeLayer(self.layer1.id);
					},
					fileData:leq.data.observable(),
					spFile:  leq.data.observable(""),
					spFileObjectURL:  leq.data.observable(),
					spFileBinary:leq.data.observable(),
					spFileFormatData:leq.data.observable(),

					methodType:leq.data.observable("POST"),
					referenceLink:leq.data.observable(leq.settings.getValue('serviceBaseUrl')+"includes/offres/candidats_cv/add_cv.php?ID="+iduser.last().id),
					enctype:leq.data.observable("multipart/form-data"),
					href:leq.data.observable(leq.settings.getValue('serviceBaseUrl')+"includes/offres/candidats_cv/download_cv.php?ID="+iduser.last().id),

					FirstNameDefault:leq.data.observable(),
					FirstName:leq.data.observable(),
					LastNameDefault:leq.data.observable(),
					LastName:leq.data.observable(),
					EmailDefault:leq.data.observable(),
					Email:leq.data.observable(),
					TelephoneDefault:leq.data.observable(),
					Telephone:leq.data.observable(),

					sendFile: function(){
						var  transportaPostuler = getTransport('transportaPostuler','includes/offres/postuler.php','POST'),
							 offreAjoutJson ={
								entreprise:self.layer2.EntrepriseName(),
								email:self.layer2.Email(),
								telephone:self.layer2.Telephone(),
								firstName:self.layer2.FirstName(),
								lastName:self.layer2.LastName(),
								idCand:iduser.last().id,
								idOffre:self.layer2.JobId()
							 },
							 dataPostuler = JSON.stringify(offreAjoutJson);
						transportaPostuler.read({
							data: dataPostuler,
							success: function(Data) {
							}
						});
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
				};
				self.activeLayer = leq.data.observable(self.layer1.id);
			}
		});
		return OffresViewModel;
	});