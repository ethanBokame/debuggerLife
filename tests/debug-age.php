
<?php 
require("../desktop-template-php/fonctions.php");
//     require("../desktop-template-php/conn.php");
//     $sql = $conn->prepare("SELECT * FROM users WHERE id_user= :id_user");
//     $sql->bindValue(':id_user', 1, PDO::PARAM_INT);
//     $sql->execute();
//     $user = $sql->fetch(PDO::FETCH_ASSOC);

//     $signup_date = new DateTime($user["signup_date"]);
//     echo "Date d'inscription: " . $signup_date->format("Y-m-d");
//     echo "<br>";
//     echo "Date actuelle: " . date("Y-m-d");
//     echo "<br>";

// $origin = new DateTimeImmutable($signup_date->format("Y-m-d"));
// $target = new DateTimeImmutable(date("Y-m-d"));
// $interval = new DateInterval('P32D');
// $interval = $origin->diff($target);
// echo $interval->format('%a');

echo number_format_short("1505");
?>