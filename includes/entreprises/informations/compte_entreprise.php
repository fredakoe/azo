<?php

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';


require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_entreprise.php';



$data = json_decode(file_get_contents("php://input"));

if(isset($data)){

	$ID = $data->{'id'};

	$ent = new Entreprises();
	$ent->XMyDB();
	if (!$ent->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}
	$ent->EntreprisesInfosGet("id", $ID);
	$entrepriseInfo;

	$entrepriseInfo['entreprise']  				=	utf8_encode($ent->EntreprisesNameGet());;
	$entrepriseInfo['address']  				=	utf8_encode($ent->EntreprisesAdresseGet());;
	$entrepriseInfo['descriptionEntreprise']  	=	utf8_encode($ent->EntreprisesDescriptionGet());;
	$entrepriseInfo['email']  					=	utf8_encode($ent->EntreprisesEmailGet());;
	$entrepriseInfo['siteWeb']  				=	utf8_encode($ent->EntreprisesUrlGet());
	$entrepriseInfo['telephone']  				=	utf8_encode($ent->EntreprisesTelephoneGet());
	$entrepriseInfo['login']  					=	utf8_encode($ent->EntreprisesUsernameGet());
	$entrepriseInfo['password']  				=	utf8_encode($ent->EntreprisesPasswordGet());

	print json_encode($entrepriseInfo);

}


?>
