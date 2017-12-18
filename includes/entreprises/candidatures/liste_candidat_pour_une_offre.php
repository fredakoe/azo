<?php
/*
 * Created on 7 mars 2013
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
require_once _PATH_TEMPLATES_ . 'classes/class_candidat.php';


$data = json_decode(file_get_contents("php://input"));

if(isset($data)) {
	$ID = $data->{'id'};
	$ent = new Entreprises();
	$ent->XMyDB();
	if (!$ent->XMyDBConnect($_BDDAZO_)) {
		exit;
	}
// }}}

	$cand = new Candidats();
	$cand->XMyDB();
	if (!$cand->XMyDBConnect($_BDDAZO_)) {
		exit;
	}
	$off = new Offres();
	$off->XMyDB();
	if (!$off->XMyDBConnect($_BDDAZO_)) {
		exit;
	}

	$ent->AllListSaveGet("T_OFFRE_T_ENTREPRISE_id", $ID);
	$List;

	for ($i = 0; $i < $ent->XMyResultGet(); $i++) {
		$cand->CandidatsInfosGet("Id", $ent->ListSaveGet($i)->T_CANDIDAT_Id);
		$InfoList['nom'] = utf8_encode($cand->CandidatsLastNameGet());
		$InfoList['prenom'] = utf8_encode($cand->CandidatsFirstNameGet());
		$InfoList['url'] = utf8_encode($cand->CandidatsResumeGet());
		$InfoList['idCand'] = utf8_encode($cand->CandidatsIdGet());

		$off->OffresInfosGet("id", $ent->ListSaveGet($i)->T_OFFRE_id);
		$InfoList['titre'] = utf8_encode($off->OffresTitreGet());
		$InfoList['idOffre'] = utf8_encode($off->OffresIdGet());
		$InfoList['description'] = utf8_encode($off->OffresDescriptionGet());

		$List[] = $InfoList;
	}
	print json_encode($List);
}
?>
