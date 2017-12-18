<?php

// Chargement descriptif librairies & classes
require_once '../../internal/config.inc.php';


require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_entreprise.php';



$data = json_decode(file_get_contents("php://input"));

if(isset($data)){

	$entreprise = utf8_decode(addslashes ($data->{'entreprise'}));
	$address =utf8_decode(addslashes ( $data->{'address'}));
	$descriptionEntreprise =utf8_decode( addslashes ($data->{'descriptionEntreprise'}));
	$email =utf8_decode( $data->{'email'});
	$siteWeb = utf8_decode($data->{'siteWeb'});
	$telephone = utf8_decode($data->{'telephone'});
	$login = utf8_decode(addslashes ($data->{'login'}));
	$password = utf8_decode(addslashes ($data->{'password'}));

	$ent = new Entreprises();
	$ent->XMyDB();
	if (!$ent->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}

	$ent->EntreprisesNameSet($entreprise);
	$ent->EntreprisesAdresseSet($address);
	$ent->DomaineDescriptionSet($descriptionEntreprise);
	$ent->EntreprisesEmailSet($email);
	$ent->EntreprisesUrlSet($siteWeb);
	$ent->EntreprisesTelephoneSet($telephone);
    $ent->EntreprisesUsernameSet($login);
	$ent->EntreprisesPasswordSet($password);

	$ent->AddNewDomaines ();
	$ent->EntreprisesAddNew();
	$ent->EntreprisesInfosGet('login',$login);


	$ent->AddDomaine($descriptionEntreprise,$ent->EntreprisesIdGet(),'t_entreprise','description');
	$ent->AddStatus("1",$login,'t_entreprise');


}


?>
