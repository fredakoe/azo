<?php

require_once '../internal/config.inc.php';
require_once _PATH_TEMPLATES_.'classes/class_db.php';
require_once _PATH_TEMPLATES_.'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_.'classes/class_candidat.php';
require_once _PATH_TEMPLATES_.'classes/class_offre.php';

$data= $_POST['offreDelete'];
$json =json_decode($_POST['offreDelete']);
$titre =utf8_decode($json->{'titre'});
$idOffre=utf8_decode($json->{'idOffre'});

$off = new Offres();
	$off->XMyDB();
	if (!$off->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}
$off->OffresAllListGet();

for($i=0; $i<$off->XMyResultGet(); $i++) {

	if($off->OffresListGet($i)->id == $idOffre && $off->OffresListGet($i)->titre ==$titre){

		$off->OffresDelete( $off->OffresListGet($i)->id);
	}
}

?>