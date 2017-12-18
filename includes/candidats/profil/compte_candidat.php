<?php

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';

require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_candidat.php';


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){

	$ID = $data->{'id'};

	$cand = new Candidats();
	$cand->XMyDB();
	if (!$cand->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}
	$cand->CandidatsInfosGet('id',$ID);
	$candidatProfil;

	$candidatProfil['lastname']  				=	utf8_encode($cand->CandidatsLastNameGet());
	$candidatProfil['firstname']  				=	utf8_encode($cand->CandidatsFirstNameGet());
	$candidatProfil['address']  				=	utf8_encode($cand->CandidatsAdresseGet());
	$candidatProfil['email']  					=	utf8_encode($cand->CandidatsEmailGet());
	$candidatProfil['telephone']  				=	utf8_encode($cand->CandidatsTelephoneGet());
	$candidatProfil['login']  					=	utf8_encode($cand->CandidatsUsernameGet());
	$candidatProfil['password']  				=	utf8_encode($cand->CandidatsPasswordGet());

	print json_encode($candidatProfil);
}

?>
