<?php

require_once '../../internal/config.inc.php';
require_once _PATH_TEMPLATES_.'classes/class_db.php';
require_once _PATH_TEMPLATES_.'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_.'classes/class_candidat.php';
require_once _PATH_TEMPLATES_.'classes/class_offre.php';


$cand = new Candidats();
$cand->XMyDB();
if (!$cand->XMyDBConnect( $_BDDAZO_ )) {
    exit;
}
if(isset($_GET['ID'])){
$cand->CandidatsInfosGet("Id",$_GET['ID']);
$resume= $cand->CandidatsResumeGet();
$name=  $cand->CandidatsFirstNameGet();

/*header("Content-Type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"" . basename($resume) . "\";");
readfile($resume);*/

header('Content-Description: File Transfer');
header('Content-Type: application/force-download');
header("Content-Disposition: attachment; filename=\"" . basename($resume) . "\";");
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($resume));
ob_clean();
flush();
readfile($resume); //showing the path to the server where the file is to be download
exit;

}

?>