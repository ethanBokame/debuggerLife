<?php
if ($_SERVER["HTTP_HOST"] == "localhost") {
    $servername = "localhost";
    $dbname = "debuggerlife";
    $username = "root";
    $password = "";
}
else {
    $servername = "localhost";
    $dbname = "u952366364_debuggerlife";
    $username = "u952366364_admindbl";
    $password = "Footballdeethvn10$";
}


try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
