<?php
require("header.php");
require("conn.php");
?>

<body>
    <div class="inscription-container">
        <div class="branding">
            <h1>Ne perdez plus jamais la trace d'une solution trouvée sur internet</h1>
            <p>Centralisez tout ce qui compte : bugs résolus, articles techniques, guides pratiques, snippets de code, tutoriels vidéo, ou solutions d'outils que vous utilisez au quotidien.</p>
            <p>Tout ce dont vous avez besoin, toujours à portée de main, dans un espace organisé et accessible où que vous soyez.</p>
            <img class="plume3d" src="image/plume3d.webp" alt="">
            <img class="plume3d-2" src="image/plume3d-2.webp" alt="">
        </div>
        <div class="form-ins-container">
            <div class="redirect-conn">
                <p>Vous avez déjà un compte?</p>
                <a href="">Connectez-vous →</a>
            </div>
            <p style="font-size: 20px; font-weight:500; padding:25px 40px">S'incrire à debuggerLife</p>
            <form action="">
                <label for="username">Nom d'utilisateur*</label>
                <input 
                    type="text" 
                    placeholder="Nom d'utilisateur"
                    id="username">
                
                <label for="email">Email*</label>
                <input 
                    type="email" 
                    placeholder="Email"
                    id="email">
                
                <label for="password">Mot de passe*</label>
                <div class="password-container">
                    <input 
                        type="password" 
                        placeholder="Mot de passe"
                        id="password"
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

                <input type="submit" value="S'inscrire :)">
            </form>

            <p style="padding:25px 40px">En créant ce compte, vous acceptez notre politique de confidentialité et notre politique en matière de cookies .</p>
        </div>
    </div>
</body>

</html>