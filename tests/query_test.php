<?php
$servername = "localhost";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername;dbname=debuggerlife", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

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



foreach ($_SERVER as $key => $item) {
    echo $key . " : " . $item . "<br><br>";
}
?>