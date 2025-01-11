<?php
// En tetes json
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require("conn.php");
require("session.php");

$start_point = $_GET["start_point"];
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

// debug
$sql = "SELECT * 
FROM post 
WHERE id_user=:id_user
AND visibility='visible'
AND ($queryKeyword)
ORDER BY post_date DESC
LIMIT 15 OFFSET :start_point
";

$stmt = $conn->prepare($sql);
$stmt->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);
$stmt->bindValue(':start_point', $start_point, PDO::PARAM_INT);

// bindage de chaque mot clé
for ($i=0; $i < count($search); $i++) { 
    $stmt->bindValue(":keyword$i", '%' . $search[$i] . '%', PDO::PARAM_STR);
}

$stmt->execute();
$debug = $stmt->fetchAll(PDO::FETCH_ASSOC);

$response = [
    'debugs' => $debug
];

echo json_encode($response);

?>