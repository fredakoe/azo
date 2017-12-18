<?php
// =============================================================================
// Nom : config.inc.php
// Par : Lilian LABAYLE <llabayle@ecritel.net
// Le  : 23/09/2010
// Objet : Fichier de configuration du Back Office CDN 
//
// Revision :
//
// =============================================================================

	
	// =========================================================================
	// initialisation  

	
	error_reporting(0);
	if (file_exists("/var/www/html/azo14/debug")) {
		error_reporting(E_ALL);
		ini_set('display_errors','On');
	} else {
		error_reporting(0);
		ini_set('display_errors','Off');
	}
	//ini_set('display_errors','Off');
	

	// =========================================================================
	// mysql configuration 

	
	$_BDDAZO_['HOST']		= '142.4.214.151';
	$_BDDAZO_['PORT'] 		= 3306;
	$_BDDAZO_['DBNAME']	        = 'azo3';
	$_BDDAZO_['LOGIN']		= 'azouser';
	$_BDDAZO_['PASSWORD']	        = 'azouser';

	// =========================================================================
	// Constantes

	define('_PATH_TEMPLATES_',	'/var/www/html/azo14/');
	define('_PATH_IMAGES_',		'/var/www/html/azo14');
	define('_PATH_ICONS_',		'/var/www/html/azo14');
	define('_PATH_CSS_',		'/var/www/html/azo14');
	define('_PATH_JS_',		'/var/www/html/azo14');
	define('_PATH_INCLUDE_',	'/var/www/html/azo14');
	$path = '/var/www/html/azo14';

	//define('_AGIR_WS_',			'http://grp.skyturn.net/AgirServices.wsdl');

	// =========================================================================

	

?>
