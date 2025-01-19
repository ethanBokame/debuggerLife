<?php $userObj = new User($conn);

if (isset($_POST["send"])) {
    
    $sql = $conn->prepare(
        "UPDATE users
        SET banner = :banner
        WHERE id_user = :id_user
        ");
    
    $type = $_FILES["banner"]["type"];
    $banner = $_SESSION["id_user"] . "_" . "banner_pic." . substr($type, 6);
    $id_user = $_SESSION["id_user"];
    
    if (strpos($type, "image/") == 0) {
        
        $sql->bindValue(':banner', $banner);
        $sql->bindValue(':id_user', $id_user, PDO::PARAM_INT);
        $sql->execute();
        
        move_uploaded_file($_FILES["banner"]["tmp_name"], $banner);
        
        echo '<script>
                window.location.href = window.location.pathname; // Redirige vers la page actuelle
            </script>';
        
    }
    
}

?>

<div class="mini-profil">
    
    <img src="<?php echo(isset($_SESSION["id_user"]) ? "image/banner/" . $user["banner"] : "image/banner/banniere.png")?>" alt="background" class="banniere">
    <div class="set-banner-container">
        <img src="image/outil-crayon.png" alt="set_banner" class="set-banner">
    </div>

    <form method="post" action="" enctype="multipart/form-data" class="form-set-banner">
        <input type="file" name="banner" id="" accept="image/*">
        <input type="submit" name="send">
    </form>
    
    <div class="mini-profil-pic-container">
        <img src="<?php echo(isset($_SESSION["id_user"]) ? "image/profil_pic_user/" . $user["profile_pic"] : "image/user-2.png")?>" alt="" class="mini-profil-pic">
    </div>
    
    <p class="username"> <?php echo(isset($_SESSION["id_user"]) ? $user["username"] : "DebugBoy") ?></p>
    
    <i class="rank"> Rang : <?php echo(isset($_SESSION["id_user"]) ? $userObj->rank() : "Novice 🌱") ?> </i>
    
    <i class="progress"> (Prochain rang dans <span> <?php echo(isset($_SESSION["id_user"]) ? $userObj->progressRank() : "4") ?> Debugs !</span>) </i>
    
    <div class="stats-container">
        
        <div class="stat-block">
            
            <div class="stat stat-db">
                <img src="image/feather-pen.png" alt="">
                <div>
                    <p> <?php echo(isset($_SESSION["id_user"]) ? number_format_short($userObj->nbDebug()) : "0") ?> </p> <p>Debugs</p>
                </div>
            </div>


            <div class="stat stat-fav">
                <img src="image/bookmark-regular-240-white.png" alt="">
                <div>
                <p> <?php echo(isset($_SESSION["id_user"]) ? number_format_short($userObj->nbFav()) : "0") ?> </p> <p>Favoris</p>
                </div>
            </div>
            

            
        </div>
        
        <div class="stat-block ">
            
        <div class="stat stat-like">
                <img src="image/heart-regular-240-white.png" alt="">
                <div>
                <p> <?php echo(isset($_SESSION["id_user"]) ? number_format_short($userObj->nbLike()) : "0") ?> </p> <p>J'aime</p>
                </div>
            </div>
            
            <div class="stat stat-age">
                <img src="image/epee.png" alt="">
                <div>
                <p> <?php echo(isset($_SESSION["id_user"]) ? number_format_short($userObj->age()) : "0") ?> </p> <p>Debugger age</p>
                </div>
            </div>
            
        </div>
        
    </div>  
    
    <div class="link-container">
        <a href="#">Voir le profil complet</a>
    </div>
    
</div>