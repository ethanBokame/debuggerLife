<?php
// En tetes json
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require("conn.php");
require("session.php");

$start_point = $_GET["start_point"];

if (isset($_SESSION["id_user"])) {
    // Debug
    $sql = $conn->prepare("SELECT u.id_user, u.profile_pic, u.username, p.id_post, p.code, p.post_date, p.title, p.fav_number, p.like_number, p.status_post, p.link_ressource, p.description, p.link_picture 
    FROM users u 
    JOIN post p 
    ON u.id_user=p.id_user
    WHERE u.id_user!=:id_user AND p.status_post!='private' AND visibility='visible'
    ORDER BY p.post_date DESC
    LIMIT 15 OFFSET :start_point
    ");
    $sql->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);
    $sql->bindValue(':start_point', $start_point, PDO::PARAM_INT);
    $sql->execute();
    $debug = $sql->fetchAll(PDO::FETCH_ASSOC);

    // Tableau contenant les identifiants des debugs liké par l'utilisateur
    $sql = $conn->prepare("SELECT l.id_post
    FROM users u
    JOIN post p ON u.id_user = p.id_user
    JOIN likes l ON l.id_post = p.id_post 
    WHERE l.id_user = :id_user
    ");
    $sql->bindParam(':id_user', $_SESSION['id_user'], PDO::PARAM_INT);
    $sql->execute();
    $likes_debug_array = $sql->fetchAll(PDO::FETCH_COLUMN);

    // Tableau contenant les identifiants des debugs mis en favoris par l'utilisateur
    $sql = $conn->prepare("SELECT f.id_post
    FROM users u
    JOIN post p ON u.id_user = p.id_user
    JOIN favoris f ON f.id_post = p.id_post 
    WHERE f.id_user = :id_user
    ");
    $sql->bindParam(':id_user', $_SESSION['id_user'], PDO::PARAM_INT);
    $sql->execute();
    $fav_debug_array = $sql->fetchAll(PDO::FETCH_COLUMN);

} else {
    // Debug
    $sql = $conn->prepare("SELECT u.id_user, u.profile_pic, u.username, p.id_post, p.code, p.post_date, p.title, p.fav_number, p.like_number, p.status_post, p.link_ressource, p.description, p.link_picture 
    FROM users u 
    JOIN post p 
    ON u.id_user=p.id_user
    WHERE p.status_post!='private' AND visibility='visible'
    ORDER BY p.post_date DESC
    LIMIT 15 OFFSET :start_point
    ");
    $sql->bindValue(':start_point', $start_point, PDO::PARAM_INT);
    $sql->execute();
    $debug = $sql->fetchAll(PDO::FETCH_ASSOC);

    $likes_debug_array = [];
    $fav_debug_array = [];

}

$response = [
    'debugs' => $debug,
    'likesArray' => $likes_debug_array,
    'favArray' => $fav_debug_array
];
echo json_encode($response);
