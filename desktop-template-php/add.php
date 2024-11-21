<?php
require("session.php");
require("header.php");
require("conn.php");
?>

<body>

    <?php
    require("component.php");
    require("navbar.php");

    //Ajout d'un debug dans la base de données

    // Fonction pour afficher les erreurs si elles existent
    function displayError($message, $variable)
    {
    ?>
        <div class="error error-simple" <?php echo ($variable) ? "style='display: flex;'" : "" ?>>
            <img src="../image/point-dexclamation.png" alt="error">
            <p>
                <?php echo $message ?>
            </p>
        </div>
    <?php
    }

    // Initialisation des variables d'erreur
    $error_link = $error_title = $error_status = false;

    // Initialisation des variables de session pour le remplissage des champs
    $_SESSION["title"] = "";
    $_SESSION["description"] = "";
    $_SESSION["link_ressource"] = "";
    $_SESSION["status_post"] = "";

    if (isset($_POST["submit_add_form"])) {

        // Préparation de la requete
        $sql = $conn->prepare("INSERT INTO post (title, description, link_ressource, status_post, id_user, link_picture) 
        VALUES (:title, :description, :link_ressource, :status_post, :id_user, :link_picture)");

        // Traitement du formulaire
        $title = strip_tags($_POST['title']);
        $description = strip_tags($_POST['description']);
        $link_ressource = (filter_var($_POST['link_ressource'], FILTER_SANITIZE_URL));
        $status_post = empty($_POST['status_post']) ? null : $_POST['status_post'];
        $id_user = $_SESSION['id_user'];
        $link_picture = "../image/debug_picture/" . time() . "_" . $_FILES["link_picture"]["name"];

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
            $sql->bindValue(':id_user', $id_user, PDO::PARAM_INT);
            $sql->bindValue(':link_picture', $link_picture);

            $sql->execute();

            move_uploaded_file($_FILES["link_picture"]["tmp_name"], $link_picture);

            header("Location: mydebug.php");
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
                    <h2>Ajouter un nouveau debug</h2>
                    <p>
                        Vous avez une solution à un bug ou un outil utile ? Partagez-les ici pour aider d’autres développeurs confrontés aux mêmes défis ou pour leur faire découvrir des ressources pratiques !
                    </p>
                </div>

                <hr>

                <h3>Contenu</h3>

                <i>
                    Les champs obligatoires sont marqués d'un astérisque (*).
                </i>

                <div class="entry title-debug">
                    <label for="title-debug">Titre du debug *</label>
                    <input type="text" name="title" class="title-form-add" id="title-debug" maxlength="150" required value=<?php echo $_SESSION["title"] ?>>
                    <div class="error max-count">
                        <img src="../image/point-dexclamation.png" alt="error">
                        <p>
                            Le titre est trop long (100 caractères maximum).
                        </p>
                    </div>
                    <?php displayError("Le titre du debug ne doit pas être vide.", $error_title) ?>
                </div>

                <div class="entry">
                    <label for="description-debug">Description (optionnelle)</label>
                    <input type="text" name="description" id="description-debug" class="description-form-add" maxlength="450" value=<?php echo $_SESSION["description"] ?>>
                    <div class="error max-count">
                        <img src="../image/point-dexclamation.png" alt="eror">
                        <p>
                            La description est trop longue (350 caractères maximum).
                        </p>
                    </div>
                </div>


                <div class="entry">
                    <label for="link-debug">Lien *</label>
                    <input type="url" name="link_ressource" id="link-debug" class="url-form-add" required value=<?php echo $_SESSION["link_ressource"] ?>>
                    <?php displayError("Le lien ne doit pas être vide", $error_link) ?>
                </div>

                <div class="entry file-input">
                    <label>Image (optionnelle)</label>
                    <div class="image-preview-container">
                        <img src="" alt="">
                        <img src="../image/x-2.png">
                    </div>

                    <div class="file-input-container">
                        <label for="image-debug">Choisissez votre image</label>
                        <p>Aucune image choisie</p>
                        <input type="file" name="link_picture" id="image-debug" accept="image/*">
                    </div>
                </div>

                <hr>

                <h3>Visibilité</h3>

                <div class="status-form">

                    <input type="radio" name="status_post" value="public" required <?php echo ($_SESSION["status_post"] == "public") ? "checked" : "" ?>>

                    <img src="../image/public.png" alt="public">

                    <div>
                        <p>Public</p>
                        <p>Votre debug sera visible par tous les utilisateurs du forum.</p>
                    </div>

                </div>

                <div class="status-form">

                    <input type="radio" name="status_post" value="private" <?php echo ($_SESSION["status_post"] == "private") ? "checked" : "" ?>>

                    <img src="../image/privé .png " alt="private">

                    <div>
                        <p>Privé</p>
                        <p>Votre debug sera uniquement visible par vous-même et les administrateurs.</p>
                    </div>

                </div>

                <?php displayError("Choisissez une option pour la visibilité de votre debug", $error_status) ?>

                <hr>

                <input type="submit" name="submit_add_form" value="Ajouter un debug">

            </form>

        </div>

    </div>

</body>

</html>