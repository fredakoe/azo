<?php
/*
 * Created on 4 mars 2013
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';
require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_entreprise.php';
require_once _PATH_TEMPLATES_ . 'classes/class_offre.php';


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){

	$ID = $data->{'id'};

	$ent = new Entreprises();
		$ent->XMyDB();
		if (!$ent->XMyDBConnect( $_BDDAZO_ )) {
			exit;
		}
	$ent->EntreprisesAllListeOffreGet("id",$ID);
	$offres;
	for($i=0; $i<$ent->XMyResultGet(); $i++) {

		$offre['date']  		=	$ent->EntreprisesListOffreGet($i)->date_depot;
		$offre['end']  		    =	$ent->EntreprisesListOffreGet($i)->date_fin;
		$offre['statut']  		=	$ent->EntreprisesListOffreGet($i)->STATUT_OFFRE_id;
		$offre['idOffre']  	    =	$ent->EntreprisesListOffreGet($i)->id;
		$offre['titre']  		=	utf8_encode($ent->EntreprisesListOffreGet($i)->titre);
		$offres[] 				=	$offre;
	}
	print json_encode($offres);

}
?>

