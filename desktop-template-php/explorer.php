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
        
        <?php require("sidebar.php")?>
        
        <div class="page">
            
            <!--AFFICHAGE DES DEBUGS-->
            <?php 
            $sql = "SELECT * FROM post WHERE id_user={$_SESSION['id_user']}";
            $result = $conn->query($sql);
            $row = $result->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ( $row as $post) {
                
                ?>
                <div class="mydebug">
                    
                    <div class="top">
                        
                        <div class="pic-name-post-date">
                            
                            <div class="img-container">
                                <img src="<?php echo "../image/profil_pic_user/" . $_SESSION["profile_pic"]?>">
                            </div>
                            
                            <a href=""><?php echo $_SESSION["username"]?></a>
                            <p>•</p>
                            <p>1h</p>
                            
                        </div>
                        
                        <div class="option-container">
                            
                            <img src="../image/options.png" class="option">
                            
                            <div class="option-menu">
                                
                                <div class="op share-btn">
                                    <img src="../image/partager.png" alt="Statistiques">
                                    <p>Partager</p>
                                </div>
                                
                                <div class="op state-btn">
                                    <img src="../image/privé .png" alt="lock">
                                    <p>Mettre en privé</p>
                                </div>
                                
                                <div class="op delete-btn">
                                    <img src="../image/trash.png" alt="trash">
                                    <p>Supprimer</p>
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
                        
                        <img src="../image/public.png" alt="world" class="state-simple">
                        
                        <div class="count-like">
                            <img src="../image/heart-regular-240.png" alt="like">
                            <p>
                                <?php echo $post["like_number"] ?>
                            </p>
                        </div>
                        
                        <div class="count-fav">
                            <img src="../image/bookmark-regular-240.png" alt="fav">
                            <p>
                                <?php echo $post["fav_number"] ?>
                            </p>
                        </div>
                        
                    </div>
                    
                </div>
                <?php
            }
        ?>
            <?php require("empty-page.php")?>
            
        </div>
        
        <?php require("search.php")?>
        
    </div>
    
</body>
</html>