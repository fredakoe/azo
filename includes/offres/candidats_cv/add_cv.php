<?php

require_once '../../internal/config.inc.php';
require_once _PATH_TEMPLATES_.'classes/class_db.php';
require_once _PATH_TEMPLATES_.'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_.'classes/class_candidat.php';
require_once _PATH_TEMPLATES_.'classes/class_offre.php';


$target_file = $_FILES["cvToUpload"]["name"];
$tmpName  = $_FILES['cvToUpload']['tmp_name'];
$uploadOk = 1;

$fileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if file already exists
if (file_exists($target_file)) {
	echo "Sorry, file already exists.";
	$uploadOk = 0;
}
// Check file size
if ($_FILES["cvToUpload"]["size"] > 500000) {
	echo "Sorry, your file is too large.";
	$uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
	echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {

	if (move_uploaded_file($tmpName, $target_file)) {
		$cand = new Candidats();
		$cand->XMyDB();
		if (!$cand->XMyDBConnect($_BDDAZO_)) {
			exit;
		}
		if(isset($_GET['ID'])){
			$ID =$_GET['ID'];
			$cand->CandidatsALLListeGet();
			for($i=0; $i<$cand->XMyResultGet(); $i++) {
				if($cand->CandidatsListGet($i)->Id ==$ID)
				{
					$cand->CandidatsResumeSet($target_file);
					$cand->CandidatsAddResume("Id",$ID);
				}
			}
	   }

	}
}


?>