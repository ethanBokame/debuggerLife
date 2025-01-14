<?php
session_start();
require("header.php");
require("conn.php");

if (isset($_POST["send"])) {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = md5($_POST["password"]);
    $profil_pic = "plume (" . rand(0, 3) . ").png";
    $last_login = date("Y-m-d H:i:s");

    // Préparation de la requete pour l'inscription
    $sql_ins = $conn->prepare("INSERT INTO users (username, email, password, profile_pic, last_login) 
    VALUES (:username, :email, :password, :profile_pic, :last_login)");

    // Préparation de la requete pour la vérification du nom d'utilisateur 
    $sql = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :username");

    // Exécution de la requête
    $sql->execute([
        'username' => $username
    ]);

    $username_in_db = $sql->fetchColumn();

    if ($username_in_db < 1) {
        // Exécution de la requête pour l'inscription
        $sql_ins->execute([
            'username' => $username,
            'email' => $email,
            'password' => $password,
            'profile_pic' => $profil_pic,
            'last_login' => $last_login
        ]);
        
        // Préparation de la requete pour la création de l'user_id en session
        $sql = $conn->prepare("SELECT id_user FROM users WHERE username = :username");
        
        // Exécution de la requête
        $sql->execute([
            'username' => $username
        ]);
        
        $_SESSION["id_user"] = $sql->fetchColumn();
        
        header("Location: explorer");
    } else {
        $error = true;
    }
}

?>

<body>
    <div class="inscription-container">
        <div class="branding">
            <h1>Ne perdez plus jamais la trace d'une solution trouvée sur internet</h1>
            <p>Centralisez tout ce qui compte : bugs résolus, articles techniques, documentations, snippets de code, tutoriels vidéo, ou outils que vous utilisez au quotidien.</p>
            <p>Tout ce dont vous avez besoin, toujours à portée de main, dans un espace organisé et accessible où que vous soyez.</p>
            <img class="plume3d" src="image/plume3d.webp" alt="">
            <img class="plume3d-2" src="image/plume3d-2.webp" alt="">
        </div>
        <div class="form-ins-container">
            <div class="redirect-conn">
                <p>Vous avez déjà un compte?</p>
                <a href="connexion">Connectez-vous →</a>
            </div>
            <p style="font-size: 20px; font-weight:500; padding:25px 40px">S'incrire à debuggerLife</p>



            <form action="" method="post">
            <p class="error" <?php echo (isset($error) && $error) ? "style=display:block" : "" ?>>
                Ce nom d'utilisateur est déjà pris
            </p>
                <label for="username">Nom d'utilisateur*</label>
                <input
                    type="text"
                    name="username"
                    value="<?php echo(isset($_POST["username"])) ? $_POST["username"] : ""?>"
                    placeholder="Nom d'utilisateur"
                    id="username"
                    required>

                <label for="email">Email*</label>
                <input
                    type="email"
                    name="email"
                    value="<?php echo(isset($_POST["email"])) ? $_POST["email"] : ""?>"
                    placeholder="Email"
                    id="email"
                    required>

                <label for="password">Mot de passe*</label>
                <div class="password-container">
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        value="<?php echo(isset($_POST["password"])) ? $_POST["password"] : ""?>"
                        id="password"
                        required
                        onfocus="document.querySelector('.password-container').style.border = '1.5px solid #4493f8'"
                        onblur="document.querySelector('.password-container').style.border = ''">
                    <img src="image/show.png">
                </div>

                <!-- Fonctionnalité show/hide -->
                <script>
                    document.querySelector('.password-container img').addEventListener("click", function() {
                        if (this.getAttribute("src") == "image/show.png") {
                            this.setAttribute("src", "image/cacher.png")
                            document.querySelector('.password-container input').setAttribute("type", "text")
                        } else {
                            this.setAttribute("src", "image/show.png")
                            document.querySelector('.password-container input').setAttribute("type", "password")
                        }
                    })
                </script>

                <input type="submit" name="send" value="S'inscrire :)">
            </form>

            <p style="padding:25px 40px">En créant ce compte, vous acceptez notre politique de confidentialité et notre politique en matière de cookies .</p>
        </div>
    </div>
</body>

</html>