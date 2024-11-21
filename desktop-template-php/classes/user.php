<?php
class User
{
    
    private $conn;
    
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    
    public function nbDebug() {
        $sql = $this->conn->prepare("SELECT COUNT(*) FROM post WHERE id_user= :id_user");
        $sql->execute(['id_user' => $_SESSION["id_user"]]);
        $nbDebug = $sql->fetchColumn();
        return $nbDebug;
    }

    public function nbLike() {
        $sql = $this->conn->prepare("SELECT SUM(like_number) FROM post WHERE id_user= :id_user");
        $sql->execute(['id_user' => $_SESSION["id_user"]]);
        $nbDebug = $sql->fetchColumn();
        return $nbDebug;
    }

    public function nbFav() {
        $sql = $this->conn->prepare("SELECT SUM(fav_number) FROM post WHERE id_user= :id_user");
        $sql->execute(['id_user' => $_SESSION["id_user"]]);
        $nbDebug = $sql->fetchColumn();
        return $nbDebug;
    }

    public function age() {
        $signup_date = new DateTime($_SESSION["signup_date"]);
        $signup_date_format = $signup_date->format("Y-m-d");
        $current_date = date("Y-m-d");
        
        $origin = new DateTimeImmutable($signup_date_format);
        $target = new DateTimeImmutable($current_date);
        $interval = $origin->diff($target);
        
        $nb_days = $interval->format('%a');

        return $nb_days;
    }
    
}
