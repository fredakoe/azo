<html>
 <head>
  <title>Test PHP</title>
 </head>
 <body>

<?php
echo 'Page de test du site AZO!!!!';

$link = mysql_connect('142.4.214.151:3306', 'azouser', 'azouser', false) or die('ERREUR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

$db_selected = mysql_select_db('azo3', $link);
if (!$db_selected) {
   die ('Impossible de sélectionner la base de données : ' . mysql_error());
}

$result = mysql_query('select * from t_offre');
echo 'nb == '.mysql_num_rows($result).'\n'.$result;
$rec = 0;
 while ($ligr=mysql_fetch_assoc($result)) {
    $rec++;
   $title   = $ligr["titre"] ;
   $desc    = $ligr["description"] ;
   echo "<p> offre n° $rec : titre = $title ==> $desc </p>\n";
 } 

?>
</body>
</html>
