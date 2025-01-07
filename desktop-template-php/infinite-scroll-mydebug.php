<?php
// En tetes json
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require("conn.php");
require("session.php");

$start_point = $_GET["start_point"];

$sql = $conn->prepare(
    "SELECT * 
    FROM post
    WHERE id_user=:id_user
    AND visibility='visible'
    ORDER BY post_date DESC
    LIMIT 15 OFFSET :start_point
    "
);
$sql->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);
$sql->bindValue(':start_point', $start_point, PDO::PARAM_INT);
$sql->execute();
$response = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($response);

?>