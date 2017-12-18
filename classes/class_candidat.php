<?php
/*
 * Nom 		: class_Candidat.php
 * Objet	: Gestion descriptif informations Candidats
 * $Id		: class_Candidats.php,v 0.1 
 */
/**
 * @brief Gestion descriptif informations Candidats.
 * @author QUENUM Roland <roland.quenum@gmail.com>
 * @date 22/08/2012
 * @version 0.1
 */ 

// --- {{{ class Candidats - Gestion descriptif information societe/comptes
/**
 * @class Candidats
 * @brief Gestion descriptif informations Candidats/comptes.
 */
class Candidats extends XHandle {


// +++ {{{ XCandidats () - Initialisation 
	function Candidats() {
		
		$this->m_cand_last_name				= "";
		$this->m_cand_first_name			= "";
		$this->m_cand_username				= "";
		$this->m_cand_keyword				= "";
		$this->m_cand_birth_day				= "";
		$this->m_cand_password				= "";
		$this->m_cand_adresse				= "";
		$this->m_cand_boite_postale			= "";
		$this->m_cand_ville					= "";
		$this->m_cand_pays					= "";
		$this->m_cand_telephone				= "";
		$this->m_cand_fax					= "";
		$this->m_cand_email					= "";
		$this->m_cand_url					= "";
		$this->m_cand_icq					= "";
		$this->m_cand_infos					= "";
		$this->m_cand_alert					= 0;
		$this->m_cand_status				= "";
		$this->m_cand_function				= "";
		$this->m_cand_sex					= "";
		$this->m_cand_resume				= "";
		$this->m_cand_result				= FALSE;
		$this->m_cand_statut_description	="";	
		$this->m_cand_status_libelle		="";
		$this->m_cand_id		="";
	}
	// }}}

	public function CandidatsLastNameGet(){
		return $this->m_cand_last_name;
	}
	public function CandidatsLastNameSet($pLastName){
		$this->m_cand_last_name 	= $pLastName;
	}
	
	public function CandidatsFirstNameGet(){
		return $this->m_cand_first_name;
	}
	public function CandidatsFirstNameSet($pFirstName){
		$this->m_cand_first_name 	= $pFirstName;
	}
	
	public function CandidatsUsernameGet(){
		return $this->m_cand_username;
	}
	public function CandidatsUsernameSet($pUsername){
		$this->m_cand_username 	= $pUsername;
	}
	
	public function CandidatsPasswordGet(){
		return $this->m_cand_password;
	}
	public function CandidatsPasswordSet($pPassword){
		$this->m_cand_password 	= $pPassword;
	}
	
	public function CandidatsAdresseGet(){
		return $this->m_cand_adresse;
	}
	public function CandidatsAdresseSet($pAdresse){
		$this->m_cand_adresse	 	= $pAdresse;
	}
	
	public function CandidatsCodePostalGet(){
		return $this->m_cand_boite_postale;
	}
	public function CandidatsCodePostalSet($pCodePostal){
		$this->m_cand_boite_postale 	= $pCodePostal;
	}
	
	public function CandidatsVilleGet(){
		return $this->m_cand_ville;
	}
	public function CandidatsVilleSet($pVille){
		$this->m_cand_ville 	= $pVille;
	}
	public function CandidatsPaysGet(){
		return $this->m_cand_pays;
	}
	public function CandidatsPaysSet($pPays){
		$this->m_cand_pays 	= $pPays;
	}
	
	public function CandidatsTelephoneGet(){
		return $this->m_cand_telephone;
	}
	public function CandidatsTelephoneSet($pTelephone){
		$this->m_cand_telephone 	= $pTelephone;
	}
	
	public function CandidatsBirthDayGet(){
		return $this->m_cand_birth_day;
	}
	public function CandidatsBirthDaySet($pBirthDay){
		$this->m_cand_birth_day 	= $pBirthDay;
	}
	public function CandidatsFaxGet(){
		return $this->m_cand_fax;
	}
	public function CandidatsFaxSet($pFax){
		$this->m_cand_fax 	= $pFax;
	}
	
	public function CandidatsSexGet(){
		return $this->m_cand_sex;
	}
	public function CandidatsSexSet($pSex){
		$this->m_cand_sex 	= $pSex;
	}
	public function CandidatsEmailGet(){
		return $this->m_cand_email;
	}
	public function CandidatsEmailSet($pEmail){
		$this->m_cand_email 	= $pEmail;
	}
	
	public function CandidatsUrlGet(){
		return $this->m_cand_url;
	}
	public function CandidatsUrlSet($pUrl){
		$this->m_cand_url 	= $pUrl;
	}
	public function CandidatsResultGet(){
		return $this->m_cand_result;
	}
	public function CandidatsResultSet($pResult){
		$this->m_cand_result 	= $pResult;
	}
	public function CandidatsFunctionGet(){
		return $this->m_cand_function;
	}
	public function CandidatsFunctionSet($pFunction){
		$this->m_cand_function 	= $pFunction;
	}
	
	public function CandidatsKeywordGet(){
		return $this->m_cand_keyword;
	}
	public function CandidatsKeywordSet($pKeyword){
		$this->m_cand_keyword 	= $pKeyword;
	}
	
	public function CandidatsResumeGet(){

		return $this->m_cand_resume;
	}
	public function CandidatsResumeSet($pResume){
		$this->m_cand_resume 	= $pResume;
	}
		public function CandidatsStatutLibelleGet(){
		return $this->m_cand_status_libelle;
	}
	public function CandidatsStatusLibelleSet($pStatusLibelle){
		$this->m_cand_status_libelle 	= $pStatusLibelle;
	}
	
	public function CandidatsStatusDescriptionGet(){
		return $this->m_cand_status_description;
	}
	public function CandidatsStatusDescriptionSet($pStatusDescription){
		$this->m_cand_status_description 	= $pStatusDescription;
	}
	
	public function CandidatsStatusCodeGet(){

		return $this->m_cand_status_code;
	}
	public function CandidatsStatusCodeSet($pStatusCode){
		$this->m_cand_status_code 	= $pStatusCode;
	}
	
	public function CandidatsListGet($i){
		return $this->m_cand_list[$i];
	}
	
	public function CandidatsIdGet(){
		return $this->m_cand_id;
	}
	
	// +++ {{{ XCandidatsGet ( pCol, pVal ) - Retourne les informations d'un candidat
	/**
	 * @brief Chargement descriptif informations sur un compte particulier.
	 * @param string. Nom de la colonne ou faire la recherche.
	 * @param string. Valeur a rechercher.
	 */ 
	
	public function CandidatsInfosGet( $pCol, $pVal ) {
		$this->m_cand_result		= FALSE;
		$query = "SELECT C.*,A.* FROM t_candidat AS C ";
		$query.= "LEFT JOIN t_coordonnees AS A ON C.coordonnes = A.id ";
		$query.= "WHERE C.$pCol='$pVal'";
		$this->XMyDBQuery($query);

		/*if (!$this->XMyDBGetResult()) {
			$this->m_cand_result=FALSE;
			return;
		}*/
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_cand_result=FALSE;
			return;
		}

		$this->m_cand_id    		= $this->XMyDBresult(0, "id");
		$this->m_cand_last_name 	= $this->XMyDBresult(0, "nom");
		$this->m_cand_first_name 	= $this->XMyDBresult(0, "prenom");
		$this->m_cand_username	   	= $this->XMyDBresult(0, "login");
		$this->m_cand_password    	= $this->XMyDBresult(0, "password");
		$this->m_cand_keyword    	= $this->XMyDBresult(0, "mot_cle");
		$this->m_cand_birth_day    	= $this->XMyDBresult(0, "date_naissance");
		//$this->m_cand_sex    		= $this->XMyDBresult(0, "sexe");
		$this->m_cand_status    	= $this->XMyDBresult(0, "T_STATUT_INSCRIPTION_id");
		$this->m_cand_resume	 	= $this->XMyDBresult(0, "cv");
		$this->m_cand_function   	= $this->XMyDBresult(0, "fonction");
		$this->m_cand_adresse	 	= $this->XMyDBresult(0, "adresse");
		$this->m_cand_boite_postale 	= $this->XMyDBresult(0, "boite_postale");
		$this->m_cand_ville      	= $this->XMyDBresult(0, "ville");
		$this->m_cand_pays       	= $this->XMyDBresult(0, "pays");
		$this->m_cand_telephone  	= $this->XMyDBresult(0, "telephone1");
		$this->m_cand_email   		= $this->XMyDBresult(0, "email");	
		$this->m_cand_url   		= $this->XMyDBresult(0, "site_web");
		$this->m_cand_fax   		= $this->XMyDBresult(0, "fax");
		$this->m_cand_result		= TRUE;
	}
	
	// }}}
	
	public function CandidatsListeGet( $pCol, $pVal ) {
		$query = "SELECT C.* FROM t_candidat AS C ";
		$query.= "LEFT JOIN t_coordonnee AS A ON C.coordonnes = A.id ";
		$query.= "WHERE $pCol='$pVal'";
		$query.= "ORDER By nom";
		$this->XMyDBQuery($query);
		if (!$this->XMyDBGetResult()) {
			$this->m_cand_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_cand_result=FALSE;
			return;
		}
		$this->m_cand_last_name 	= $this->XMyDBresult(0, "nom");
		$this->m_cand_first_name 	= $this->XMyDBresult(0, "prenom");
		$this->m_cand_result		= TRUE;
	}
	
	public function CandidatsALLListeGet() {
		$query = "SELECT C.* FROM t_candidat AS C ";
		$query.= "WHERE C.T_STATUT_INSCRIPTION_id='1'";
		$query.= "ORDER By nom";
		$this->XMyDBQuery($query);
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_cand_result= FALSE;
			return;
		}
		for ($i=0; $i< $nrows; $i++) {
			print $i;
			$this->m_cand_list[] = $this->XMyDBFetch_object();
		}
		return;
	}

	public function CandidatsOffrePostuleGet( $pCol, $pVal ) {
		$query = "SELECT C.*,P.* FROM t_candidat AS C ";
		$query.= "LEFT JOIN t_postule AS P ON  C.id=P.candidat";
		$query.= "WHERE $pCol='$pVal'";
	
		$this->XMyDBQuery($query);
		if (!$this->XMyDBGetResult()) {
			$this->m_cand_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_cand_result=FALSE;
			return;
		}
		$this->m_cand_last_name 	= $this->XMyDBresult(0, "nom");
		$this->m_cand_first_name 	= $this->XMyDBresult(0, "prenom");
		$this->m_cand_result		= TRUE;
	}

	public function CandidatsDelete ($id) {
	
		$query = "DELETE FROM t_candidat WHERE id  = '".trim($id)."'";
		$this->XMyDBQuery($query); 
		
	}	

	// +++ {{{ XEntrepriseNew(  ) - Ajout d'un enregistrement 
	/**
	 * @brief Mise a jour d'un enregistrement dans la base.
	 */
	public function CandidatsNew () {
	
	    $query = "INSERT INTO t_coordonnees SET ";
	    $query .= "boite_postale		= '".$this->m_cand_boite_postale."', ";
		$query .= "adresse 			= '".$this->m_cand_adresse."', ";
		$query .= "site_web 		= '".$this->m_cand_url."', ";
		$query .= "ville 			= '".$this->m_cand_ville."', ";
		$query .= "pays				= '".$this->m_cand_pays."', ";
		$query .= "telephone1 		= '".$this->m_cand_telephone."', ";
		$query .= "fax				= '".$this->m_cand_fax."', ";
		$query .= "email 			= '".$this->m_cand_email."', ";
		$query .= "identifiant 		= '".$this->m_cand_username."' ";
		$this->XMyDBQuery($query);
		$query = "SELECT identifiant,id FROM t_coordonnees  ";
		$query.= "WHERE identifiant='$this->m_cand_username'";
		$this->XMyDBQuery($query);
		if (!$this->XMyDBGetResult()) {
			$this->m_cand_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_cand_result=FALSE;
			return;
		}
		$query	= "INSERT INTO t_candidat SET ";
		$query .= "nom 					= '".$this->m_cand_last_name."', ";
		$query .= "prenom				= '".$this->m_cand_first_name."', ";
		$query .= "login 				= '".$this->m_cand_username."', ";
		$query .= "password 			= '".$this->m_cand_password."', ";
		$query .= "date_inscription		= NOW(), ";
		$query .= "mot_cle				= '".$this->m_cand_keyword."', ";
		$query .= "date_naissance		= '".$this->m_cand_birth_day."', ";
		//$query .= "sexe					= '".$this->m_cand_sex."', ";
		$query .= "fonction 			= '".$this->m_cand_function."', ";
		$query .= "coordonnes			= '".$this->XMyDBresult(0, "id")."'";
		$this->XMyDBQuery($query);
	}

	public function CandidatsAddResume($pCol,$pVal){
		
		$query	= "UPDATE  t_candidat SET ";
		$query	.= "mot_cle				= '".$this->m_cand_keyword."', ";
		$query	.= "cv					= '".$this->m_cand_resume."' ";
		$query	.= "WHERE $pCol='$pVal'";
		$this->XMyDBQuery($query);	
	}
	
	
	/*public function CandidatsViewResume($pCol,$pVal){
		$query = "SELECT CV FROM t_candidat";
		$query.= "WHERE $pCol='$pVal'";
		$this->XMyDBQuery($query);
		$this->m_cand_resume	 	= $this->XMyDBresult(0, "cv");
		
	}*/
	public function CandidatsUpDate ($idcoo,$idcad) {
	
	    $query = " UPDATE t_coordonnee SET ";
	    $query .= "numero 				= 	'".$this->m_cand_boite_postale."', ";
		$query .= "rue 					= 	'".$this->m_cand_adresse."', ";
		$query .= "ville 				= 	'".$this->m_cand_ville."', ";
		$query .= "pays					= 	'".$this->m_cand_pays."', ";
		$query .= "telephone 			= 	'".$this->m_cand_telephone."', ";
		$query .= "fax					= 	'".$this->m_cand_fax."', ";
		$query	.= "email 				= 	'".$this->m_cand_email."', ";
		$query	.= "identifiant 		= 	'".$this->m_cand_username."' ";
		$query	.= "WHERE id			=	'$idcoo'";
		$this->XMyDBQuery($query);
		$query = "SELECT identifiant,id FROM t_coordonnee  ";
		$query.= "WHERE identifiant='$this->m_cand_username'";
		$this->XMyDBQuery($query);
		
		if (!$this->XMyDBGetResult()) {
			$this->m_cand_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_cand_result=FALSE;
			return;
		}
		$query	= "UPDATE INTO t_candidat SET ";
		$query .= "nom 				= '".$this->m_cand_last_name."', ";
		$query .= "prenom			= '".$this->m_cand_first_name."', ";
		$query .= "login 			= '".$this->m_cand_username."', ";
		$query .= "password 		= '".$this->m_cand_password."', ";
		$query .= "site_web			= '".$this->m_cand_url."', ";
		$query .= "fonction 		= '".$this->m_cand_function."', ";
		$query .= "coordonnes		= '".$this->XMyDBresult(0, "id")."'";
		$query	.= "WHERE id			=	'$idcad'";
		$this->XMyDBQuery($query);
		
	
	
	}
	// }}}
	// +++ {{{ XCandidatGetPhones ( pCol, pVal ) - Retourne les telephones d'un  candidat
	/**
	 * @brief Retourne les telephone d'un compte.
	 * @param string. Nom de la colonne ou faire la recherche.
	 * @param string. Valeur a rechercher.
	 */ 
	/*public function XCandidatGetPhones( $pCol, $pVal ) {
		$query = "SELECT Telephone FROM  t_candidat ";
		$query.= "WHERE $pCol='$pVal'";
		
		$this->XMyDBQuery($query);
	
		if (!$this->_result) {
			$this->m_cand_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_cand_result=FALSE;
			return;
		}
    $this->m_cand_telephone  	= $this->XMyDBresult(0, "Telephone");
    $this->m_cand_result					= $nrows;
	}*/
	// }}}
	

	//  --- {{{ Declaration descriptif variables
	
	private $m_cand_last_name;		
	private $m_cand_first_name;		
	private $m_cand_username;		
	private $m_cand_password;
	private $m_cand_function;		
	private $m_cand_birth_day;
	private $m_cand_keyword;
	private $m_cand_resume;
	private $m_cand_adresse;			
	private $m_cand_ville;					
	private $m_cand_boite_postale;		
	private $m_cand_pays;			
	private $m_cand_telephone;		
	private $m_cand_mobile;			/**< var string. Telephone portable du Candidat. */
	private $m_cand_fax;				
	private $m_cand_email;			
	private $m_cand_url;			/**< var string. Adresse web du Candidat. */
	private $m_cand_icq;			/**< var string. Identifiant ICQ du Candidat. */
	private $m_cand_infos;			
	private $m_cand_alert;			/**< var string. Flag Alerte. */
	private $m_cand_status;		
	private $m_cand_sex;	
	private $m_cand_result;
	private $m_cand_list;
	private $m_cand_statut_description;
	private $m_cand_status_libelle;
	private $m_cand_id;
	
	
	// }}}

	

}
// }}}

// Local variables:
// tab-width: 4
// c-basic-offset: 4
// End:
// vim600: noet sw=4 ts=4 fdm=marker
// vim<600: noet sw=4 ts=4
?>
