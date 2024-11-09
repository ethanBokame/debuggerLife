<?php
	session_start();
	require("conn.php");
    
    $sql = "SELECT * FROM user WHERE id_user=1";
    $result = $conn->query($sql);
    $user = $result->fetch(PDO::FETCH_ASSOC);
    
    $_SESSION["username"] = $user["username"];
    $_SESSION["profile_pic"] = $user["profile_pic"];
    $_SESSION["id_user"] = $user["id_user"];
?>