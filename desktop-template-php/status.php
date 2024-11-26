<?php 
require("conn.php");
require("session.php");

$id_post = $_GET["id_post"];
$status = $_GET["status"];

// Changement du status du debug
$sql = $conn->prepare("UPDATE post SET status_post = :status_post WHERE id_post = :id_post");
$sql->execute([
    ":id_post" => $id_post,
    ":status_post" => $status
]);
?>