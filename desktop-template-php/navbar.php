<!--NAVBAR-->
<nav>

    <div class="logo">
        <img src="image/stylo-a-plume.png">
        <p>debuggerLife</p>
    </div>

    <div class="nav-menu">
        <div class="search-box">

            <img src="image/loupe.png" class="loupe">

            <input type="search" autocomplete="on" name="search" id="search" placeholder="<?php
                if (basename($_SERVER["REQUEST_URI"]) == "mydebug") {
                    echo "Parmis vos debugs";
                } elseif (basename($_SERVER["REQUEST_URI"]) == "explorer") {
                    echo "Rechercher un debug";
                } else {
                    echo "Parmis vos favoris";
                }
                ?>">

            <img src="image/x.png" alt="close" class="close">

        </div>


        <div class="notification-nav" <?php echo(!isset($_SESSION["id_user"]) ? "style=display:none" : "")?>>
            <img src="image/packard-bell.png" alt="cloche">
            <div class="count-notif-container">
                <p>3</p>
            </div>

        </div>

        <img src="<?php echo "image/profil_pic_user/" . $user["profile_pic"]?>" <?php echo(!isset($_SESSION["id_user"]) ? "style=display:none" : "")?> class="profil_pic">

        <div class="connexion-inscription" <?php echo(!isset($_SESSION["id_user"]) ? "style=display:block" : "")?>>
            <a href="connexion">Se connecter</a>
            <a href="inscription">S'inscrire</a>
        </div>

    </div>

</nav>