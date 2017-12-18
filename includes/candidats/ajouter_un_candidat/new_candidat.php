<?php

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';

require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_candidat.php';


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){

	$lastname  = utf8_decode(addslashes ( $data->{'lastname'}));
	$firstname = utf8_decode(addslashes ($data->{'firstname'}));
	$address   = utf8_decode(addslashes ($data->{'address'}));
	$email     = utf8_decode( $data->{'email'});
	$telephone = utf8_decode($data->{'telephone'});
	$login     = utf8_decode($data->{'login'});
	$password  = utf8_decode($data->{'password'});

	$cand = new Candidats();
	$cand->XMyDB();
	if (!$cand->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}

	$cand->CandidatsLastNameSet($lastname);
	$cand->CandidatsFirstNameSet($firstname);
	$cand->CandidatsAdresseSet($address);
	$cand->CandidatsEmailSet($email);
	$cand->CandidatsTelephoneSet($telephone);
	$cand->CandidatsUsernameSet($login);
	$cand->CandidatsPasswordSet($password);

	$cand->CandidatsNew();

	$cand->AddStatus("1",$login,'t_candidat');

}

?>
