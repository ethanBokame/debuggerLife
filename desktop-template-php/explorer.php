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
            <!--spinner au chargement-->
            <div class="loader"></div>
            
            <!--AFFICHAGE DES DEBUGS-->
            <div class="debug-container">
            <?php
            
            // Chargement des debugs
            if (isset($_SESSION["id_user"])) {
                $sql = $conn->prepare("SELECT u.id_user, u.profile_pic, u.username, p.id_post, p.code, p.post_date, p.title, p.fav_number, p.like_number, p.status_post, p.link_ressource, p.description, p.link_picture 
                FROM users u 
                JOIN post p 
                ON u.id_user=p.id_user
                WHERE u.id_user!=:id_user AND p.status_post!='private' AND visibility='visible'
                ORDER BY p.post_date DESC
                LIMIT 15 OFFSET 0
                ");
                $sql->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);

                $sql->execute();
                $row = $sql->fetchAll(PDO::FETCH_ASSOC);

                // Tableau contenant les identifiants des debugs liké par l'utilisateur
                $sql = $conn->prepare("SELECT l.id_post
                FROM users u
                JOIN post p ON u.id_user = p.id_user
                JOIN likes l ON l.id_post = p.id_post 
                WHERE l.id_user = :id_user
                ");
                $sql->bindParam(':id_user', $_SESSION['id_user'], PDO::PARAM_INT);
                $sql->execute();
                $likes_debug_array = $sql->fetchAll(PDO::FETCH_COLUMN);
                
                // Tableau contenant les identifiants des debugs mis en favoris par l'utilisateur
                $sql = $conn->prepare("SELECT f.id_post
                FROM users u
                JOIN post p ON u.id_user = p.id_user
                JOIN favoris f ON f.id_post = p.id_post 
                WHERE f.id_user = :id_user
                ");
                $sql->bindParam(':id_user', $_SESSION['id_user'], PDO::PARAM_INT);
                $sql->execute();
                $fav_debug_array = $sql->fetchAll(PDO::FETCH_COLUMN);
                }
            
            // Si aucun compte n'est connecté
            else {
                $sql = $conn->prepare("SELECT u.id_user, u.profile_pic, u.username, p.id_post, p.code, p.post_date, p.title, p.fav_number, p.like_number, p.status_post, p.link_ressource, p.description, p.link_picture 
                FROM users u 
                JOIN post p 
                ON u.id_user=p.id_user
                WHERE p.status_post!='private' AND visibility='visible'
                ORDER BY p.post_date DESC
                LIMIT 15 OFFSET 0
                ");

                $sql->execute();
                $row = $sql->fetchAll(PDO::FETCH_ASSOC);

                $likes_debug_array = [];
                $fav_debug_array = [];
            }


            

            
            foreach ($row as $post) {
            
            ?>
                <div class="notmydebug old-debug" id-post="<?php echo $post["id_post"] ?>" redirect-big-debug>
                    
                    <div class="top" redirect-big-debug>
                        
                        <div class="pic-name-post-date">
                            
                            <div class="img-container">
                                <img src="<?php echo "image/profil_pic_user/" . $post["profile_pic"] ?>">
                            </div>
                            
                            <a href=""><?php echo $post["username"] ?></a>
                            <p redirect-big-debug>•</p>
                            <p redirect-big-debug> <?php echo shortTimePost($post["post_date"]) ?> </p>
                            
                        </div>
                        
                        <div class="option-container">
                            
                            <img src="image/options.png" class="option">
                            
                            <div class="option-menu">
                                
                                <div class="op">
                                    <img src="image/user-regular-240.png" alt="profil">
                                    <p>Voir le profil</p>
                                </div>

                                <div class="op warning-op">
                                    <img src="image/point-dexclamation2.png" alt="profil">
                                    <p>Signaler le debug</p>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <p class="title" <?php echo (empty($post["description"])) ? 'style="margin: -12px 0 1px 0"' : "" ?> redirect-big-debug>
                        <?php echo $post["title"] ?>
                    </p>
                    
                    <div class="description" <?php echo (empty($post["description"])) ? 'style="margin: -10px"' : "" ?> redirect-big-debug>
                        <p redirect-big-debug>
                            <?php echo $post["description"] ?>
                        </p>
                    </div>
                    
                    <div class="ressource">
                        <a href="<?php echo $post["link_ressource"] ?>" target="_blank"><?php echo $post["link_ressource"] ?></a>
                    </div>
                    
                    <div class="img-debug" <?php echo(empty($post["link_picture"])) ? 'style="display:none"' : 'style="margin-bottom: -4px"' ?>>
                        <div class="img-debug-bg" style="background-image: url('<?php echo $post["link_picture"]; ?>');"></div>
                        <img src="<?php echo $post["link_picture"] ?>" alt="debug-image">
                    </div>

                    <div class="code" <?php echo (empty($post["code"])) ? 'style="display:none"' : "" ?>>
                        <div class="header">
                            <p>code</p>
                            <div class="copy-code-container">
                            <img src="image/copy-regular-240.png" alt="">
                            <p>Copier le code</p>
                            </div>
                        </div>
                        <pre>
                        <code><?php echo $post["code"] ?></code>
                        </pre>
                    </div>
                    
                    <div class="bottom" redirect-big-debug>
                        
                        <div class="count-like" <?php echo(in_array($post["id_post"], $likes_debug_array)) ? 'style="color: rgb(249, 24, 128)"' : "" ?>>
                            <img src="<?php echo(in_array($post["id_post"], $likes_debug_array)) ? "image/heart-solid-240-pink.png" : "image/heart-regular-240-white.png" ?>" alt="like">
                            <p>
                                <?php echo $post["like_number"] ?>
                            </p>
                        </div>
                        
                        <div class="count-fav" <?php echo(in_array($post["id_post"], $fav_debug_array)) ? 'style="color: rgb(255, 193, 7)"' : "" ?>>
                            <img src="<?php echo(in_array($post["id_post"], $fav_debug_array)) ? "image/bookmark-solid-240-or.png" : "image/bookmark-regular-240-white.png" ?>" alt="fav">
                            <p>
                                <?php echo $post["fav_number"] ?>
                            </p>
                        </div>
                        
                        <div class="copy-btn" <?php echo (empty($post["link_ressource"])) ? 'style="display:none"' : "" ?>>
                            <img src="image/copier.png" alt="copier">
                        </div>
                        
                        <div class="share-btn">
                            <img src="image/share-white.png" alt="share">
                        </div>
                        
                    </div>
                    
                </div>
            <?php
            }
            ?>
            </div>
            <?php require("empty-page.php") ?>
            
        </div>
        
        <?php require("mini-profil.php") ?>
        
    </div>
    
</body>

</html>