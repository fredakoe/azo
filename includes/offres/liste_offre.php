<?php
require_once '../internal/config.inc.php';
require_once _PATH_TEMPLATES_.'classes/class_db.php';
require_once _PATH_TEMPLATES_.'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_.'classes/class_candidat.php';
require_once _PATH_TEMPLATES_.'classes/class_offre.php';

$link = mysql_connect('142.4.214.151:3306', 'azouser', 'azouser', false) or die('ERREUR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

$db_selected = mysql_select_db('azo3', $link);
if (!$db_selected) {
   die ('Impossible de sélectionner la base de données : ' . mysql_error());
}

$result = mysql_query('select * from t_offre');
$rec = 0;
$offres;
 while ($ligr=mysql_fetch_assoc($result)) {
    $rec++;
   $title   = $ligr["titre"] ;
   $desc    = $ligr["description"] ;
  
  $offre = new Array();
    $offre['date']          = new DateTime();
        $offre['end']           = new DateTime();
        $offre['statut']        = "Actif";
        $offre['idOffre']       = 21;
        $offre['entreprise']    = "NOKIA";
        $offre['titre']         = $title;
        $offres[]               = $offre;
 }
print json_encode($offres);


/*
$off = new Offres();
	$off->XMyDB();
	if (!$off->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}
	
$off->OffresAllListGet();

$offres;
for($i=0; $i<$off->XMyResultGet(); $i++) {
	$dateNow = new DateTime();
	$dateNow = $dateNow->format('Ymd');
	$dateEnd = new DateTime();// $off->OffresListGet($i)->date_fin);
	$dateEnd = $dateEnd->format('Ymd');

	if($dateNow < $dateEnd){
		$off->OffresStatus("1",$off->OffresListGet($i)->id);
	}
	else{
		$off->OffresStatus("0",$off->OffresListGet($i)->id);
	}

//	$off->OffresInfosGet("id", $off->OffresListGet($i)->id);
	$offre['date']  	= $dateNow;//$off->OffresDateGet();
	$offre['end']           = $dateEnd;//$off->OffresDateEndGet();
	$offre['statut']  	= "Actif";//$off->OffresStatusGet();
	$offre['idOffre']  	= 21;//$off->OffresIdGet();
	$offre['entreprise']  	= "NOKIA";//utf8_encode($off->OffresEntrepriseGet());
	$offre['titre']  	= "Dev logiciel";//utf8_encode($off->OffresTitreGet());
	$offres[] 		= $offre;
}

print json_encode($offres);
*/
?>
