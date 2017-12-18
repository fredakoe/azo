<?php
/*
 * Nom   : class_Entreprises.php
 * Objet : Gestion descriptif informations Entreprises
 * $Id: class_Entreprises.php,v 0.1
 */
/**
 * @brief Gestion descriptif informations Entreprises.
 * @author QUENUM Roland <roland.quenum.com>
 * @date 22/08/2012
 * @version 0.1
 */

// --- {{{ class XEntreprises - Gestion descriptif information societe/comptes
/**
 * @class XEntreprises
 * @brief Gestion descriptif informations Entreprises/comptes.
 */
class Entreprises extends XHandle {

	public function EntreprisesNameGet(){
		return $this->m_ent_name;
	}
	public function EntreprisesNameSet($pName){
		$this->m_ent_name 	= $pName;
	}
	
	public function EntreprisesTypeGet(){
		return $this->m_ent_type;
	}
	public function EntreprisesTypeSet($pType){
		$this->m_ent_type	= $pType;
	}
	
	public function EntreprisesUsernameGet(){
		return $this->m_ent_username;
	}
	public function EntreprisesUsernameSet($pUsername){
		$this->m_ent_username 	= $pUsername;
	}
	
	public function EntreprisesPasswordGet(){
		return $this->m_ent_password;
	}
	public function EntreprisesPasswordSet($pPassword){
		$this->m_ent_password 	= $pPassword;
	}
	
	public function EntreprisesAdresseGet(){
		return $this->m_ent_adress;
	}
	public function EntreprisesAdresseSet($pAdresse){
		$this->m_ent_adress	 	= $pAdresse;
	}
	
	public function EntreprisesCodePostalGet(){
		return $this->m_ent_boite_postale;
	}
	public function EntreprisesCodePostalSet($pCodePostal){
		$this->m_ent_boite_postale 	= $pCodePostal;
	}
	
	public function EntreprisesVilleGet(){
		return $this->m_ent_ville;
	}
	public function EntreprisesVilleSet($pVille){
		$this->m_ent_ville 	= $pVille;
	}
	public function EntreprisesPaysGet(){
		return $this->m_ent_pays;
	}
	public function EntreprisesPaysSet($pPays){
		$this->m_ent_pays 	= $pPays;
	}
	
	public function EntreprisesTelephoneGet(){
		return $this->m_ent_telephone;
	}
	public function EntreprisesTelephoneSet($pTelephone){
		$this->m_ent_telephone 	= $pTelephone;
	}
	public function EntreprisesMobileGet(){
		return $this->m_ent_mobile;
	}
	public function EntreprisesMobileSet($pMobile){
		$this->m_ent_mobile 	= $pMobile;
	}
	public function EntreprisesFaxGet(){
		return $this->m_ent_fax;
	}
	public function EntreprisesFaxSet($pFax){
		$this->m_ent_fax 	= $pFax;
	}
	public function EntreprisesEmailGet(){
		return $this->m_ent_email;
	}
	public function EntreprisesEmailSet($pEmail){
		$this->m_ent_email 	= $pEmail;
	}
	public function EntreprisesUrlGet(){
		return $this->m_ent_url;
	}
	public function EntreprisesUrlSet($pUrl){
		$this->m_ent_url 	= $pUrl;
	}
	public function EntreprisesResultGet(){
		return $this->m_ent_result;
	}
	public function EntreprisesResultSet($pResult){
		$this->m_ent_result 	= $pResult;
	}
	public function EntreprisesLogoGet(){
		return $this->m_ent_logo;
	}
	public function EntreprisesLogoSet($pLogo){
		$this->m_ent_logo 	= $pLogo;
	}
	public function EntreprisesStatusGet(){
		return $this->m_ent_status;
	}
	public function EntreprisesStatusSet($pStatus){
		$this->m_ent_status 	= $pStatus;
	}
	public function EntreprisesCodeGet(){
		return $this->m_ent_code;
	}
	public function EntreprisesCodeSet($pCode){
		$this->m_ent_code 	= $pCode;
	}
	public function EntreprisesLibelleGet(){
		return $this->m_ent_libelle;
	}
	public function EntreprisesLibelleSet($pLibelle){
		$this->m_ent_libelle 	= $pLibelle;
	}
	public function EntreprisesDescriptionGet(){
		return $this->m_ent_description;
	}
	public function EntreprisesDescriptionSet($pDescription){
		$this->m_ent_description 	= $pDescription;
	}
	public function EntreprisesDateGet(){
		return $this->m_ent_date;
	}
	public function EntreprisesDateSet($pDate){
		$this->m_ent_date 	= $pDate;
	}
	
	public function EntreprisesStatutLibelleGet(){
		return $this->m_ent_status_libelle;
	}
	public function EntreprisesStatusLibelleSet($pStatusLibelle){
		$this->m_ent_status_libelle 	= $pStatusLibelle;
	}
	
	public function EntreprisesStatusDescriptionGet(){
		return $this->m_ent_status_description;
	}
	public function EntreprisesStatusDescriptionSet($pStatusDescription){
		$this->m_ent_status_description 	= $pStatusDescription;
	}
	
	public function EntreprisesStatusCodeGet(){
		return $this->m_ent_status_code;
	}
	public function EntreprisesStatusCodeSet($pStatusCode){
		$this->m_ent_status_code 	= $pStatusCode;
	}
	
	public function EntreprisesIdGet(){
		return $this->m_ent_id;
	}
	
	public function EntreprisesListGet($i){
		return $this->m_ent_list[$i];
	}
	public function EntreprisesListOffreGet($i){
		return $this->m_ent_list_offre[$i];
	}
	

	// +++ {{{ XEntreprisesGet ( pCol, pVal ) - Retourne les informations d'une entreprise
	/**
	 * @brief Chargement descriptif informations sur une entreprise.
	 * @param string. Nom de la colonne ou faire la recherche.
	 * @param string. Valeur a rechercher.
	 */ 
	function EntreprisesInfosGet($pCol, $pVal) {
		$this->m_ent_result			= FALSE;
		$query = "SELECT E.*,C.*,D.* FROM t_entreprise AS E ";
		$query.= "LEFT JOIN t_coordonnees AS C ON E.coordonnees = C.id ";
		$query.= "LEFT JOIN t_domaines AS D ON E.T_DOMAINES_id = D.id ";
		$query.= "WHERE E.$pCol='$pVal'";
		$this->XMyDBQuery($query);
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_ent_result=FALSE;
			return;
		}

    $this->m_ent_name     	    = $this->XMyDBresult(0, "denomination");
	$this->m_ent_type    	    = $this->XMyDBresult(0, "type");
	$this->m_ent_username	   	= $this->XMyDBresult(0, "login");
	$this->m_ent_password    	= $this->XMyDBresult(0, "password");
	$this->m_ent_logo     		= $this->XMyDBresult(0, "logo");
	$this->m_ent_date     	    = $this->XMyDBresult(0, "date_inscription");
	$this->m_ent_status 		= $this->XMyDBresult(0, "T_STATUT_INSCRIPTION_id");
	$this->m_ent_id 			= $this->XMyDBresult(0, "id");
	$this->m_ent_adress 		= $this->XMyDBresult(0, "adresse");
    $this->m_ent_boite_postale	= $this->XMyDBresult(0, "boite_postale");
    $this->m_ent_ville      	= $this->XMyDBresult(0, "ville");
    $this->m_ent_pays     		= $this->XMyDBresult(0, "pays");
    $this->m_ent_telephone 		= $this->XMyDBresult(0, "telephone1");
    $this->m_ent_email   		= $this->XMyDBresult(0, "email");	
    $this->m_ent_url     	    = $this->XMyDBresult(0, "site_web");
    $this->m_ent_fax     	    = $this->XMyDBresult(0, "fax");
    $this->m_ent_code     	    = $this->XMyDBresult(0, "code_domaine");
    $this->m_ent_libelle     	= $this->XMyDBresult(0, "libelle");
    $this->m_ent_description    = $this->XMyDBresult(0, "description");
    $this->m_ent_result			= TRUE;
   
	}
	// }}}
	
	function EntreprisesAllListeGet() {
		$query = "SELECT E.* FROM t_entreprise AS E ";
		$query.= "WHERE E.T_STATUT_INSCRIPTION_id ='1'";
		
		$this->XMyDBQuery($query);
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_ent_result=FALSE;
			return;
		}
		for ($i=0; $i< $nrows; $i++) {
		$this->m_ent_list[] = $this->XMyDBFetch_object();
		}
		return;
	}
	
		function EntreprisesAllListeOffreGet($pCol,$pVal) {
		$query = "SELECT E.*,O.* FROM t_entreprise AS E ";
		$query.= "LEFT JOIN t_offre AS O ON E.id = O.T_ENTREPRISE_id ";
		$query.= "WHERE E.$pCol='$pVal'";
			//print_r($query);

		$this->XMyDBQuery($query);
		/*if (!$this->XMyDBGetResult()) {
			$this->m_ent_result=FALSE;
			return;
		}*/
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_ent_result=FALSE;
			return;
		}
		for ($i=0; $i< $nrows; $i++) {
		$this->m_ent_list_offre[] = $this->XMyDBFetch_object();
		}
		return;
	}
	//echo $ent->m_ent_list[0]->id;
	function EntreprisesListeGet( $pCol, $pVal ) {
		
		$query = "SELECT E.*,A.* FROM t_entreprise AS E ";
		$query.= "LEFT JOIN t_coordonnee AS A ON E.coordonnees = A.id ";
		$query.= "WHERE $pCol='$pVal'";
		$this->XMyDBQuery($query);
		//if (!$this->_result) {
		if (!$this->XMyDBGetResult()) {
			$this->m_ent_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_ent_result=FALSE;
			return;
		}
		$this->m_ent_name     	    = $this->XMyDBresult(0, "denomination");
		$this->m_ent_type    	    = $this->XMyDBresult(0, "type");
		$this->m_ent_ville      	= $this->XMyDBresult(0, "ville");
		$this->m_ent_pays     		= $this->XMyDBresult(0, "pays");
		$this->m_ent_telephone 		= $this->XMyDBresult(0, "telephone");
		$this->m_ent_email   		= $this->XMyDBresult(0, "email");	
		$this->m_ent_result			= TRUE;
	}
	
	public function EntreprisesDelete ($id) {
	
		$query = "DELETE FROM t_entreprise WHERE id  = '".trim($id)."'";
		$this->XMyDBQuery($query); 
	}

	public function EntreprisesAddNew() {
	
	    $query = "INSERT INTO t_coordonnees  SET ";
	    $query .= "boite_postale	= '".$this->m_ent_boite_postale."', ";
		$query .= "adresse 		= '".$this->m_ent_adress."', ";
		$query .= "ville 		= '".$this->m_ent_ville."', ";
		$query .= "pays			= '".$this->m_ent_pays."', ";
		$query .= "telephone1 	= '".$this->m_ent_telephone."', ";
		$query .= "fax			= '".$this->m_ent_fax."', ";
		$query .= "email 		= '".$this->m_ent_email."', ";
		$query .= "site_web 	= '".$this->m_ent_url."', ";
		$query .= "identifiant 	= '".$this->m_ent_username."' ";
		$this->XMyDBQuery($query);
		$query = "SELECT C.identifiant, C.id FROM t_coordonnees AS C  ";
		//$query.= "WHERE C.identifiant='$this->m_ent_username'";
		$query.= "WHERE C.email='$this->m_ent_email'";
		$this->XMyDBQuery($query);

		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_ent_result=FALSE;
			return;
		}
		$query	= "INSERT INTO t_entreprise SET ";
		$query .= "denomination 	= '".$this->m_ent_name."', ";
		$query .= "type				= '".$this->m_ent_type."', ";
		$query .= "login 			= '".$this->m_ent_username."', ";
		$query .= "password 		= '".$this->m_ent_password."', ";
		$query .= "logo 			= '".$this->m_ent_logo."', ";
		$query .= "T_STATUT_INSCRIPTION_id 			= 1, ";
		$query .= "date_inscription = NOW(), ";
		$query .= "coordonnees		= '".$this->XMyDBresult(0, "C.id")."'";
		$this->XMyDBQuery($query);
	}
	// }}}


//  --- {{{ Declaration descriptif variables
	private $m_ent_type;			     	/**< var integer. Type du Entreprise. */
	private $m_ent_name;		         	/**< var string. Nom du Entreprise. */
	private $m_ent_username;		    	/**< var string. Login du Entreprise. */
	private $m_ent_password;		    	/**< var string. Mot de passe du Entreprise. */
	private $m_ent_ville;			  		/**< var string. Ville du Entreprise. */
	private $m_ent_date;
	private $m_ent_rue;						/**< var string. Departement du Entreprise. */
	private $m_ent_boite_postale;				/**< var string. Code postable de la ville. */
	private $m_ent_pays;			        /**< var integer. Code pays de la ville. */
	private $m_ent_telephone;				/**< var string. Telephone du Entreprise. */
	private $m_ent_mobile;					/**< var string. Telephone portable du Entreprise.*/
	private $m_ent_fax;						/**< var string. Fax du Entreprise. */
	private $m_ent_email;					/**< var string. Adresse email du Entreprise. */
	private $m_ent_url;						/**< var string. Adresse internet du Entreprise.*/
	private $m_ent_icq;						/**< var string. Identifiant ICQ du Entreprise.*/
	private $m_ent_infos;					/**< var string. Commentaires sur la societe.*/
	private $m_ent_list;		    		/**< var array. Liste descriptif Entreprises. */
	private $m_ent_result;					/**< var boolean. Etat retour. */
	private $m_ent_logo;
	private $m_ent_adress;
	private $m_ent_status;
	private $m_ent_id;
	private $m_ent_code;
	private $m_ent_libelle;
	private $m_ent_description;
	private $m_ent_list_offre;
	private $m_ent_statut_description;
	private $m_ent_status_libelle;
	
	private $m_list_save;
	// }}}

	// +++ {{{ XEntreprises () - Initialisation 
	public function Entreprises() {
	
		$this->m_ent_type				= "";
		$this->m_ent_name			    = "";
		$this->m_ent_username			= "";
		$this->m_ent_password			= "";
		$this->m_ent_numero			    = "";
		$this->m_ent_ville				= "";
		$this->m_ent_rue				= "";
		$this->m_ent_pays				= "";
		$this->m_ent_telephone			= "";
		$this->m_ent_mobile				= "";
		$this->m_ent_fax				= "";
		$this->m_ent_email				= "";
		$this->m_ent_url				= "";
		$this->m_ent_icq				= "";
		$this->m_ent_infos				= "";
		$this->m_ent_list			    = "";
		$this->m_ent_result			    = FALSE;
		$this->m_ent_logo          		="";
		$this->m_ent_adress            	="";
		$this->m_ent_date            	="";
		$this->m_ent_status            	="";
		$this->m_ent_id            		="";
		$this->m_ent_code            	="";
		$this->m_ent_libelle            ="";
		$this->m_ent_description        ="";
		$this->m_ent_list_offre			="";
		$this->m_ent_statut_description	="";	
		$this->m_ent_status_libelle		="";
		
		$this->m_list_save   		="";
		
	
	}
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
