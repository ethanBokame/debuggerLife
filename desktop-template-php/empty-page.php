<!--DANS LE CAS OU IL N'Y A PAS OU PLUS DE POSTS-->

<?php 
if (basename($_SERVER["REQUEST_URI"]) == "favoris") {
    ?>
    <div class="nopost nofav">
        <h1>Vous n'avez pas encore de favoris</h1>
        <h3>Appuyez sur le drapeau d'un debug pour l'ajouter à vos favoris. Vous les retrouverez tous ici.</h3>
    </div>
    <?php
}
else if (basename($_SERVER["REQUEST_URI"]) == "mydebug") {
    ?>
    <div class="nopost nodebug">
        <h1>Aucun Debug pour l'instant</h1>
        <h3>Publier un Debug, c'est garder une trace précieuse : une solution à un bug, un outil, un article ou le fruit de vos recherches. Ne perdez plus vos trouvailles !</h3>
    </div>
<?php
}
?>
