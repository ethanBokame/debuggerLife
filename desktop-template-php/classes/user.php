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
        $sql = $this->conn->prepare("SELECT signup_date FROM users WHERE id_user= :id_user");
        $sql->execute(['id_user' => $_SESSION["id_user"]]);
        $user_signup_date = $sql->fetchColumn();
        
        $signup_date = new DateTime($user_signup_date);
        $signup_date_format = $signup_date->format("Y-m-d");
        $current_date = date("Y-m-d");
        
        $origin = new DateTimeImmutable($signup_date_format);
        $target = new DateTimeImmutable($current_date);
        $interval = $origin->diff($target);
        
        $nb_days = $interval->format('%a');
        
        return $nb_days;
    }

    public function rank() {
        $sql = $this->conn->prepare("SELECT COUNT(*) FROM post WHERE id_user= :id_user");
        $sql->execute(['id_user' => $_SESSION["id_user"]]);
        $nbDebug = $sql->fetchColumn();

        $rank = ($nbDebug >= 0 && $nbDebug <= 4) ? "Novice 🌱" : "";
        $rank = ($nbDebug >= 5 && $nbDebug <= 9) ? "Débrouillard 🔧" : "";
        $rank = ($nbDebug >= 10 && $nbDebug <= 19) ? "Résolveur 🛠️" : "";
        $rank = ($nbDebug >= 20 && $nbDebug <= 49) ? "Contributeur Actif 🚀" : "";
        $rank = ($nbDebug >= 50 && $nbDebug <= 99) ? "Expert Debugger 🔍" : "";
        $rank = ($nbDebug >= 100 && $nbDebug <= 199) ? "Maître du Debug 🧙‍♂️ 🔍" : "";
        $rank = ($nbDebug >= 200) ? "Légende 🌟" : "";

        return $rank;
    }
    
}
