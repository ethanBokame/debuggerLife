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
            $sql = $conn->prepare(
                "SELECT * 
                FROM post 
                WHERE id_user=:id_user
                AND visibility='visible'
                ORDER BY post_date DESC
                LIMIT 15 OFFSET 0
                "
            );
            $sql->bindValue(':id_user', $_SESSION["id_user"], PDO::PARAM_INT);
            $sql->execute();
            $row = $sql->fetchAll(PDO::FETCH_ASSOC);

            foreach ($row as $post) {

            ?>
                <div class="mydebug old-debug" id-post="<?php echo $post["id_post"] ?>" redirect-big-debug>

                    <div class="top" redirect-big-debug>

                        <div class="pic-name-post-date">

                            <div class="img-container">
                                <img src="<?php echo "image/profil_pic_user/" . $user["profile_pic"] ?>">
                            </div>

                            <a href=""><?php echo $user["username"] ?></a>
                            <p redirect-big-debug>•</p>
                            <p redirect-big-debug> <?php echo shortTimePost($post["post_date"]) ?> </p>

                        </div>

                        <div class="option-container">          

                            <img src="image/options.png" class="option">

                            <div class="option-menu">

                                <div class="op share-btn">
                                    <img src="image/partager.png" alt="Statistiques">
                                    <p>Partager</p>
                                </div>

                                <div class="op ressource-btn">
                                    <img src="image/liens.png" alt="setter">
                                    <p>Copier le lien</p>
                                </div>

                                <div class="op modif-btn">
                                    <img src="image/outil-crayon.png" alt="setter">
                                    <p>Modifier le debug</p>
                                </div>

                                <div class="op state-btn">
                                    <img src="<?php echo ($post["status_post"] == "public") ? "image/privé .png" : "image/public.png" ?>" alt="lock">
                                    <p>
                                        <?php echo ($post["status_post"] == "public") ? "Mettre en privé" : "Mettre en public" ?>
                                    </p>
                                </div>

                                <div class="op delete-btn">
                                    <img src="image/trash.png" alt="trash">
                                    <p>Supprimer</p>
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

                    <div class="img-debug" <?php echo (empty($post["link_picture"])) ? 'style="display:none"' : "" ?>>
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

                        <img src="<?php echo ($post["status_post"] == "public") ? "image/public.png" : "image/privé .png" ?>" alt="world" class="state-simple" redirect-big-debug>

                        <div class="count-like-mydebug" redirect-big-debug>
                            <img src="image/heart-regular-240.png" alt="like" redirect-big-debug>
                            <p redirect-big-debug>
                                <?php echo $post["like_number"] ?>
                            </p>
                        </div>

                        <div class="count-fav-mydebug" redirect-big-debug>
                            <img src="image/bookmark-regular-240.png" alt="fav" redirect-big-debug>
                            <p redirect-big-debug>
                                <?php echo $post["fav_number"] ?>
                            </p>
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