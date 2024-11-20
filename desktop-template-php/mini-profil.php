<?php $user = new User($conn) ?>

<div class="mini-profil">
    
    <img src="../image/profil_pic_user/banniere.png" alt="background" class="banniere">
    
    <div class="mini-profil-pic-container">
        <img src="<?php echo "../image/profil_pic_user/" . $_SESSION["profile_pic"]?>" alt="" class="mini-profil-pic">
    </div>
    
    <p class="username"> <?php echo $_SESSION["username"]?> </p>
    
    <i class="rank"> Rang : Résolveur 🛠️ </i>
    
    <i class="progress"> (Prochain rang dans <span>5 Debugs !</span>) </i>
    
    <div class="stats-container">
        
        <div class="stat-block">
            
            <div class="stat">
                <img src="../image/feather-pen.png" alt="">
                <div>
                    <p> <?php echo $user->nbDebug() ?> </p> <p>Debugs</p>
                </div>
            </div>
            
            <div class="stat">
                <img src="../image/heart-regular-240-white.png" alt="">
                <div>
                    <p>5</p> <p>J'aime</p>
                </div>
            </div>
            
        </div>

        <div class="stat-block">
            
            <div class="stat">
                <img src="../image/bookmark-regular-240-white.png" alt="">
                <div>
                    <p>7</p> <p>Favoris</p>
                </div>
            </div>
            
            <div class="stat dl-age">
                <img src="../image/epee.png" alt="">
                <div>
                    <p>12 j</p> <p>Debugger age</p>
                </div>
            </div>
            
        </div>
        
    </div>  
    
    <div class="link-container">
        <a href="#">Voir le profil complet</a>
    </div>
    
</div>