<?php 
require("conn.php");
require("session.php");

$id_post = $_GET["id_post"];
$id_user = $_SESSION["id_user"];

// Ajout ou retrait du debug de la table contenant les debugs likés de l'user
$sql = $conn->prepare("INSERT INTO warning_post (id_user, id_post) VALUES (:id_user, :id_post)");
$sql->execute([
                ":id_post" => $id_post,
                ":id_user" => $id_user
            ]);
?>