<?php
session_start();
require("header.php");
require("conn.php");

if (isset($_POST["send"])) {
    $username_email = $_POST["username_email"];
    $password = md5($_POST["password"]);
    $last_login = date("Y-m-d H:i:s");
    
    // Préparation de la requete pour l'inscription
    $sql = $conn->prepare("SELECT password FROM users WHERE username = :username OR email = :email");
    
    // Exécution de la requête
    $sql->execute([
        'username' => $username_email,
        'email' => $username_email
    ]);
    
    $password_in_db = $sql->fetchColumn();
    
    if ($password == $password_in_db) {
        // Préparation de la requete pour la création de l'user_id en session
        $sql = $conn->prepare("SELECT id_user FROM users WHERE username = :username OR email = :email");
        
        // Exécution de la requête
        $sql->execute([
            'username' => $username_email,
            'email' => $username_email
        ]); 
        
        $_SESSION["id_user"] = $sql->fetchColumn();
        
        header("Location: explorer");
    } else {
        $error = true;
    }
    
}

?>

<body>

    <div class="connexion-container">
        <img src="image/feather-pen.png" alt="logo" class="logo">
        <p style="font-size: 24px; font-weight:350;">
            Se connecter à debuggerLife
        </p>

        <p class="error" <?php echo(isset($error) && $error) ? "style=display:block" : ""?>>
            Nom d'utilisateur ou mot de passe incorrect
        </p>

        <form action="" method="post">
            <label for="username_email">Nom d'utilisateur ou email</label>
            <input 
                type="text"
                name="username_email" 
                id="username_email"
                value="<?php echo(isset($username_email)) ? $username_email : ""?>"
                required>
            
            <label for="password">Mot de passe</label>
            <div class="password-container">
                <input 
                    type="password" 
                    name="password"
                    id="password"
                    value="<?php echo(isset($_POST["password"])) ? $_POST["password"] : ""?>"
                    required
                    onfocus="document.querySelector('.password-container').style.border = '1px solid #4493f8'" 
                    onblur="document.querySelector('.password-container').style.border = ''">
                <img src="image/view (2).png">
            </div>
            
            <!-- Fonctionnalité show/hide -->
            <script>
                document.querySelector('.password-container img').addEventListener("click", function() {
                    if (this.getAttribute("src") == "image/view (2).png") {
                        this.setAttribute("src", "image/hide.png")
                        document.querySelector('.password-container input').setAttribute("type", "text")
                    } else {
                        this.setAttribute("src", "image/view (2).png")
                        document.querySelector('.password-container input').setAttribute("type", "password")
                    }
                })
            </script>

            <input type="submit" name="send" value="Se connecter ^_^">
        </form>

        <div class="redirect-ins">
            <p>Nouveau sur debuggerLife?</p>
            <a href="inscription">Créer un compte</a>
        </div>
    </div>
</body>

</html>