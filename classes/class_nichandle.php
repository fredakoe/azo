<?php
/*
 * Nom   : class_nichandle.php
 * Objet : Gestion descriptif nic-handle
 * $Id: class_nichandle.php,v 1.0 2005/05/17 09:14:23 lilian Exp $
 *
 */
/**
 * @file class_nichandle.php
 * @brief Gestion descriptif nic-handle.
 * @remarks Refonte de la classe utilisee dans Promonitor.
 * @author LABAYLE Lilian <llabayle@ecritel.net>
 * @date 17/05/2005
 * @version 1.0
 */

// --- {{{ class XHandle - Gestion descriptif nic-handle
/**
 * @class XHandle class_nichandle.php.
 * @brief Gestion descriptif nic-handle.
 */
class XHandle extends XMyDB {

	private $m_XH_Result;			/**< variable membre boolean. Resultat de l'operation. */
	private $m_XH_NicHandle;		/**< variable membre string. Nic-handle. */
	private $m_XH_NicPasswd;		/**< variable membre string. Mot de passe. */
	private $m_XH_NicPasswdEnc;		/**< variable membre string. Mot de passe crypte. */
	private $m_XH_LastName;			/**< variable membre string. Nom de l'utilisateur. */
	private $m_XH_FirstName;		/**< variable membre string. Prenom de l'utilisateur. */
	private $m_XH_HandleCode;		/**< variable membre string. Code Handle. */
   
    private $m_status_code ;
	private $m_status_libelle;
	private	$m_status_description;
	private $m_domaine_code ;
	private $m_domaine_libelle;
	private	$m_domaine_description;
	private	$m_domaine_Id;
	private $m_offre_status_code ;
	private $m_offre_status_libelle;
	private	$m_offre_status_description;
	private $m_experience_code ;
	private $m_experience_libelle;
	private	$m_experience_description;
	private $m_type_code ;
	private $m_type_libelle;
	private	$m_type_description;
	private $m_candidat_id;
	private $m_offre_id;
	private $m_entreprise_id;
	private $m_list_save;
	private $m_result;
	
	public function CandidatIdGet(){
		return $this->m_candidat_id;
	}
	public function CandidatIdSet($pCand){
		$this->m_candidat_id 	= $pCand;
	}
	public function EntrepriseIdGet(){
		return $this->m_entreprise_id;
	}
	public function EntrepriseIdSet($pEnt){
		$this->m_entreprise_id 	= $pEnt;
	}
	public function OffreIdGet(){
		return $this->m_offre_id;
	}
	public function OffreIdSet($pOffre){
		$this->m_offre_id 	= $pOffre;
	}
	
	public function StatusCodeGet(){
		return $this->m_status_code;
	}
	public function StatusCodeSet($pStatus){
		$this->m_status_code 	= $pStatus;
	}
	public function StatusLibelleGet(){
		return $this->m_status_libelle;
	}
	public function StatusLibelleSet($pLib){
		$this->m_status_libelle 	= $pLib;
	}
	public function StatusDescriptionGet(){
		return $this->m_status_description;
	}
	public function StatusDescriptionSet($pDesc){
		$this->m_status_description 	= $pDesc;
	}
	public function DomaineCodeGet(){
		return $this->m_Domaine_code;
	}
	public function DomaineCodeSet($pDomaine){
		$this->m_domaine_code 	= $pDomaine;
	}
	public function DomaineLibelleGet(){
		return $this->m_domaine_libelle;
	}
	public function DomaineLibelleSet($pLib){
		$this->m_domaine_libelle 	= $pLib;
	}
	public function DomaineDescriptionGet(){
		return $this->m_domaine_description;
	}
	public function DomaineDescriptionSet($pDesc){
		$this->m_domaine_description 	= $pDesc;
	}
	public function DomaineIdGet(){
		return $this->m_domaine_Id;
	}

	public function OffreSstatusCodeGet(){
		return $this->m_offre_status_code;
	}
	public function OffreStatusCodeSet($poffre_status){
		$this->m_offre_status_code 	= $poffre_status;
	}
	public function OffreStatusLibelleGet(){
		return $this->m_offre_status_libelle;
	}
	public function OffreStatusLibelleSet($pLib){
		$this->m_offre_status_libelle 	= $pLib;
	}
	public function OffreStatusDescriptionGet(){
		return $this->m_offre_status_description;
	}
	public function OffreStatusDescriptionSet($pDesc){
		$this->m_offre_status_description 	= $pDesc;
	}
	public function ExperienceCodeGet(){
		return $this->m_experience_code;
	}
	public function ExperienceCodeSet($pexperience){
		$this->m_experience_code 	= $pexperience;
	}
	public function ExperienceLibelleGet(){
		return $this->m_experience_libelle;
	}
	public function ExperienceLibelleSet($pLib){
		$this->m_experience_libelle 	= $pLib;
	}
	public function ExperienceDescriptionGet(){
		return $this->m_experience_description;
	}
	public function ExperienceDescriptionSet($pDesc){
		$this->m_experience_description 	= $pDesc;
	}
	
	public function TypeCodeGet(){
		return $this->m_type_code;
	}
	public function TypeCodeSet($ptype){
		$this->m_type_code 	= $ptype;
	}
	public function TypeLibelleGet(){
		return $this->m_type_libelle;
	}
	public function TypeLibelleSet($pLib){
		$this->m_type_libelle 	= $pLib;
	}
	public function TypeDescriptionGet(){
		return $this->m_type_description;
	}
	public function TypeDescriptionSet($pDesc){
		$this->m_type_description 	= $pDesc;
	}
	public function ListSaveGet($i){
		return $this->m_list_save[$i];
	}
	
	public function ResultGet(){
		return $this->m_result;
	}
	public function ResultSet($pResult){
		$this->m_result 	= $pResult;
	}
	
	// +++ {{{ XHandle() - Initialisation 
	/**
	 * @brief Instanciation de la classe.
	 */
	public function  XHandle( $code = "AZO") {
		$this->m_XH_Result		= FALSE;
		$this->m_XH_NicHandle	= "";
		$this->m_XH_NicPasswd	= "";
		$this->m_XH_NicPasswdEnc	= "";
		$this->m_XH_LastName		= "";
		$this->m_XH_FirstName	= "";
		$this->m_XH_HandleCode	= $code;
		$this->m_list_save   		="";
		$this->m_result= FALSE;
	}
	// }}}

	// +++ {{{ XHandleNew( table, col, passw, crypt firstname, lastname ) - Creation d'un Nic-handle et de son mot de passe 
	/**
	 * @brief Creation d'un Nic-handle et de son mot de passe.
	 * @param string. Table descriptif nic-handle.
	 * @param string. Colonne descriptif nic-handle.
	 * @param integer. Generation d'un mot de passe.
	 * @param integer. Cryptage du mot de passe.
	 * @param string. Colonne descriptif nic-handle.
	 * @param string. Prenom de l'utilisateur
	 * @param string. Nom de l'utilisateur
	 * @public
	 */
	public function  XHandleNew( $table, $col, $passw = 0, $crypt = 0, $firstname = "", $lastname="") {
		$this->m_XH_FirstName = $firstname;
		$this->m_XH_LastName  = $lastname;
		$this->m_XH_Result	 = TRUE;
		$this->generate(); 
		$flag = $this->XHandleExist( $table, $col, $this->m_XH_NicHandle);
		$loop = 0;
		while ($flag) {
			// Le nic existe deja, nouvelle tentative (5 maxi)
			sleep(1);
			$this->generate(); 
			$flag = $this->XHandleExist( $table, $col, $this->m_XH_NicHandle);
			$loop++;
			if ($loop == 5) { 
				if ($lastname != "") {
					// Tentative avec descriptif carateres aleatoires pour remplacer le nom
					// uniquement si le nom existait aux tentatives precedentes 
					$loop = 0;
					$lastname = "";
					$this->m_XH_FirstName = "";
					$this->m_XH_LastName  = "";
					// 5 nouvelles - et dernieres - tentatives
				} else { 
					$this->m_XH_Result = FALSE;
					$flag = FALSE;
				}
			}
		}
		// Generation du mot de passe
		if ($passw) {
			$this->autopasswd();
			if ($crypt) { $this->cryptpasswd(); }
		}
	}
	// }}}

	// +++ {{{ XHandleExist( table, col, nic ) - Verification de l'existance d'un nic-handle 
	/**
	 * @brief Verification de l'existance d'un nic-handle.
	 * @param string. Table descriptif nic-handle.
	 * @param string. Colonne descriptif nic-handle.
	 * @param string. Nic-handle a verifier.
	 * @return integer. Booleen (0/1) vrai ou faux
	 * @public
	 */
	public function  XHandleExist( $table, $col, $nic ) {
		$query = "SELECT COUNT(*) as rows FROM $table WHERE $col = '$nic'";
		$this->XMyDBQuery($query);
		$res = $this->XMyDBResult(0,"rows"); 
		if ($res <= 0) { return FALSE; }
		return TRUE;
	}
	// }}}
	public function  AddNewDomaines (){
		
		$query	= 	"INSERT INTO t_domaines SET ";
	    $query 	.=	"code_domaine	= '".$this->m_domaine_code."', ";
		$query	.=	"libelle		= '".$this->m_domaine_libelle."', ";
		$query	.=	"description 	= '".$this->m_domaine_description."'";
		$this->XMyDBQuery($query);
	}
	
	public function GetDomaineId($pVal,$pTabVal){
		
		$query = "SELECT D.* FROM t_domaines AS D ";
		$query.= "'WHERE D.$pTabVal ='$pVal'";
		$this->XMyDBQuery($query);
		
		/*if (!$this->XMyDBGetResult()) {
			$this->m_result= FALSE;
			return;
		}*/
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_result=FALSE;
			return;
		}
		$this->m_domaine_Id = $this->XMyDBresult(0, "D.id");
	}

	public function AddDomaine($pDom,$pVal,$pTable,$pTableVal){

		$query = "SELECT D.* FROM t_domaines AS D ";
		$query.= "WHERE D.$pTableVal ='$pDom'";
		$this->XMyDBQuery($query);

		/*if (!$this->XMyDBGetResult()) {
			$this->m_result= FALSE;
			return;
		}*/
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_result=FALSE;
			return;
		}
		$query	=  "UPDATE $pTable SET ";
		$query	.= "T_DOMAINES_id	= '".$this->XMyDBresult(0, "D.id")."'";
		$query	.= "WHERE id='$pVal'";
		$this->XMyDBQuery($query);
	}
	
	public function  AddNewStatus (){
		
		$query	= 	"INSERT INTO t_statut_inscription  SET ";
	    $query 	.=	"code_statut	= '".$this->m_status_status."', ";
		$query	.=	"libelle		= '".$this->m_status_libelle."', ";
		$query	.=	"description 	= '".$this->m_status_description."'";
		$this->XMyDBQuery($query);
		
	}

	public function AddStatus($pStatus="1",$pVal,$pTable){
		$query = "SELECT S.* FROM t_statut_inscription AS S  ";
		$query.= "WHERE S.code_statut ='$pStatus'";
		$this->XMyDBQuery($query);
		/*if (!$this->XMyDBGetResult()) {
			$this->m_result=FALSE;
			return;
		}*/
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_result=FALSE;
			return;
		}
	
		$query	=  "UPDATE $pTable SET ";
		$query	.= "T_STATUT_INSCRIPTION_id	= '".$this->XMyDBresult(0, "S.id")."'";
		$query	.= "WHERE login='$pVal'";
		$this->XMyDBQuery($query);
	}
	
	public function  AddNewExperience(){
		
		$query	= 	"INSERT INTO t_type_experience SET ";
	    $query 	.=	"code_type	    = '".$this->m_experience_code."', ";
		$query	.=	"libelle		= '".$this->m_experience_libelle."', ";
		$query	.=	"description 	= '".$this->m_experience_description."'";
		$this->XMyDBQuery($query);
	}
	
	public function  AddNewOffreStatus(){
		
		$query	= 	"INSERT INTO t_statut_offre SET ";
	    $query 	.=	"code_statut	= '".$this->m_offre_status_code."', ";
		$query	.=	"libelle		= '".$this->m_offre_status_libelle."', ";
		$query	.=	"description 	= '".$this->m_offre_status_description."'";
		$this->XMyDBQuery($query);
	}
	
	public function  AddNewOffreType(){
		
		$query	= 	"INSERT INTO t_type_offre SET ";
	    $query 	.=	"code_type		= '".$this->m_type_code."', ";
		$query	.=	"libelle		= '".$this->m_type_libelle."', ";
		$query	.=	"description 	= '".$this->m_type_description."'";
		$this->XMyDBQuery($query);
	}
	
	public function  AddToOffreSave (){
		
		$query	= 	"INSERT INTO t_offres_sauvegardees SET ";
	    $query 	.=	"T_CANDIDAT_Id				= '".$this->m_candidat_id."', ";
		$query	.=	"T_OFFRE_id					= '".$this->m_offre_id."', ";
		$query	.=	"T_OFFRE_T_ENTREPRISE_id 	= '".$this->m_entreprise_id."'";
		$this->XMyDBQuery($query);
	}
	
	public function  AddToOffreEntreprise (){
		
		$query	= 	"INSERT INTO   t_offre_entreprises SET ";
		$query	.=	"T_OFFRE_id					= '".$this->m_offre_id."', ";
		$query	.=	"T_ENTREPRISE_id 	= '".$this->m_entreprise_id."'";
		$this->XMyDBQuery($query);
	}
	
	public function  AddToEntrepriseSave (){
		
		$query	= 	"INSERT INTO t_offres_sauvegardees SET ";
	    $query 	.=	"T_CANDIDAT_Id				= '".$this->m_candidat_id."', ";
		$query	.=	"T_OFFRE_T_ENTREPRISE_id 	= '".$this->m_entreprise_id."',";
		$this->XMyDBQuery($query);
	}
	
	public function  AllListSaveGet($pCol,$pVal){
		
		$query = "SELECT O.* FROM t_offres_sauvegardees AS O ";
		$query.= "WHERE O.$pCol='$pVal'";
		
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
		$this->m_list_save[] = $this->XMyDBFetch_object();
		}
		return;
		
	}
	

	// +++ {{{ generate() - Generation d'un nic-handle 
	/**
	 * @brief Generation d'un nic-handle.
	 * @private
	 */
	private function  generate() {
		if (($this->m_XH_FirstName == "") || (!preg_match("/[A-Z-a-z]/", substr($this->m_XH_FirstName,0,1))))
			$first = $this->randomchar();
		else
			$first  = strtoupper(substr($this->m_XH_FirstName,0,1));
		if (($this->m_XH_LastName == "") || (!preg_match("/[A-Z-a-z]/", substr($this->m_XH_LastName,0,1))))
			$second = $this->randomchar();
		else
			$second = strtoupper(substr($this->m_XH_LastName,0,1));
		$this->m_XH_NicHandle = $first . $second . $this->randomid() . "-" . $this->m_XH_HandleCode;
	}
	// }}}
	
	

	// +++ {{{ __randonid() - Retourne une chaine entre 0001 et 9999 
	/**
	 * @brief Retourne une chaine entre 0001 et 9999 aleatoirement.
	 * @return integer. Une chaine entre 0001 et 9999.
	 * @private
	 */
	private function  randomid() {
		return sprintf("%04d",rand(1, 9999));
	}
	// }}}

	// +++ {{{ randomchar() - Generation d'un caractere 
	/**
	 * @brief Retourne un caractere aleatoirement 
	 * @return char. Un caractere aleatoire.
	 * @private
	 */
	private function  randomchar() {
		return Chr(rand(65, 90));
	}
	// }}}

	// +++ {{{ autopasswd() - Generation automatique d'un password 
	/**
	 * @brief Genere un mot de passe.
	 * @remarks  Si aucun password n'est fourni, alors il est genere automatiquement. 
	 * @private
	 */
	private function  autopasswd() {
		$password       = "";
		$passwordLength = 8;
		for ($index = 1; $index <= $passwordLength; $index++) {
			$randomNumber = rand(1, 62);
			if ($randomNumber < 11) {
				$password .= Chr($randomNumber + 48 - 1); // [ 1,10] => [0,9]
			} else if ($randomNumber < 37) {
				$password .= Chr($randomNumber + 65 - 10); // [11,36] => [A,Z]
			} else {
				$password .= Chr($randomNumber + 97 - 36); // [37,62] => [a,z]
			}
		}
		$this->m_XH_NicPasswd = $password;
	}
	// }}}
	
	// +++ {{{ cryptpasswd() - Cryptage d'un password 
	/**
	 * @brief Cryptage d'un mot de passe.
	 * @return string. Mot de passe crypte. 
	 * @private
	 */
	private function  cryptpasswd() {
		$this->m_XH_NicPasswdEnc = crypt($this->m_XH_NicPasswd);
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
