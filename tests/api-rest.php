<?php 
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require("../desktop-template-php/conn.php");
require("../desktop-template-php/session.php");

$search = "pour le ";

$sql = "SELECT u.id_user, u.profile_pic, u.username, p.id_post, p.code, p.post_date, p.title, p.fav_number, p.like_number, p.status_post, p.link_ressource, p.description, p.link_picture 
FROM users u 
JOIN post p 
ON u.id_user=p.id_user
WHERE u.id_user!=:id_user AND p.status_post!='private' AND visibility='visible' AND (title LIKE :search 
   OR description LIKE :search 
   OR link_ressource LIKE :search 
   OR code LIKE :search)
ORDER BY p.post_date DESC
";


// $sql = "SELECT id_post, title, description, link_ressource, code 
// FROM post 
// WHERE title LIKE :search 
//    OR description LIKE :search 
//    OR link_ressource LIKE :search 
//    OR code LIKE :search";

$stmt = $conn->prepare($sql);
$stmt->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);
$stmt->bindValue(':search', '%' . $search . '%', PDO::PARAM_STR);
$stmt->execute();

// Récupérer les résultats
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results)
?>