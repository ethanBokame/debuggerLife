<?php
// En tetes json
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require("conn.php");
require("session.php");

$search = explode(',', $_GET["query"]);

// Fonction pour former la requête des mots clés dynamiquement
function queryWithKeyword($search) {
    $final_query = "";
    
    for ($i=0; $i < count($search); $i++) { 
        $final_query .= 
        "(title LIKE :keyword$i OR description LIKE :keyword$i OR link_ressource LIKE :keyword$i OR code LIKE :keyword$i)";
        $final_query .= $i < count($search) - 1 ? " AND " : "";
    }
    
    return $final_query;
}
$queryKeyword = queryWithKeyword($search);

// Nombres de lignes totales pouvant être retournées
$sql = "SELECT COUNT(*)
FROM users u
JOIN post p ON u.id_user = p.id_user
JOIN favoris f ON f.id_post = p.id_post 
WHERE f.id_user = :id_user
AND ($queryKeyword)
";

$stmt = $conn->prepare($sql);
$stmt->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);

// bindage de chaque mot clé
for ($i=0; $i < count($search); $i++) { 
    $stmt->bindValue(":keyword$i", '%' . $search[$i] . '%', PDO::PARAM_STR);
}

$stmt->execute();
$nb_total_debug = $stmt->fetchColumn();

// debug
$sql = "SELECT u.id_user, u.profile_pic, u.username, p.id_post, p.code, p.post_date, p.title, p.fav_number, p.like_number, p.status_post, p.link_ressource, p.description, p.link_picture
FROM users u
JOIN post p ON u.id_user = p.id_user
JOIN favoris f ON f.id_post = p.id_post 
WHERE f.id_user = :id_user
AND ($queryKeyword)
ORDER BY p.post_date DESC
LIMIT 15 OFFSET 0
";

$stmt = $conn->prepare($sql);
$stmt->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);

// bindage de chaque mot clé
for ($i=0; $i < count($search); $i++) { 
    $stmt->bindValue(":keyword$i", '%' . $search[$i] . '%', PDO::PARAM_STR);
}

$stmt->execute();
$debug = $stmt->fetchAll(PDO::FETCH_ASSOC);

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

$response = [
    'total' => $nb_total_debug,
    'debugs' => $debug,
    'likesArray' => $likes_debug_array,
    'favArray' => $fav_debug_array
];
echo json_encode($response);

?>