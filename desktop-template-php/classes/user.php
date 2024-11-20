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
    
}
