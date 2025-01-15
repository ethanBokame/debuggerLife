<!--ECRAN SOMBRE-->
<div class="smoke"></div>

<!--NOTIFICATION-->
<div class="notif">
    <img src="" alt="notification">
    <p></p>
</div>

<!--POP-UP-->
<div class="popup">

    <div class="top">
        <h3></h3>
        <img src="image/x.png" alt="cancel">
    </div>

    <p></p>
    <p class="choice"></p>

</div>

<!--FENETRE MODALE POUR LE PARTAGE-->
<div class="modal">

    <div class="top">
        <h2>Partager le contenu</h2>
        <img src="image/x.png" alt="cancel" class="cancel-share">
    </div>

    <div class="link-type-container">
        <h4 class="title">Lien du debug:</h4>
        <div class="link-container">
            <p class="debug-link">
                https://debuggerLife.com/ethanBokame/changement-de-compte-github
            </p>
            <img src="image/copy-solid-240.png" alt="copy" class="copy">
        </div>
    </div>

    <div class="link-type-container">
        <h4 class="title">Lien de la ressource:</h4>
        <div class="link-container">
            <p class="ressource-link">
                https://stackoverflow.com/questions/13108093/ajax-call-to-php-script-not-working
            </p>
            <img src="image/copy-solid-240.png" alt="copy" class="copy">
        </div>
    </div>

</div>

<!-- Image modale du debug -->
<div class="image-debug-modal-container">
    <img src="image/x-2.png" class="close-debug-modal">
    <img src="" alt="" class="img-debug-modal">
</div>

<!-- menu -->
<div class="menu-container">
    <div class="header">
        <div class="pic-name">
            <img src="<?php echo "image/profil_pic_user/" . $user["profile_pic"] ?>" alt="">
            <p><?php echo $user["username"] ?></p>
        </div>
        <img class="close-menu" src="image/x-2.png" alt="close-menu">
    </div>
    <div class="link-container">
        <div>
            <img src="image/user.png">
            <p>Profil</p>
        </div>
        <div>
            <img src="image/moon (1).png">
            <p>Mode sombre</p>
        </div>
        <div>
            <img src="image/setting.png">
            <p>Paramètres</p>
        </div>
        <div>
            <img src="image/book.png">
            <p>Documentation debuggerLife</p>
        </div>
        <div>
            <img src="image/help.png">
            <p>Assistance debuggerLife</p>
        </div>
        <div>
            <img src="image/logout.png">
            <p>Deconnexion</p>
        </div>
    </div>
</div>