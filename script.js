// Animation au click du bouton favoris
let favBtn = document.querySelectorAll('.fav');
let favImg = document.querySelectorAll('.fav img');

for (let i=0; i<favBtn.length; i++) {
    favBtn[i].addEventListener("click", () => {
        favBtn[i].style.transition = "0.2s";
        favBtn[i].style.transform = "scale(1.1)";

        setTimeout(() => {
            favBtn[i].style.transform = "scale(1)";   
        }, 1000);

        if (favImg[i].getAttribute("src") == "image/bookmark.png") {
            favImg[i].setAttribute("src","image/bookmark3.png")
        }
        else {
            favImg[i].setAttribute("src","image/bookmark.png")
        }

    })
}

// Animation sur input search
let search = document.querySelector('.search');
search.addEventListener("click", () => {

    if (window.innerWidth < 768) {
        document.querySelector('.search input').style.width = '170px';
        search.style.gap = '5px';
        document.querySelector('.search input').focus();

        document.querySelector('.search input').addEventListener("blur", () => {
            document.querySelector('.search input').style.width = '0px';
            search.style.gap = '0px';
        })
    }
})

// Systeme de tap and slide

// Affichage correcte des pages (sans display block)
document.querySelectorAll('.swiper-slide')[0].style.display = "flex";
document.querySelectorAll('.swiper-slide')[1].style.display = "flex";

let forYou = document.querySelector('.page button:nth-child(1)');
let favoris = document.querySelector('.page button:nth-child(2)');

const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    initialSlide: 1,

    // Navigation button
    navigation: {
        nextEl: favoris,
        prevEl: forYou,
    },
});

// Slide
swiper.on("slideChange", () => {
    if (swiper.activeIndex == 0) {
        forYou.style.borderBottom = "2px solid rgb(248, 130, 51)";
        favoris.style.borderBottom = "2px solid transparent";
        document.querySelector('.add').style.display = "none";
    } else {
        favoris.style.borderBottom = "2px solid rgb(248, 130, 51)";
        forYou.style.borderBottom = "2px solid transparent";
        document.querySelector('.add').style.display = "block";
    }
});

// No slide
swiper.on('touchStart', () => {
    if (window.innerWidth > 1030) {
        swiper.allowTouchMove = false;
    }
    else {
        swiper.allowTouchMove = true;
    }
})

// Navbar scroll
let navbar = document.querySelector('.nav-pagination');
let navbarTop = document.querySelector('.nav-pagination nav');
let body = document.querySelector('body');

window.addEventListener("scroll", () => {

    if (navbar.offsetTop > 0) {
        navbarTop.style.transition = "0.3s";
        navbarTop.style.padding = "10px 16px";
        navbar.style.backgroundColor = "#010409ac";
        
    }
    else {
        
        navbarTop.style.padding = "16px";
        navbar.style.backgroundColor = "#010409";
    }
})

// Fixation du body
function fixeBody() {  
    let scrollY = window.scrollY; // positionnement du body

    body.style.overflow = "hidden"
    body.style.height = "100vh"
    body.style.width = "100vw"
    body.style.position = "fixed"
    body.style.top = -scrollY + "px"
}

function noFixeBody() {
    body.style.overflow = "visible"
    body.style.height = ""
    body.style.width = ""
    body.style.position = ""
    body.style.top = ""
}


// Notification
let notif = document.querySelector(".notif"),
    notifImg = document.querySelector(".notif img"),
    notifText = document.querySelector(".notif p"),
    positionTop,
    positionBottom;

    function showNotif(img, text) {
        notifImg.setAttribute("src", img);
        notifText.innerText = text;
        notif.style.transition = "0.3s";        
        notif.style.transform = "translatey(0)";
    }

    function hideNotif() {
        notif.style.transition = "0.3s";        
        notif.style.transform = "translatey(-100px)";
    }

    // Verifie si les deux positions sont définies et enleve la notif
    function notifTouch() {
        if (positionTop != undefined && positionBottom != undefined && positionBottom < 220 && (positionBottom - positionTop) > 10) {
            hideNotif()
        }
    }

    // Notification pour mobile
    window.addEventListener("touchstart", (e) => {
        positionBottom = e.targetTouches[0].screenY;
        // console.log(positionBottom);
    });

    window.addEventListener("touchend", (e) => {
        positionTop = e.changedTouches[0].screenY;
        notifTouch();
        // console.log(positionTop);
    });

// Popup
function popup(title="", text="", choice="", state="") {
    
    let smokePage = document.querySelector(".smoke"),
        popup = document.querySelector(".popup"),
        popupTilte = document.querySelector(".popup h3"),
        popupText = document.querySelector(".popup p"),
        popupChoice = document.querySelector(".popup .choice");
    
    popupTilte.innerText = title;
    popupText.innerText = text;
    
    if (choice == "delete") {
        
        popupChoice.innerText = "Supprimer ce debug";
        popupChoice.style.backgroundColor = "#f85149";
        
        popupChoice.addEventListener("mouseover", () => {
            popupChoice.style.backgroundColor = "#ff6058";
        })
        
        popupChoice.addEventListener("mouseout", () => {
            popupChoice.style.backgroundColor = "#f85149";
        })
        
    }
    else if (choice == "lock"){
        
        popupChoice.innerText = "Mettre en privé";
        popupChoice.style.backgroundColor = "#4493f8";
        
        popupChoice.addEventListener("mouseover", () => {
            popupChoice.style.backgroundColor = "#44b0f8";
        })
        
        popupChoice.addEventListener("mouseout", () => {
            popupChoice.style.backgroundColor = "#4493f8";
        })
    }
    else if (choice == "public"){

        popupChoice.innerText = "Mettre en public";
        popupChoice.style.backgroundColor = "#4493f8";
        
        popupChoice.addEventListener("mouseover", () => {
            popupChoice.style.backgroundColor = "#44b0f8";
        })
        
        popupChoice.addEventListener("mouseout", () => {
            popupChoice.style.backgroundColor = "#4493f8";
        })
    }
    
    smokePage.style.display = state;
    popup.style.display = state;
}


// Animation du bouton setting 
/*let setting = document.querySelectorAll(".setting");
let options = document.querySelectorAll(".delete-state");

for (let i = 0; i < setting.length; i++) {

    setting[i].addEventListener("click", () => {

        options[i].classList.toggle("toggle");
    
        if (setting[i].style.transform == "") {
            setting[i].style.transition = "0.2s";
            setting[i].style.transform = "scale(1.3)";
        }
        else {
            setting[i].style.transition = "0.2s";
            setting[i].style.transform = ""
        }
        
    })
    
}



// Animation des boutons du setting
let state = document.querySelectorAll(".state");
let del = document.querySelectorAll(".delete");

// Etat
for (let i = 0; i < state.length; i++) {

    state[i].addEventListener("click", () => {

        let stateContent = document.querySelectorAll(".state p")[i].innerText;
        stateContent = stateContent.toLowerCase();
    
        Swal.fire({
            title: "Votre Debug est maintenant " + stateContent,
            icon: "success",
            confirmButtonText: "Ok",
        });
        
        let stateText = document.querySelectorAll(".state p")[i].innerText;
        let stateImg = document.querySelectorAll(".state img")[i];
        let stateImgBottom = document.querySelectorAll(".state-min")[i];
    
        if (stateText == "Privé") {
            document.querySelectorAll(".state p")[i].innerText = "Public"
            stateImg.setAttribute("src", "image/world-regular.png")
            stateImgBottom.setAttribute("src", "image/lock-alt-regular.png")
        }
        else {
            document.querySelectorAll(".state p")[i].innerText = "Privé"
            stateImg.setAttribute("src", "image/lock-alt-regular-240.png")
            stateImgBottom.setAttribute("src", "image/world-regular-240.png")
        }
        
    })
    
}*/

// Delete
/*let post = document.querySelectorAll(".min-debug")

for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", () => {
        Swal.fire({
            title: "Êtes-vous sûr de vouloir supprimer ce debug?",
            text: "Cette action est irréversible !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#9198a1",
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler",
            allowOutsideClick: false,
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                post[i].style.display = "none";
                Swal.fire({
                    title: "Supprimé!",
                    text: "Votre debug a été supprimé.",
                    icon: "success",
                });
            }
        });
    });
    
}*/

// Animation du menu pour les debugs personnels
let option = document.querySelectorAll('.option');
let optionMenu = document.querySelectorAll('.option-menu');

for (let i = 0; i < option.length; i++) {
    
    option[i].addEventListener("click", () => {

        if (optionMenu[i].style.display == "" || optionMenu[i].style.display == "none") {
            option[i].style.transition = "0.1.75s";
            option[i].style.backgroundColor = "#9198a16e";
            optionMenu[i].style.transition = "0.1.75s";
            optionMenu[i].style.display = "block";
        } else {
            option[i].style.transition = "0.1.75s";
            option[i].style.backgroundColor = "";
            optionMenu[i].style.transition = "0.1.75s";
            optionMenu[i].style.display = "none";
        }

        window.addEventListener("click", (e) => {
            if (!optionMenu[i].contains(e.target) && !option[i].contains(e.target)) {
                option[i].style.transition = "0.1.75s";
                option[i].style.backgroundColor = "";
                optionMenu[i].style.transition = "0.1.75s";
                optionMenu[i].style.display = "none";
            }
        })
    })
    
}

// Menu contextuel des debugs

// Animation du bouton state
let state = document.querySelectorAll(".state-btn"),
    stateImg = document.querySelectorAll(".state-btn img"),
    stateText = document.querySelectorAll(".state-btn p"),
    stateImgSimple = document.querySelectorAll(".state-simple"),
    cancel = document.querySelector(".popup img"),
    saveConfirm = document.querySelector(".choice");
    console.log(saveConfirm);

for (let i = 0; i < state.length; i++) {
    
    state[i].addEventListener("click", () => {

        currentIndex = i; // Indice actuel
        
        newStateTextPopup = stateText[i].innerText.slice(10,stateText[i].length);
        
        fixeBody();
        
        if (newStateTextPopup == "privé") {
            popup("Rendre le debug privé?", "Il ne sera plus visible pour les autres utilisateurs.", "lock", "block");
        } else {
            popup("Publier votre debug?", "Êtes-vous sûr de vouloir rendre ce debug visible pour tous?", "public", "block");
        }
        

    })
    
}

cancel.addEventListener("click", () => {
    popup(state = "none");
    noFixeBody();
})

saveConfirm.addEventListener("click", () => {
    popup(state = "none");
    noFixeBody();
    
    let newStateImg = stateImg[currentIndex].getAttribute("src");
    let newStateImgSimple = stateImgSimple[currentIndex].getAttribute("src");
    
    stateImg[currentIndex].setAttribute("src", newStateImgSimple);
    stateImgSimple[currentIndex].setAttribute("src", newStateImg);

    console.log(newStateImg, newStateImgSimple);
    
    newStateTextMenu = newStateImgSimple.slice(6,12);
    stateText[currentIndex].innerText = "Mettre en " + newStateTextMenu;
    
    showNotif("image/fait.png", "Votre Debug est maintenant " + newStateTextPopup);
    setTimeout(() => {
        hideNotif();
    }, 2000);
})

// Bouton delete
let delBtn = document.querySelectorAll(".delete-btn"),
    delConfirm = document.querySelector(".choice"),
    mydebug = document.querySelectorAll(".mydebug"),
    favPage = document.querySelector(".favoris"),
    nopost = document.querySelector(".nopost");

for (let i = 0; i < delBtn.length; i++) {
    
    delBtn[i].addEventListener("click", () => {
        fixeBody();
        popup("Êtes vous sûr?", "Cette action est irréversible!", "delete", "block");
        
        cancel.addEventListener("click", () => {
            popup(state = "none");
            noFixeBody();
        })
        
        delConfirm.addEventListener("click", () => {
            popup(state = "none");
            noFixeBody();
            
            // Suppression du debug
            mydebug[i].remove();
            let debugFav = document.querySelectorAll(".favoris .mydebug");
            if (debugFav.length == 0) {
                nopost.style.display = "block";
            }
            
            // Notification
            showNotif("image/fait.png", "Votre debug a été supprimé");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        })
        
    })
    
}


// Bouton add
let add = document.querySelector('.add');

window.addEventListener("touchmove", () => {
    add.style.transition = "0.2s"
    add.style.opacity = "30%"
})

window.addEventListener("touchend", (e) => {
    add.style.transition = "0.2s"
    add.style.opacity = ""
})













