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

$res = $_POST['id'];
for($i=0; $i<$off->XMyResultGet(); $i++) {
    if($off->OffresListGet($i)->id ==$res)
    {
        $off->OffresInfosGet("id", $off->OffresListGet($i)->id);
        $offre['date']  		=	$off->OffresDateGet();
        $offre['end']  		    =	$off->OffresDateEndGet();
        $offre['statut']  		=	$off->OffresStatusGet();
        $offre['description']  	=	utf8_encode($off->OffresDescriptionGet());
        $offre['entreprise']  	=	utf8_encode($off->OffresEntrepriseGet());
        $offre['titre']  		=	utf8_encode($off->OffresTitreGet());
        $offre['id']  		    =	utf8_encode($off->OffresIdGet());
        print json_encode($offre);
    }
}

?>