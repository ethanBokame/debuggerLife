<!--DANS LE CAS OU IL N'Y A PAS OU PLUS DE POSTS-->
<?php
if (basename($_SERVER["REQUEST_URI"]) == "explorer") {
?>
    <div class="nopost noresult-explorer">
        <h1>Aucun résultat trouvé pour votre recherche.</h1>
        <h3>Essayez de modifier vos critères de recherche ou consultez d'autres sections de notre site pour découvrir de nouveaux contenus intéressants.</h3>
    </div>

<?php
}
if (basename($_SERVER["REQUEST_URI"]) == "favoris") {
?>
    <div class="nopost nofav">
        <h1>Vous n'avez pas encore de favoris</h1>
        <h3>Appuyez sur le drapeau d'un debug pour l'ajouter à vos favoris. Vous les retrouverez tous ici.</h3>
    </div>
    <div class="nopost noresult-explorer">
        <h1>Aucun résultat trouvé pour votre recherche.</h1>
        <h3>Essayez de modifier vos critères de recherche ou consultez d'autres sections de notre site pour découvrir de nouveaux contenus intéressants.</h3>
    </div>
    <div class="login-message" <?php echo(!isset($_SESSION["id_user"]) ? "style='display:block'" : "")?>>
        <p>Vous devez <a href="connexion">vous connecter</a> pour pouvoir mettre en favoris des debugs. Rejoignez la communauté et partagez vos solutions ! 😊</p>
    </div>
<?php
}
if (basename($_SERVER["REQUEST_URI"]) == "mydebug") {
?>
    <div class="nopost nodebug">
        <h1>Aucun Debug pour l'instant</h1>
        <h3>Publier un Debug, c'est garder une trace précieuse : une solution à un bug, un outil, un article ou le fruit de vos recherches. Ne perdez plus vos trouvailles !</h3>
    </div>
    <div class="nopost noresult-explorer">
        <h1>Aucun résultat trouvé pour votre recherche.</h1>
        <h3>Essayez de modifier vos critères de recherche ou consultez d'autres sections de notre site pour découvrir de nouveaux contenus intéressants.</h3>
    </div>
    <div class="login-message" <?php echo(!isset($_SESSION["id_user"]) ? "style='display:block'" : "")?>>
        <p>Vous devez <a href="connexion">vous connecter</a> pour pouvoir créer des debugs. Rejoignez la communauté et partagez vos solutions ! 😊</p>
    </div>
<?php
}
?>