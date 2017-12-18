<?php

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';

require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_candidat.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data)) {
	$cand = new Candidats();
	$cand->XMyDB();
	if (!$cand->XMyDBConnect($_BDDAZO_)) {
		exit;
	}

	$ID = $data->{'id'};

	$cand->CandidatsInfosGet("Id", $ID);
	$InfoCand['url'] = utf8_encode($cand->CandidatsResumeGet());
	$InfoCand['idCand'] = utf8_encode($cand->CandidatsIdGet());

	print json_encode($InfoCand);
}
?>
