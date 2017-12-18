<?PHP

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';

require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_candidat.php';
require_once _PATH_TEMPLATES_ . 'classes/class_offre.php';
require_once _PATH_TEMPLATES_ . 'classes/class_entreprise.php';


$data = json_decode(file_get_contents("php://input"));
if(isset($data)){
	$offres;
	$ID = $data->{'id'};
	$cand = new Candidats();
	$cand->XMyDB();
	if (!$cand->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}
	$off = new Offres();
	$off->XMyDB();
	if (!$off->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}
	$cand->AllListSaveGet("T_CANDIDAT_Id",$ID);
	for($i=0; $i<$cand->XMyResultGet(); $i++) {
		$off->OffresInfosGet( "id", $cand->ListSaveGet($i)->T_OFFRE_id);
		$offre['date']        =$off->OffresDateGet();
		$offre["titre"]       = utf8_encode($off->OffresTitreGet());
		$offre['statut']      = $off->OffresStatusGet();
		$offre['entreprise']  = utf8_encode($off->OffresEntrepriseGet());
		$offre['description'] = $off->OffresDescriptionGet();
		$offre['idOffre']     = $off->OffresIdGet();
		$offres[]			  =	$offre;
	}
	print json_encode($offres);
}


?>