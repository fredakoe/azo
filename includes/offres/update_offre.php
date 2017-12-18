<?php

require_once '../internal/config.inc.php';
require_once _PATH_TEMPLATES_.'classes/class_db.php';
require_once _PATH_TEMPLATES_.'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_.'classes/class_candidat.php';
require_once _PATH_TEMPLATES_.'classes/class_offre.php';

$update=false;
$cancel=false;
if(isset($_POST['offreUpdate'])) {
	$jsonUpdate = json_decode($_POST['offreUpdate']);
	$titreUpdate = utf8_decode($jsonUpdate->{'titre'});
	$descriptionOffreUpdate = utf8_decode($jsonUpdate->{'descriptionOffre'});
	$dateFinUpdate = utf8_decode($jsonUpdate->{'dateFin'});
	$idOffreUpdate = utf8_decode($jsonUpdate->{'idOffre'});
	$update=true;
}
if(isset($_POST['offreCancel'])) {
	$jsonCancel = json_decode($_POST['offreCancel']);
	$titreCancel = utf8_decode($jsonCancel->{'titre'});
	$idOffreCancel = utf8_decode($jsonCancel->{'idOffre'});
	$cancel=true;
}
$off = new Offres();
	$off->XMyDB();
	if (!$off->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}

$off->OffresAllListGet();
for($i=0; $i<$off->XMyResultGet(); $i++) {

	if($update) {

		if ($off->OffresListGet($i)->id == $idOffreUpdate) {

			$off->OffresTitreSet($titreUpdate);
			$off->OffresDescriptionSet($descriptionOffreUpdate);
			$off->OffresDateEndSet($dateFinUpdate);

			$dateNow = new DateTime();
			$dateNow = $dateNow->format('dmy');
			$dateEnd = new DateTime($off->OffresListGet($i)->date_fin);
			$dateEnd = $dateEnd->format('dmy');
			if ($dateNow < $dateEnd) {
				$off->OffresStatus("1", $off->OffresListGet($i)->id);
			} else {
				$off->OffresStatus("0", $off->OffresListGet($i)->id);
			}
			$off->OffresUpdate($off->OffresListGet($i)->id);
		}
	}
	elseif($cancel){

		if($off->OffresListGet($i)->id == $idOffreCancel && $off->OffresListGet($i)->titre ==$titreCancel){
			$TodayDate = new DateTime();
			$YesterdayDate = $TodayDate->modify('-1 day');
			//$yesterday = date("d-m-y", mktime(0, 0, 0, date("m") , date("d")-1,date("Y")));
			$off->OffresDateEndSet($YesterdayDate->format('y-m-d'));
			$off->OffresStatus("0",$off->OffresListGet($i)->id);
			$off->OffresCancel($off->OffresListGet($i)->id);
		}
	}
}

?>