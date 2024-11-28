<?php 
require("conn.php");
require("session.php");

$id_post = $_GET["id_post"];
$id_user = $_SESSION["id_user"];
$step = (int) $_GET["step"];

// Incrémentation ou décrémentation du nombre de favoris du debug
$sql = $conn->prepare("UPDATE post SET fav_number = fav_number + :step WHERE id_post = :id_post");

$sql->bindValue(':id_post', $id_post);
$sql->bindValue(':step', $step, PDO::PARAM_INT);

$sql->execute();

// Ajout ou retrait du debug de la table contenant les debugs mis en favoris de l'user
$sql = $step == 1 ? "INSERT INTO favoris (id_user, id_post) VALUES ($id_user, $id_post)" : "DELETE FROM favoris WHERE id_post = $id_post";
$conn->query($sql);
?>