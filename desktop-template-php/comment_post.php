<?php 
require("conn.php");
require("session.php");

$id_post = $_GET["id_post"];
$id_user = $_SESSION["id_user"];
$content_comment = $_GET["content_comment"];
$status_comment = $_GET["status_comment"];

// Incrémentation ou décrémentation du nombre de likes du debug
$sql = $conn->prepare("INSERT IGNORE INTO comment_post (id_user, id_post, content_comment, status_comment) 
                        VALUES (:id_user, :id_post, :content_comment, :status_comment)");


// Exécuter la requête avec les valeurs associées
$sql->execute([
    ":id_post" => $id_post,                 // ID du post commenté
    ":id_user" => $id_user,                 // ID de l'utilisateur qui commente
    ":content_comment" => $content_comment, // Contenu du commentaire
    ":status_comment" => $status_comment    // Statut du commentaire (ex: 'first' ou 'lambda')
]);
?>