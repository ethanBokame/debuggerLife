<?php
// En tetes json
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require("conn.php");
require("session.php");

$search = $_GET["query"];

$sql = "SELECT * 
FROM post 
WHERE id_user=:id_user
AND visibility='visible'
AND (
title LIKE :search OR
description LIKE :search OR
link_ressource LIKE :search 
OR code LIKE :search)
ORDER BY post_date DESC
LIMIT 15 OFFSET 0
";

$stmt = $conn->prepare($sql);
$stmt->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);
$stmt->bindValue(':search', '%' . $search . '%', PDO::PARAM_STR);
$stmt->execute();

// Récupérer les résultats
$debug = $stmt->fetchAll(PDO::FETCH_ASSOC);

$response = ['debugs' => $debug];

echo json_encode($response);

?>