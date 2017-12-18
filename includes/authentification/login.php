<?php

require_once '../internal/config.inc.php';
require_once _PATH_TEMPLATES_.'classes/class_db.php';
require_once _PATH_TEMPLATES_.'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_.'classes/class_candidat.php';
require_once _PATH_TEMPLATES_ . 'classes/class_entreprise.php';

$data = json_decode(file_get_contents("php://input"));

$Login = $data->{'Login'};
$Password = $data->{'Password'};


// Demarrage de la session
define('SESS_SAVE_PATH', '/var/www/html/azo14/tmp');
define('SESS_NAME',      'sess_application_azo');
session_save_path( SESS_SAVE_PATH );
session_name( SESS_NAME );
session_start();

// Deconnexion de l'utilisateur
/*if (isSet($_GET['logout']) && ($_GET['logout'] == "now")) {
	$cand = new Candidats();
	$cand->XMyDB();
	$cand->XMyDBConnect( $_BDDAZO_ );
	unset($_SESSION['sess_is_logged']);
	session_unset();
	session_destroy();
	header("Location: ".AZO);
	exit;
}*/

// Pas de variable de connexion
if (! isSet( $_SESSION['sess_is_logged'] ) ) {
	//session_register("sess_is_logged");
	$_SESSION['sess_is_logged'] = false;
}

// Utilisateur deja connecte
//if ( isSet( $_SESSION['sess_is_logged'] )   && ( $_SESSION['sess_is_logged'] ) ) { return; }

// Controle de connexion
$__message['msg']='OK';
$__message['level'] =-1;
$__message['id'] =-1;
/*if (isSet($Login) && ($Login == "yes")) {
	
	$cand = new Candidats();
	$cand->XMyDB();
	if (!$cand->XMyDBConnect( $_BDDAZO_ )) {
		exit;
	}

	$cand->CandidatsFirstNameSet('campusdddddd');
	$cand->CandidatsLastNameSet('servivceddd');
	$cand->CandidatsEmailSet('quolino@yahoo.fr');
	$cand->CandidatsVilleSet('dcjdkjcjkdckjd');
	$cand->CandidatsUsernameSet('sasa');
	$cand->CandidatsPasswordSet('taoo');
	$cand->CandidatsFaxSet('2222222dddddddddddddddd');
	$cand->CandidatsPaysSet('Benin');
	$cand->CandidatsCodePostalSet('Gbegamey');
	$cand->CandidatsAdresseSet('Gbegamey');
	$cand->CandidatsNew();
	$cand->CandidatsListeGet("prenom","roland");
	$cand->CandidatsDelete ('9');*/
	
	if (isSet($Login) && isSet($Password)) {

		$ent = new Entreprises();
		$ent->XMyDB();
		if (!$ent->XMyDBConnect( $_BDDAZO_ )) {
			exit;
		}
		$cand = new Candidats();
		$cand->XMyDB();
		if (!$cand->XMyDBConnect( $_BDDAZO_ )) {
			exit;
		}

		$cand->CandidatsInfosGet("login", $Login);

		$ent->EntreprisesInfosGet("login", $Login);

		if ($cand->CandidatsResultGet()||$ent->EntreprisesResultGet() ) {
			$passwd = $Password;
				if ($passwd == $cand->CandidatsPasswordGet()) {
					// Utilisateur valide
					//$pc->XCandidatTrace();
					$_SESSION['sess_is_logged']	    = TRUE;
					$_SESSION['sess_uid']		    = $cand->CandidatsUsernameGet();
		        	$_SESSION['sess_lastname']	    = StripSlashes($cand->CandidatsLastNameGet());
					$_SESSION['sess_firstname']	    = StripSlashes($cand->CandidatsFirstNameGet());
		        	$_SESSION['sess_email']		    = utf8_encode($cand->CandidatsEmailGet());
		            $_SESSION['sess_address_ip']	= $_SERVER["REMOTE_ADDR"];
					//echo  utf8_encode($cand->CandidatsEmailGet());
					// On sort vers la page
					$__message['id'] = $cand->CandidatsIdGet();
					$__message['msg']='Candidat';
					$__message['level'] =0;

				}else if ($passwd == $ent->EntreprisespasswordGet()) {
					$_SESSION['sess_is_logged']	    = TRUE;
					$_SESSION['sess_uid']		    = $ent->EntreprisesUsernameGet();
					$_SESSION['sess_lastname']	    = StripSlashes($ent->EntreprisesNameGet());
					$_SESSION['sess_type']	        = StripSlashes($ent->EntreprisesTypeGet());
					$_SESSION['sess_email']		    = $ent->EntreprisesEmailGet();
					$_SESSION['sess_address_ip']	= $_SERVER["REMOTE_ADDR"];
					$__message['id'] = $ent->EntreprisesIdGet();
					$__message['msg']='Entreprise';
					$__message['level'] =2;

				}
				else {
					// Mauvais mot de passe
					$__message['msg'] = "Mauvais mot de pass";//$TEXT['BAD_ACCOUNT'];
					$__message['id'] = -1;
					$__message['level']=1;
					$_SESSION['sess_is_logged']   = FALSE;
				}
			
		} else {
			// Probleme lors de la recherche de l'utilisateur
			$__message['msg'] ="Probleme lors de la recherche de l'utilisateur"; //$TEXT['BAD_ACCOUNT'];
			$__message['level']=3;
			$__message['id'] = -1;
			$_SESSION['sess_is_logged']   = FALSE;
		}
		/*}
         else {
            // Pas d'utilisateur ou pas de password
            $__message_err ="Pas d'utilisateur ou pas de password";//$TEXT['BAD_ACCOUNT'];
            $_SESSION['sess_is_logged']   = FALSE;
        }*/
}
print json_encode($__message);
exit;

?>

