<?php

require("../desktop-template-php/conn.php");
require("../desktop-template-php/session.php");

// $servername = "localhost";
// $username = "root";
// $password = "";

// try {
//     $conn = new PDO("mysql:host=$servername;dbname=debuggerlife", $username, $password);
//     // set the PDO error mode to exception
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// } catch (PDOException $e) {
//     echo "Connection failed: " . $e->getMessage();
// }

// $sql = "SELECT * FROM post";

// $result = $conn->query($sql);

// $row = $result->fetchAll(PDO::FETCH_ASSOC);

// print_r($row[1])

// $sql = "SELECT * FROM user WHERE id_user=1";
// $result = $conn->query($sql);
// $user = $result->fetch(PDO::FETCH_ASSOC);

// echo $user["username"]

// $sql = "SELECT * FROM user WHERE id_user=1";
// $result = $conn->query($sql);
// $user = $result->fetchAll(PDO::FETCH_ASSOC);

// print_r($user)



// foreach ($_SERVER as $key => $item) {
//     echo $key . " : " . $item . "<br><br>";
// }

// $sql = "SELECT * FROM post WHERE id_user!={$_SESSION['id_user']} AND status_post!='private'";
// $result = $conn->query($sql);
// $row = $result->fetchAll(PDO::FETCH_ASSOC);

// foreach ($row as $item) {
//     $id_user_array[] = $item["id_user"];
// }

// print_r($id_user_array)

$sql = $conn->prepare("SELECT l.id_post
FROM users u
JOIN post p ON u.id_user = p.id_user
JOIN likes l ON l.id_post = p.id_post 
WHERE l.id_user = :id_user
");
$sql->bindParam(':id_user', $_SESSION['id_user'], PDO::PARAM_INT);
$sql->execute();
$row = $sql->fetchAll(PDO::FETCH_COLUMN);

print_r($row);

// foreach ($row as $item) {
//     echo $item["id_post"] . "<br>";
// }

echo in_array(2 , $row);

?>