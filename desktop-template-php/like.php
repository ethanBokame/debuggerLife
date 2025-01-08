<?php 
require("conn.php");
require("session.php");

$id_post = $_GET["id_post"];
$id_user = $_SESSION["id_user"];
$step = (int) $_GET["step"];

// Incrémentation ou décrémentation du nombre de likes du debug
$sql = $conn->prepare("UPDATE post SET like_number = like_number + :step WHERE id_post = :id_post");

$sql->bindValue(':id_post', $id_post);
$sql->bindValue(':step', $step, PDO::PARAM_INT);

$sql->execute();

// Ajout ou retrait du debug de la table contenant les debugs likés de l'user
$sql = $step == 1 ? "INSERT INTO likes (id_user, id_post) VALUES ($id_user, $id_post)" : "DELETE FROM likes WHERE id_post = $id_post AND id_user = $id_user";
$conn->query($sql);
?>