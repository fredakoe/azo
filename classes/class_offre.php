<?php

/*
 * Nom   : class_offre.php
 * Objet : Gestion descriptif informations d'offres
 * $Id: class_offre.php,v 1.0
 */
/**
 * @brief Gestion descriptif informations d'offres.
 * @author QUENUM Roland <roland.quenum@gmail.com>
 * @date 10/01/2013
 * @version 1.0
 */

// --- {{{ class XOffre - Gestion descriptif informations d'offres
/**
 * @class XOffre
 * @brief Gestion descriptif informations contacts/comptes.
 */
class Offres extends XHandle {

		//  --- {{{ Declaration descriptif variables
	private $m_off_titre;		
	private $m_off_numero;		
	private $m_off_mot_cle;			
	private $m_off_date;
	private $m_off_end_date;
	private $m_off_statut;			
	private $m_off_type;			
	private $m_off_domaine;	
	private $m_off_entreprise;	
	private $m_off_reference_azo;
	private $m_off_lieu;
	private $m_off_remuneration;
	private $m_off_description;
	private $m_off_experience;
	private $m_off_list;
	private $m_off_result;
	private $m_off_id;
	private $m_off_reference;
	// }}}
	// +++ {{{ XOffre () - Initialisation 
	public function Offre() {
		$this->m_off_titre				= "";
		$this->m_off_numero				= "";
		$this->m_off_mot_cle			= "";			
		$this->m_off_date				= "";
		$this->m_off_end_date			= "";
		$this->m_off_statut				= "";
		$this->m_off_type				= "";			
		$this->m_off_domaine			= "";	
		$this->m_off_entreprise			= "";
		$this->m_off_reference_azo		= "";
		$this->m_off_description		= "";
		$this->m_off_remuneration		= "";
		$this->m_off_experience			= "";
		$this->m_off_list			    = "";
		$this->m_off_result			    = FALSE;
		$this->m_off_id                 = "";
		$this->m_off_lieu                 = "";
		$this->m_off_reference                 = "";
	}
	// }}}
	
	public function OffresLieuGet(){
		return $this->m_off_lieu;
	}
	public function OffresLieuSet($pLieu){
		$this->m_off_lieu 	= $pLieu;
	}
	public function OffresTitreGet(){
		return $this->m_off_titre;
	}
	public function OffresTitreSet($pTitle){
		$this->m_off_titre 	= $pTitle;
	}
	public function OffresNumGet(){
		return $this->m_off_numero;
	}
	public function OffresNumSet($pNum){
		$this->m_off_numero 	= $pNum;
	}
	public function OffresKeywordGet(){
		return $this->m_off_mot_cle;
	}
	public function OffresKeywordSet($pKey){
		$this->m_off_mot_cle 	= $pKey;
	}
	public function OffresDateGet(){
		return $this->m_off_date;
	}
	public function OffresDateSet($pDate){
		$this->m_off_date 	= $pDate;
	}
	public function OffresDateEndGet(){
		return $this->m_off_end_date;
	}
	public function OffresDateEndSet($pDate){
		$this->m_off_end_date 	= $pDate;
	}
	public function OffresStatusGet(){
		return $this->m_off_statut;
	}
	public function OffresStatusSet($pStatut){
		$this->m_off_statut 	= $pStatut;
	}
	public function OffresTypeGet(){
		return $this->m_off_type;
	}
	public function OffresTypeSet($pType){
		$this->m_off_type 	= $pType;
	}
	public function OffresDomaineGet(){
		return $this->m_off_domaine;
	}
	public function OffresDomaineSet($pDom){
		$this->m_off_domaine 	= $pDom;
	}
	public function OffresDescriptionGet(){
		return $this->m_off_description;
	}
	public function OffresDescriptionSet($pDec){
		$this->m_off_description 	= $pDec;
	}
	public function OffresEntrepriseGet(){
		return $this->m_off_entreprise;
	}
	public function OffresEntrepriseSet($pEnt){
		$this->m_off_entreprise 	= $pEnt;
	}
	public function OffresReferenceAzoGet(){
		return $this->m_off_reference_azo;
	}
	public function OffresReferenceAzoSet($pRef){
		$this->m_off_reference_azo 	= $pRef;
	}
	public function OffresRemunerationGet(){
		return $this->m_off_remuneration;
	}
	public function OffresRemunerationSet($pTitle){
		$this->m_off_remuneration 	= $pTitle;
	}
	public function OffresExperienceGet(){
		return $this->m_off_experience;
	}
	public function OffresExperienceSet($pTitle){
		$this->m_off_experience 	= $pTitle;
	}
	public function OffresResultGet(){
		return $this->m_off_result;
	}
	public function OffresResultSet($pResult){
		$this->m_off_result 	= $pResult;
	}
	
	////////////////////////////////////////////////////////////////
	public function OffresIdGet(){
		return $this->m_off_id;
	}

	public function OffresListGet($i){
		return $this->m_off_list[$i];
	}

// +++ {{{ OffresInfosGet( pCol, pVal ) - Retourne les informations d'une offre
	 
	public function OffresInfosGet( $pCol, $pVal) {
		
		$this->m_off_result	= FALSE;
		
		$query = "SELECT O.*,E.*,T.*,X.*,S.*,D.* FROM t_offre AS O ";
		$query.= "LEFT JOIN t_entreprise 		AS E ON O.T_ENTREPRISE_id		= E.id ";
		$query.= "LEFT JOIN t_domaines	 		AS D ON O.T_DOMAINES_id 		= D.id ";
		$query.= "LEFT JOIN t_type_experience	AS X ON O.TYPE_EXPERIENCE_id 	= X.id ";
		$query.= "LEFT JOIN t_statut_offre		AS S ON O.STATUT_OFFRE_id		= S.id ";
		$query.= "LEFT JOIN  t_type_offre	 	AS T ON O.TYPE_OFFRE_id 		= T.id ";
		$query.= "WHERE O.$pCol='$pVal'";
		$this->XMyDBQuery($query);
		//if (!$this->_result) {
		/*if (!$this->XMyDBGetResult()) {
			$this->m_off_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_off_result=FALSE;
			return;
		}*/
		    $this->m_off_titre     	    = $this->XMyDBresult(0, "O.titre");
			$this->m_off_type    	    = $this->XMyDBresult(0, "T.libelle");
			$this->m_off_mot_cle	   	= $this->XMyDBresult(0, "O.mot_cle");
			$this->m_off_numero    		= $this->XMyDBresult(0, "O.numero");
			$this->m_off_domaine     	= $this->XMyDBresult(0, "D.libelle");
			$this->m_off_date     	    = $this->XMyDBresult(0, "O.date_depot");
		    $this->m_off_end_date       = $this->XMyDBresult(0, "O.date_fin");
			$this->m_off_statut 		= $this->XMyDBresult(0, "S.libelle");
			$this->m_off_id 			= $this->XMyDBresult(0, "O.id");
			$this->m_off_reference 		= $this->XMyDBresult(0, "O.reference_azo");
		    $this->m_off_lieu			= $this->XMyDBresult(0, "O.lieu");
		    $this->m_off_remuneration   = $this->XMyDBresult(0, "O.remuneration_an");
		    $this->m_off_description    = $this->XMyDBresult(0, "O.description");
		    $this->m_Off_experience		= $this->XMyDBresult(0, "X.libelle");
		    $this->m_off_entreprise   	= $this->XMyDBresult(0, "E.denomination");
		    $this->m_off_result			= TRUE;
	}
	// }}}
	public function OffresAllListGet() {
		$query = "SELECT O.* FROM  t_offre AS O ";
		
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
			$this->m_off_list[] = $this->XMyDBFetch_object();
		}
		
		print_r($query);
		
		return;
	}


	public function  OffresAddNew ($pCol,$pVal){
		
		$query = "SELECT E.id FROM t_entreprise AS E ";
		$query.= "WHERE $pCol='$pVal'";
		$this->XMyDBQuery($query);
		
		$query	= 	"INSERT INTO t_offre SET ";
	    $query 	.=	"titre				= '".$this->m_off_titre."', ";
		$query	.=	"numero				= '".$this->m_off_numero."', ";
		$query	.=	"mot_cle 			= '".$this->m_off_mot_cle."',";
		$query	.=	"date_depot 		= NOW(),";
		$query	.=	"date_fin 		    = '".$this->m_off_end_date."',";
		$query	.=	"reference_azo 		= '".$this->m_off_reference_azo."',";
		$query	.=	"description 		= '".$this->m_off_description."',";
		$query	.=	"lieu 				= '".$this->m_off_lieu."',";
		$query	.=	"T_ENTREPRISE_id 	= '".$this->XMyDBresult(0, "E.id")."',";
		$query	.=	"remuneration_an	= '".$this->m_off_remuneration."'";
		$this->XMyDBQuery($query);
	}
	public function OffresStatus($pStatus="1",$pVal){
		$query = "SELECT S.* FROM  t_statut_offre AS S  ";
		$query.= "WHERE S.code_statut ='$pStatus'";
		$this->XMyDBQuery($query);
		$query	=  "UPDATE  t_offre SET ";
		$query	.= "STATUT_OFFRE_id	= '".$this->XMyDBresult(0, "S.id")."'";
		$query	.= "WHERE id='$pVal'";
		$this->XMyDBQuery($query);
	}
	public function OffresExperience($pExp="1",$pVal){
		$query = "SELECT E.* FROM   t_type_experience AS E  ";
		$query.= "WHERE E.code_type ='$pExp'";
		$this->XMyDBQuery($query);
		if (!$this->XMyDBGetResult()) {
			$this->m_ent_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_ent_result=FALSE;
			return;
		}
		$query	=  "UPDATE  t_offre SET ";
		$query	.= "TYPE_EXPERIENCE_id	= '".$this->XMyDBresult(0, "E.id")."'";
		$query	.= "WHERE id='$pVal'";
		$this->XMyDBQuery($query);
	}

	public function OffresUpdate($pVal){

		$query	=  "UPDATE  t_offre SET ";
		$query 	.=	"titre				= '".$this->m_off_titre."', ";
		$query	.=	"date_depot 		= NOW(),";
		$query	.=	"date_fin 		    = '".$this->m_off_end_date."',";
		$query	.=	"description 		= '".$this->m_off_description."'";
		$query  .=  "WHERE id='$pVal'";
		$this->XMyDBQuery($query);
	}
	public function OffresCancel($pVal){

		$query	=  "UPDATE  t_offre SET ";
		$query	.=	"date_depot 		= NOW(),";
		$query	.=	"date_fin 		    = '".$this->m_off_end_date."'";
		$query  .=  "WHERE id='$pVal'";
		$this->XMyDBQuery($query);
	}

	public function OffresDelete($pVal){
		$query = "DELETE FROM t_offre WHERE id  = '".trim($pVal)."'";
		$this->XMyDBQuery($query);
	}
	public function OffresType($pType="1",$pVal){
		$query = "SELECT T.* FROM  t_type_offre AS T  ";
		$query.= "WHERE T.code_type ='$pType'";
		$this->XMyDBQuery($query);
		if (!$this->XMyDBGetResult()) {
			$this->m_ent_result=FALSE;
			return;
		}
		$nrows  = $this->XMyDBNum_rows();
		if ($nrows < 1) {
			$this->m_ent_result=FALSE;
			return;
		}
		$query	=  "UPDATE  t_offre SET ";
		$query	.= "TYPE_OFFRE_id	= '".$this->XMyDBresult(0, "T.id")."'";
		$query	.= "WHERE id='$pVal'";
		$this->XMyDBQuery($query);
	}
	}
?>
 
 

