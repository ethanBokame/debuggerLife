<?php
require("session.php");
require("header.php");
require("conn.php");
?>

<body>

    <?php
    require("component.php");
    require("navbar.php");

    // Récupération des informations du post pour remplir les champs
    $sql = $conn->prepare(
        "SELECT title, description, link_ressource, status_post, link_picture, post_date, id_user
        FROM post
        WHERE id_post=:id_post
        ");
    $sql->bindValue(':id_post', $id_post_router);
    $sql->execute();
    $post = $sql->fetch(PDO::FETCH_ASSOC);

    // Initialisation des variables de session pour le remplissage des champs
    $_SESSION["title"] = $post["title"];
    $_SESSION["description"] = $post["description"];
    $_SESSION["link_ressource"] = $post["link_ressource"];
    $_SESSION["status_post"] = $post["status_post"];
    $_SESSION["link_picture"] = $post["link_picture"];

    //Ajout d'un debug dans la base de données

    // Fonction pour afficher les erreurs si elles existent
    function displayError($message, $variable)
    {
    ?>
        <div class="error error-simple" <?php echo ($variable) ? "style='display: flex;'" : "" ?>>
            <img src="image/point-dexclamation.png" alt="error">
            <p>
                <?php echo $message ?>
            </p>
        </div>
    <?php
    }

    // Initialisation des variables d'erreur
    $error_link = $error_title = $error_status = false;

    if (isset($_POST["submit_modif_debug"])) {

        // Préparation de la requete
        $sql = $conn->prepare(
        "UPDATE post
        SET 
        title = :title,
        description = :description,
        link_ressource = :link_ressource, 
        status_post = :status_post,
        link_picture = :link_picture
        WHERE id_post = :id_post"
        );

        // Traitement du formulaire
        $title = strip_tags($_POST['title']);
        $description = strip_tags($_POST['description']);
        $link_ressource = (filter_var($_POST['link_ressource'], FILTER_SANITIZE_URL));
        $status_post = empty($_POST['status_post']) ? null : $_POST['status_post'];
        $id_post = $id_post_router;

        $type = $_FILES["link_picture"]["type"];
        $post_date = str_replace([':', ' '], ['-', '-'], $post["post_date"]);
        $link_picture = empty($_FILES["link_picture"]["name"]) ? $_POST["link_picture_hidden"] : "image/debug_picture/" . $post["id_user"] . "_" . $post_date . "_" . "debug_pic." . substr($type, 6);

        // Vérification des champs
        if (empty($title) || trim($title) == '') {
            $error_title = true;
        }

        if (empty($link_ressource) || trim($link_ressource) == '') {
            $error_link = true;
        }

        if (empty($status_post)) {
            $error_status = true;
        }

        // Exécution de la requete en cas de non-erreur
        if (!$error_title && !$error_link && !$error_status) {

            $sql->bindValue(':title', $title);
            $sql->bindValue(':description', $description);
            $sql->bindValue(':link_ressource', $link_ressource);
            $sql->bindValue(':status_post', $status_post);
            $sql->bindValue(':id_post', $id_post, PDO::PARAM_INT);
            $sql->bindValue(':link_picture', $link_picture);

            $sql->execute();

            move_uploaded_file($_FILES["link_picture"]["tmp_name"], $link_picture);

            header("Location: ../mydebug");
        } else {
            // Création des variables de session pour remplir les champs de formulaires en cas d'erreur
            $_SESSION["title"] = $title;
            $_SESSION["description"] = $description;
            $_SESSION["link_ressource"] = $link_ressource;
            $_SESSION["status_post"] = $status_post;
        }
    }

    ?>

    <!--SYSTEME DE TABULATION ENTRE LES PAGES POUR GRAND ECRAN-->
    <div class="first-tab-system-container">

        <?php require("sidebar.php") ?>

        <div class="add-debug-form-container">

            <form method="post" action="" class="add-debug-form" enctype="multipart/form-data">

                <div class="header">
                    <h2>Modifier un debug</h2>
                </div>

                <hr>

                <h3>Contenu</h3>

                <i>
                    Les champs obligatoires sont marqués d'un astérisque (*).
                </i>

                <div class="entry title-debug">
                    <label for="title-debug">Titre du debug *</label>
                    <input type="text" name="title" class="title-form-add" id="title-debug" maxlength="150" required value="<?php echo $_SESSION["title"] ?>">
                    <div class="error max-count">
                        <img src="image/point-dexclamation.png" alt="error">
                        <p>
                            Le titre est trop long (100 caractères maximum).
                        </p>
                    </div>
                    <?php displayError("Le titre du debug ne doit pas être vide.", $error_title) ?>
                </div>

                <div class="entry">
                    <label for="description-debug">Description (optionnelle)</label>
                    <textarea name="description" id="description-debug" class="description-form-add" maxlength="450"><?php echo $_SESSION["description"] ?></textarea>
                    <div class="error max-count">
                        <img src="image/point-dexclamation.png" alt="eror">
                        <p>
                            La description est trop longue (350 caractères maximum).
                        </p>
                    </div>
                </div>


                <div class="entry">
                    <label for="link-debug">Lien *</label>
                    <input type="url" name="link_ressource" id="link-debug" class="url-form-add" required value="<?php echo $_SESSION["link_ressource"] ?>">
                    <?php displayError("Le lien ne doit pas être vide", $error_link) ?>
                </div>

                <div class="entry file-input">
                    <label>Image (optionnelle)</label>
                    <div class="image-preview-container" <?php echo($_SESSION["link_picture"] != "") ? 'style="display:flex"' : "" ?>>
                        <img src="<?php echo($_SESSION["link_picture"] != "") ? $_SESSION["link_picture"] : "" ?>" alt="">
                        <img src="image/x-2.png">
                    </div>
                    
                    <div class="file-input-container">
                        <label for="image-debug">Choisissez votre image</label>
                        <p>Aucune image choisie</p>
                        <input type="file" name="link_picture" id="image-debug" accept="image/*">
                    </div>
                </div>
                
                <input type="hidden" name="link_picture_hidden" value="<?php echo($_SESSION["link_picture"]) ?>" class="link_picture_value">

                <hr>

                <h3>Visibilité</h3>

                <div class="status-form">

                    <input type="radio" name="status_post" value="public" required <?php echo ($_SESSION["status_post"] == "public") ? "checked" : "" ?>>

                    <img src="image/public.png" alt="public">

                    <div>
                        <p>Public</p>
                        <p>Votre debug sera visible par tous les utilisateurs du forum.</p>
                    </div>

                </div>

                <div class="status-form">

                    <input type="radio" name="status_post" value="private" <?php echo ($_SESSION["status_post"] == "private") ? "checked" : "" ?>>

                    <img src="image/privé .png " alt="private">

                    <div>
                        <p>Privé</p>
                        <p>Votre debug sera uniquement visible par vous-même et les administrateurs.</p>
                    </div>

                </div>

                <?php displayError("Choisissez une option pour la visibilité de votre debug", $error_status) ?>

                <hr>

                <div class="choice-group">
                    <input type="button" name="cancel" value="Annuler" class="cancel">
                    <input type="submit" name="submit_modif_debug" value="Modifier le debug">
                </div>

            </form>

        </div>

    </div>

</body>

</html>