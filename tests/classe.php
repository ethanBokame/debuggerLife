<?php 
require("../desktop-template-php/classes/user.php");
require("../desktop-template-php/conn.php");
    
$sql= $conn->prepare("SELECT * FROM user WHERE id_user= :id_user");
$sql->bindValue(':id_user', 1, PDO::PARAM_INT);
$sql->execute();
$user = $sql->fetch(PDO::FETCH_ASSOC);

print_r($user);

$user = new User($user["id_user"], $user["username"], $user["email"],);

echo $user->getId();
?>