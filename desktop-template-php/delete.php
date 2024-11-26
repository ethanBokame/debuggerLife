<?php 
require("conn.php");
require("session.php");

$id_post = $_GET["id_post"];

// Changement de la visibilité d'un debug
$sql = $conn->prepare("UPDATE post SET visibility = 'hidden' WHERE id_post = :id_post");
$sql->execute([":id_post" => $id_post]);
?>