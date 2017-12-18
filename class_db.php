<?php


 /**
 * @file class_db.php
 * @brief Interface base de donnees MySql.
 * @Roland QUENUM quolino@yahoo.fr
 * @date 22/08/2012
 * Modification de la classe
 * @version 1.0
 */

// --- {{{ class XMyDB - Interface base de donnees
/**
 * @class XMyDB class_db.php.
 * @public
 */
class XMyDB {

	private $m_SQL_enum;		/**<var as an array. Liste descriptif valeurs d'un type enum. */
	private $m_SQL_lastid;		/**< var as an integer. Dernier identifiant cree. */
	private $m_dblink;			/**< var as an integer. Handle de connexion. */
	private $m_result;			/**< var as an integer. Retour d'une fonction mySql. */
	private $m_error;
	private $m_errno;
	private $m_rscount;

	// +++ {{{ XMyDB - Initialisation
	/**
	 * @brief Instanciation de la classe.
	 * @public
	 * @param param as an array. Tableau descriptif parametres de connexion.
	 */
	public function XMyDB () {
		$this->m_SQL_enum	 = "";
		$this->m_SQL_lastid	 = 0;
		$this->m_dblink       = "";
		$this->m_error		 = "";
		$this->m_errno		 = 0;
		$this->m_rscount	 = 0;
	}

	// +++ {{{ XMyDBConnect () = DBHhandle - Connexion au serveur de bases de donnees
	/**
	 * @brief Connexion au serveur mySql.
	 * @public
	 * return integer. Handle de connexion.
	 */
	public function XMyDBConnect ($_MYSQL_) {
		$conn_string = $_MYSQL_['HOST'];
		if ($_MYSQL_['PORT'] != "")
		   $conn_string .= ":".$_MYSQL_['PORT'];
		$this->m_dblink = mysql_connect($conn_string, $_MYSQL_['LOGIN'], $_MYSQL_['PASSWORD']);

		if ($this->m_dblink) {
			$status = mysql_select_db($_MYSQL_['DBNAME'], $this->m_dblink);
			if (!$status) { $this->m_dblink=FALSE; }
		}
		else
		{
			$this->m_dblink=FALSE;
		}
		$this->m_error  = mysql_error();
		$this->m_errno  = mysql_errno();

		return $this->m_dblink;
	}
	// }}}

	// +++ {{{ XMyDBQuery (query) - sql_exec
	/**
	 * @brief Execution d'une requete.
	 * @public
	 * @param query as a string. Requete sql.
	 * @return integer. Retour de l'exec.
	 */
	public function XMyDBQuery ($query) {
		$this->m_result = mysql_query($query, $this->m_dblink);
		$this->m_error  = mysql_error();
		$this->m_errno  = mysql_errno();
	}
	// }}}

	// +++ {{{ XMyDBNum_rows () = Int - Nombre d'occurances
	/**
	 * @brief Nombre d'occurances retournees par l'exec.
	 * @public
	 * return integer. Nombre d'occurances retournees par l'exec.
	 */
	public function XMyDBNum_rows () {
		$this->m_rscount = mysql_num_rows ($this->m_result);
		return $this->m_rscount;
	}
	// }}}

	// +++ {{{ XMyDBResult (id, col) = str - Contenu colonne
	/**
	 * @brief Selection descriptif resultats de l'exec.
	 * @public
	 * @param id as an integer. Numero de ligne.
	 * @param col as a string. Num de la colonne.
	 * @return string. Contenu du champs.
	 */
	public function XMyDBResult ($id=0, $col) {

		return mysql_result($this->m_result, $id, $col);
	}

	public function XMyDBGetResult() {
		return mysql_result($this->m_result,0);
	}
	// }}}

	// +++ {{{ XMyDBFetch_object () = Obj - Retourne l'objet complet
	/**
	 * @brief Selection de l'ensemble descriptif resultats.
	 * @public
	 * @return struct. Structure contenant l'ensemble descriptif resultats.
	 */
	public function XMyDBFetch_object () {
		return mysql_fetch_object($this->m_result);
	}
	// }}}

	// +++ {{{ XMyDBClose () = True/False - Fermeture
	/**
	 * @brief Fermeture de la connexion a la base.
	 * @public
	 * @return boolean. VRAI si la connexion est correctement close.
	 */
	public function XMyDBClose () {
		return mysql_close ($this->m_dblink);
	}
	// }}}

	// +++ {{{ XMyEnumList ( table, field ) = array - Liste descriptif valeurs d'un type enum
	/**
	 * @brief Liste descriptif valeurs d'un type enum.
	 * @public
	 * @param table as a string. Nom de la table.
	 * @param field as a string. Nom du champ.
	 * @return integer. Retour de l'exec.
	 */
	public function XMyEnumList($table, $field) {
		$flag   = TRUE;
		$query  = "SHOW COLUMNS FROM $table";
		unset($this->m_SQL_enum);
		$this->XMyDBQuery($query);
		while ($row = mysql_fetch_array($this->m_result)){
			if ($field != $row["Field"]) continue;
			if (ereg('enum.(.*).', $row['Type'], $str)) {
				$list = explode(',', $str[1]);
				foreach ($list as $items) { $this->m_SQL_enum[] = substr($items, 1, strlen($items)-2); }
			} else {
				$flag = FALSE;
			}
		}
		return $flag;
	}
	// }}}

	// +++ {{{ XMyDBLastId() - Retourne le dernier identifiant cree par un insert
	/**
	 * @brief Retourne le dernier identifiant cree par un insert.
	 * @public
	 * @return id as an integer. Identifiant trouve.
	 */
	public function XMyDBLastId() {
		$this->m_SQL_lastid = mysql_insert_id($this->m_dblink);
		return $this->m_SQL_lastid;
	}
	// }}}

	// +++ {{{ XMyDBFree() - Libere les ressources
	/**
	 * @brief Libere les ressources
	 * @public
	 */
	public function XMyDBFree() {
		return mysql_free_result($this->m_result);
	}
	// }}}

	public function XMyResultGet(){

		return $this->m_rscount;
	}

}
?>
