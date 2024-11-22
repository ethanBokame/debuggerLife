<?php
require("session.php");
require("header.php");
require("conn.php");
require_once("classes/user.php");
require("fonctions.php");
?>

<body>
    
    <?php
    require("component.php");
    require("navbar.php");
    ?>
    
    <!--SYSTEME DE TABULATION ENTRE LES PAGES POUR GRAND ECRAN-->
    <div class="first-tab-system-container">
        
        <?php require("sidebar.php") ?>
        
        <div class="page">
            
            <!--AFFICHAGE DES DEBUGS-->
            <?php
            $sql = $conn->prepare("SELECT u.id_user, u.profile_pic, u.username, p.id_post, p.post_date, p.title, p.fav_number, p.like_number, p.status_post, p.link_ressource, p.description 
            FROM users u
            JOIN post p ON u.id_user = p.id_user
            JOIN favoris f ON f.id_post = p.id_post 
            WHERE f.id_user = :id_user
            ORDER BY f.fav_date DESC
            ");
            $sql->bindParam(':id_user', $_SESSION['id_user'], PDO::PARAM_INT);
            $sql->execute();
            $row = $sql->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($row as $post) {
            
            ?>
                <div class="notmydebug">
                    
                    <div class="top">
                        
                        <div class="pic-name-post-date">
                            
                            <div class="img-container">
                                <img src="<?php echo "../image/profil_pic_user/" . $post["profile_pic"] ?>">
                            </div>
                            
                            <a href=""><?php echo $post["username"] ?></a>
                            <p>•</p>
                            <p> <?php echo shortTimePost($post["post_date"]) ?> </p>
                            
                        </div>
                        
                        <div class="option-container">

                            <img src="../image/options.png" class="option">

                            <div class="option-menu">

                                <div class="op share-btn">
                                    <img src="../image/user-regular-240.png" alt="Statistiques">
                                    <p>Voir le profil</p>
                                </div>

                            </div>

                        </div>
                        
                    </div>
                    
                    <p class="title">
                        <?php echo $post["title"] ?>
                    </p>
                    
                    <div class="description">
                        <p>
                            <?php echo $post["description"] ?>
                        </p>
                    </div>
                    
                    <div class="ressource">
                        <a href="<?php echo $post["link_ressource"] ?>" target="_blank"><?php echo $post["link_ressource"] ?></a>
                    </div>
                    
                    <div class="bottom">
                        <div class="count-like">
                            <img src="../image/heart-regular-240-white.png" alt="like">
                            <p>
                                <?php echo $post["like_number"] ?>
                            </p>
                        </div>
                        <div class="count-fav">
                            <img src="../image/bookmark-regular-240-white.png" alt="fav">
                            <p>
                                <?php echo $post["fav_number"] ?>
                            </p>
                        </div>
                        <div class="share-btn">
                            <img src="../image/share-white.png" alt="Statistiques">
                            <p>Partager</p>
                        </div>
                    </div>
                    
                </div>
            <?php
            }
            ?>
            <?php require("empty-page.php") ?>
            
        </div>
        
        <?php require("mini-profil.php") ?>
        
    </div>
    
</body>

</html>