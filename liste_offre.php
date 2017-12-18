<?php
require_once '../internal/config.inc.php';
require_once _PATH_TEMPLATES_.'classes/class_db.php';
require_once _PATH_TEMPLATES_.'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_.'classes/class_candidat.php';
require_once _PATH_TEMPLATES_.'classes/class_offre.php';

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
	$dateEnd = new DateTime( $off->OffresListGet($i)->date_fin);
	$dateEnd = $dateEnd->format('Ymd');
	if($dateNow < $dateEnd){
		$off->OffresStatus("1",$off->OffresListGet($i)->id);
	}
	else{
		$off->OffresStatus("0",$off->OffresListGet($i)->id);
	}
	$off->OffresInfosGet("id", $off->OffresListGet($i)->id);
	$offre['date']  		=	$off->OffresDateGet();
	$offre['end']  		    =	$off->OffresDateEndGet();
	$offre['statut']  		=	$off->OffresStatusGet();
	$offre['idOffre']  		=	$off->OffresIdGet();
	$offre['entreprise']  	=	utf8_encode($off->OffresEntrepriseGet());
	$offre['titre']  		=	utf8_encode($off->OffresTitreGet());
	$offres[] 				=	$offre;
}


//$url  = gethostbyname('mysql8.lwspanel.com/myadmin4');
//
//$ch_rech = curl_init();                    // Initialiser cURL.
//curl_setopt($ch_rech, CURLOPT_URL, $url);  // Indiquer quel URL récupérer
//curl_setopt($ch_rech, CURLOPT_HEADER, 0);  // Ne pas inclure l'header dans la réponse.
//ob_start();                                // Commencer à 'cache' l'output.
//curl_exec($ch_rech);                       // Exécuter la requète.
//curl_close($ch_rech);                      // Fermer cURL.
//$Results = ob_get_contents();              // Sauvegarder le 'cache' dans la variable $Results.
//ob_end_clean();
//$link = mysql_connect($url, "azobj713246", "jangbJvV")
//or die("Impossible de se connecter : " . mysql_error());
//echo 'Connexion réussie';
//mysql_close($link);

print json_encode($offres);

?>

