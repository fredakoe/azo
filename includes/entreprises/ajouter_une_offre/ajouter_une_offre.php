<?php
/*
 * Created on 14 mars 2013
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';

require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_offre.php';
require_once _PATH_TEMPLATES_ . 'classes/class_entreprise.php';
require_once _PATH_TEMPLATES_ . 'classes/class_candidat.php';


$json = json_decode(file_get_contents("php://input"));

if(isset($json)) {


	//$data= $_POST['offre'];
	//$json =json_decode($_POST['offre']);
	$titre =utf8_decode(addslashes ($json->{'titre'}));
	$address=utf8_decode(addslashes ($json->{'address'}));
	$descriptionOffre=  utf8_decode(addslashes ($json->{'descriptionOffre'}));
	$dateFin=utf8_decode($json->{'dateFin'});
	$entreprise=utf8_decode(addslashes ($json->{'entreprise'}));
	$descriptionEntreprise=utf8_decode(addslashes ($json->{'descriptionEntreprise'}));
	$email= utf8_decode($json->{'email'});
	$siteWeb=utf8_decode($json->{'siteWeb'});
	$telephone=utf8_decode($json->{'telephone'});




	$off = new Offres();
		$off->XMyDB();
		if (!$off->XMyDBConnect( $_BDDAZO_ )) {
			exit;
		}
	$ent = new Entreprises();
	$ent->XMyDB();
	if (!$ent->XMyDBConnect( $_BDDAZO_ )) {
			exit;
		}
	$off->OffresTitreSet($titre);
	$off->OffresLieuSet($address);
	$off->OffresDescriptionSet($descriptionOffre);
	$off->OffresDateEndSet($dateFin);

	$etrepriseExist=false;
	$ent->EntreprisesAllListeGet();
	for($i=0; $i<$ent->XMyResultGet(); $i++) {
		if($ent->EntreprisesListGet($i)->denomination == $entreprise /*|| $ent->EntreprisesListGet($i)->email == $email*/){
			$etrepriseExist =true;
		}
	}
	if($etrepriseExist){

		$off->OffresAddNew("denomination",$entreprise);
		$pVal = $off->XMyDBLastId();
		$off->OffresStatus("1",$pVal);
		$off->OffresExperience("1",$pVal);
		$off->OffresType("1",$pVal);
		$ent->EntreprisesInfosGet("denomination",$entreprise);
		$off->EntrepriseIdSet($ent->EntreprisesIdGet());
		$off->OffreIdSet($pVal);
		$off->AddToOffreEntreprise ();

	}
	else{
		$ent->DomaineDescriptionSet($descriptionEntreprise);
		//$ent->EntreprisesDescriptionSet($descriptionEntreprise);
		$ent->EntreprisesNameSet($entreprise);
		$ent->EntreprisesEmailSet($email);
		$ent->EntreprisesUrlSet($siteWeb);
		$ent->EntreprisesTelephoneSet($telephone);
		$ent->AddNewDomaines ();
		$ent->EntreprisesAddNew();

		$off->OffresAddNew("denomination",$entreprise);
		$pVal = $off->XMyDBLastId();
		$off->OffresStatus("1",$pVal);
		$off->OffresExperience("1",$pVal);
		$off->OffresType("1",$pVal);
		$ent->EntreprisesInfosGet("denomination",$entreprise);
		$off->EntrepriseIdSet($ent->EntreprisesIdGet());
		$off->OffreIdSet($pVal);
		$off->AddToOffreEntreprise ();
	}
}

?>
