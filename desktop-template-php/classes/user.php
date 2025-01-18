<?php
class User
{
    
    private $conn;
    
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    
    public function nbDebug() {
        $sql = $this->conn->prepare("SELECT COUNT(*) FROM post WHERE id_user= :id_user AND visibility='visible'");
        $sql->execute(['id_user' => $_SESSION["id_user"]]);
        $nbDebug = $sql->fetchColumn();
        return $nbDebug;
    }

    public function nbLike() {
        $sql = $this->conn->prepare(
            "SELECT COUNT(*) 
            FROM likes l
            JOIN post p ON l.id_post = p.id_post
            WHERE p.id_user = :id_user"
        );
        $sql->execute(['id_user' => $_SESSION["id_user"]]);
        $nbDebug = $sql->fetchColumn();
        return $nbDebug;
    }

    public function nbFav() {
        $sql = $this->conn->prepare(
            "SELECT COUNT(*) 
            FROM favoris f
            JOIN post p ON f.id_post = p.id_post
            WHERE p.id_user = :id_user"
        );
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
        $nbDebug = $this->nbDebug();

        if ($nbDebug >= 0 && $nbDebug <= 4) {
            $rank = "Novice 🌱";
        } elseif ($nbDebug >= 5 && $nbDebug <= 9) {
            $rank = "Débrouillard 🔧";
        } elseif ($nbDebug >= 10 && $nbDebug <= 19) {
            $rank = "Résolveur 🛠️";
        } elseif ($nbDebug >= 20 && $nbDebug <= 49) {
            $rank = "Contributeur Actif 🚀";
        } elseif ($nbDebug >= 50 && $nbDebug <= 99) {
            $rank = "Expert Debugger 🔍";
        } elseif ($nbDebug >= 100 && $nbDebug <= 199) {
            $rank = "Maître du Debug 🧙‍♂️";
        } elseif ($nbDebug >= 200) {
            $rank = "Légende 🌟";
        }
        
        return $rank;
    }

    
    public function progressRank() {
        $rank = $this->rank();
        $nbDebug = $this->nbDebug();
        
        if ($rank == "Novice 🌱") {
            $progressRank = 4 - $nbDebug; // Progrès pour atteindre le rang suivant
        } elseif ($rank == "Débrouillard 🔧") {
            $progressRank = 9 - $nbDebug;
        } elseif ($rank == "Résolveur 🛠️") {
            $progressRank = 19 - $nbDebug;
        } elseif ($rank == "Contributeur Actif 🚀") {
            $progressRank = 49 - $nbDebug;
        } elseif ($rank == "Expert Debugger 🔍") {
            $progressRank = 99 - $nbDebug;
        } elseif ($rank == "Maître du Debug 🧙‍♂️") {
            $progressRank = 199 - $nbDebug;
        } elseif ($rank == "Légende 🌟") {
            $progressRank = 0; // Plus de progression possible
        }
    
        return $progressRank;
    }


    
}
