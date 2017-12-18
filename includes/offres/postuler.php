<?php
/*
 * Created on 14 mars 2013
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */

// Chargement descriptif librairies & classes
require_once '../internal/config.inc.php';

require_once _PATH_TEMPLATES_ . 'classes/class_db.php';
require_once _PATH_TEMPLATES_ . 'classes/class_nichandle.php';
require_once _PATH_TEMPLATES_ . 'classes/class_offre.php';
require_once _PATH_TEMPLATES_ . 'classes/class_entreprise.php';
require_once _PATH_TEMPLATES_ . 'classes/class_candidat.php';


$json = json_decode(file_get_contents("php://input"));

if(isset($json)) {

	$off = new Offres();
	$off->XMyDB();
	if (!$off->XMyDBConnect($_BDDAZO_)) {
		exit;
	}
	$ent = new Entreprises();
	$ent->XMyDB();
	if (!$ent->XMyDBConnect($_BDDAZO_)) {
		exit;
	}
	$cand = new Candidats();
	$cand->XMyDB();
	if (!$cand->XMyDBConnect($_BDDAZO_)) {
		exit;
	}


	if(isset($json->{'idCand'})){

		$idCand     = utf8_decode($json->{'idCand'});
		$idOffre    = utf8_decode($json->{'idOffre'});
		$lastName   = utf8_decode($json->{'lastName'});
		$firstName  = utf8_decode($json->{'firstName'});
		$entreprise = utf8_decode($json->{'entreprise'});
		$email 		= utf8_decode($json->{'email'});
		$telephone  = utf8_decode($json->{'telephone'});

			$to      = 'quolino@yahoo.fr'; //can receive notification

			$subject = 'Test email';
			$message = 'hello';
			$headers = 'From: roland.quenum@gmail.com' . "\r\n" .
				'Reply-To:roland.quenum@gmail.com' . "\r\n" .
				'X-Mailer: PHP/' . phpversion();

			mail($to, $subject, $message, $headers);


	}else{
		$idCand=0;
		$idOffre    = utf8_decode($json->{'idOffre'});
		$lastName   = utf8_decode($json->{'lastName'});
		$firstName  = utf8_decode($json->{'firstName'});
		$entreprise = utf8_decode($json->{'entreprise'});
		$email 		= utf8_decode($json->{'email'});
		$telephone  = utf8_decode($json->{'telephone'});

		//mail::sendMail("to@domain.com", "Test Attach ".  date("H:i:s"),
		//	"Contenu du mail <a href=3D'domain.com'>domain.com</a>", __FILE__, "xx@domain.com",'' , true);
	}
	$ent->EntreprisesInfosGet("denomination", $entreprise);
	$off->CandidatIdSet($idCand);
	$off->EntrepriseIdSet($ent->EntreprisesIdGet());
	$off->OffreIdSet($idOffre);
	$off->AddToOffreSave();

	class mail {

		public static function prepareAttachment($path) {
			$rn = "\r\n";

			if (file_exists($path)) {
				$finfo = finfo_open(FILEINFO_MIME_TYPE);
				$ftype = finfo_file($finfo, $path);
				$file = fopen($path, "r");
				$attachment = fread($file, filesize($path));
				$attachment = chunk_split(base64_encode($attachment));
				fclose($file);

				$msg = 'Content-Type: \'' . $ftype . '\'; name="' . basename($path) . '"' . $rn;
				$msg .= "Content-Transfer-Encoding: base64" . $rn;
				$msg .= 'Content-ID: <' . basename($path) . '>' . $rn;
               //$msg .= 'X-Attachment-Id: ebf7a33f5a2ffca7_0.1' . $rn;
				$msg .= $rn . $attachment . $rn . $rn;
				return $msg;
			} else {
				return false;
			}
		}

		public static function sendMail($to, $subject, $content, $path = '', $cc = '', $bcc = '', $_headers = false) {

			$rn = "\r\n";
			$boundary = md5(rand());
			$boundary_content = md5(rand());

// Headers
			$headers = 'From: Mail System PHP <no-reply@domain.com>' . $rn;
			$headers .= 'Mime-Version: 1.0' . $rn;
			$headers .= 'Content-Type: multipart/related;boundary=' . $boundary . $rn;

			//adresses cc and ci
			if ($cc != '') {
				$headers .= 'Cc: ' . $cc . $rn;
			}
			if ($bcc != '') {
				$headers .= 'Bcc: ' . $cc . $rn;
			}
			$headers .= $rn;

// Message Body
			$msg = $rn . '--' . $boundary . $rn;
			$msg.= "Content-Type: multipart/alternative;" . $rn;
			$msg.= " boundary=\"$boundary_content\"" . $rn;

//Body Mode text
			$msg.= $rn . "--" . $boundary_content . $rn;
			$msg .= 'Content-Type: text/plain; charset=ISO-8859-1' . $rn;
			$msg .= strip_tags($content) . $rn;

//Body Mode Html
			$msg.= $rn . "--" . $boundary_content . $rn;
			$msg .= 'Content-Type: text/html; charset=ISO-8859-1' . $rn;
			$msg .= 'Content-Transfer-Encoding: quoted-printable' . $rn;
			if ($_headers) {
				$msg .= $rn . '<img src=3D"cid:template-H.PNG" />' . $rn;
			}
			//equal sign are email special characters. =3D is the = sign
			$msg .= $rn . '<div>' . nl2br(str_replace("=", "=3D", $content)) . '</div>' . $rn;
			if ($_headers) {
				$msg .= $rn . '<img src=3D"cid:template-F.PNG" />' . $rn;
			}
			$msg .= $rn . '--' . $boundary_content . '--' . $rn;

//if attachement
			if ($path != '' && file_exists($path)) {
				$conAttached = self::prepareAttachment($path);
				if ($conAttached !== false) {
					$msg .= $rn . '--' . $boundary . $rn;
					$msg .= $conAttached;
				}
			}

//other attachement : here used on HTML body for picture headers/footers
			if ($_headers) {
				$imgHead = dirname(__FILE__) . '/../../../../modules/notification/ressources/img/template-H.PNG';
				$conAttached = self::prepareAttachment($imgHead);
				if ($conAttached !== false) {
					$msg .= $rn . '--' . $boundary . $rn;
					$msg .= $conAttached;
				}
				$imgFoot = dirname(__FILE__) . '/../../../../modules/notification/ressources/img/template-F.PNG';
				$conAttached = self::prepareAttachment($imgFoot);
				if ($conAttached !== false) {
					$msg .= $rn . '--' . $boundary . $rn;
					$msg .= $conAttached;
				}
			}

// Fin
			$msg .= $rn . '--' . $boundary . '--' . $rn;

// Function mail()
			mail($to, $subject, $msg, $headers);
		}

	}

}

?>
