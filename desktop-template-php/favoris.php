<?php
require("header.php");
require("conn.php");
require("session.php");
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
            $sql = "SELECT user.id_user, user.profile_pic, user.username, post.id_post, post.post_date, post.title, post.fav_number, post.      like_number, post.status_post, post.link_ressource, post.description 
            FROM user 
            JOIN post 
            JOIN favoris 
            ON user.id_user=post.id_user AND favoris.id_post=post.id_post 
            WHERE favoris.id_user={$_SESSION['id_user']}";
            $result = $conn->query($sql);
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            
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
                            <p>1h</p>
                            
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
        
        <?php require("search.php") ?>
        
    </div>
    
</body>

</html>