<?php
	session_start();
	require("conn.php");
    require("classes/user.php");
    
    $sql = $conn->prepare("SELECT * FROM users WHERE id_user= :id_user");
    $sql->bindValue(':id_user', 2, PDO::PARAM_INT);
    $sql->execute();
    $user = $sql->fetch(PDO::FETCH_ASSOC);

    $_SESSION["id_user"] = $user["id_user"];
    
?>