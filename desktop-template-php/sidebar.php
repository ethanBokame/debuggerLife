<div class="tab">
    
    <div class="group">
        
        <a class="explore" href="explorer.php" <?php echo(basename($_SERVER["PHP_SELF"])) == "explorer.php" ? 'style="background-color: #9198a184;"' : "" ?>>
            <img src="../image/saturne2.png" alt="group">
            <p>Explorer</p>
        </a>
        
        <a class="mydebug-page" href="mydebug.php" <?php echo(basename($_SERVER["PHP_SELF"])) == "mydebug.php" ? 'style="background-color: #9198a184;"' : "" ?>>
            <img src="../image/edit.png" alt="post">
            <p>Mes Debugs</p>
        </a>
        
        <a class="favoris" href="favoris.php" <?php echo(basename($_SERVER["PHP_SELF"])) == "favoris.php" ? 'style="background-color: #9198a184;"' : "" ?>>
            <img src="../image/bookmark-solid-240.png" alt="save">
            <p>Favoris</p>
        </a>
        
    </div>
    
    <hr>
    
    <div class="group">
        <a class="favoris" href="add.php" <?php echo(basename($_SERVER["PHP_SELF"])) == "add.php" ? 'style="background-color: #9198a184;"' : "" ?>>
            <img src="../image/plus.png" alt="save">
            <p>Ajouter un debug</p>
        </a>
    </div>
    
    <hr>

    <div class="group">
        <a class="favoris" href="add.php" <?php echo(basename($_SERVER["PHP_SELF"])) == "discover.php" ? 'style="background-color: #9198a184;"' : "" ?>>
            <img src="../image/multiple-users-silhouette.png" alt="save">
            <p>Découvrir des profils</p>
        </a>
    </div>

    <hr>
    
    <div class="group">
        
        <a class="">
            <img src="<?php echo "../image/profil_pic_user/" . $user["profile_pic"]?>" class="profil_pic">
            <p>Compte</p>
        </a>
        
        <a class="">
            <img src="../image/parametres.png" alt="group">
            <p>Paramètres</p>
        </a>
        
        <a class="app-mobile">
            <img src="../image/smartphone.png" alt="save">
            <p>Application mobile</p>
        </a>
        
        <a class="help">
            <img src="../image/interrogation-mark.png" alt="post">
            <p>Aide</p>
        </a>
        
    </div>
    
    <p class="copyright">© 2024 DebuggerLife, Inc.</p>
    <a href="#" class="about">A propos de nous</a>
    
</div>