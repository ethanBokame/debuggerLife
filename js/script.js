let body = document.querySelector('body');

//Infobulles
tippy(".add-debug-nav", {
    content: "Ajouter un debug",
    placement: 'bottom',
    theme: 'custom',
});

tippy(".notification-nav", {
    content: "Notifications",
    placement: 'bottom',
    theme: 'custom',
});

tippy(".profil_pic", {
    content: "Menu utilisateur",
    placement: 'bottom',
    theme: 'custom',
});

tippy(".copy", {
    content: "Copier",
    placement: 'bottom',
    theme: 'custom',
});

// Search box
let search = document.querySelector('#search'),
    closeBtn = document.querySelector('.close'),
    searchBox = document.querySelector('.search-box'),
    loupe = document.querySelector('.loupe');

if (search) {
    
    search.addEventListener("input", () => {
        closeBtn.style.visibility = "visible";
    })
    
    search.addEventListener("focus", () => {
        searchBox.style.transition = "0.2s";
        searchBox.style.border = "1px solid white";
        loupe.setAttribute("src", "../image/magnifier.png")
    })
    
    search.addEventListener("blur", () => {
        searchBox.style.transition = "0.2s";
        searchBox.style.border = "1px solid #9198a1a6";
        loupe.setAttribute("src", "../image/loupe.png")
    })
}


if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        search.value = "";
        closeBtn.style.visibility = "hidden";
    })
}


// Ajout des suggestions a la recherche
let suggestion = document.querySelectorAll('.suggestion'),
    suggestionText = document.querySelectorAll('.suggestion h5');

suggestion.forEach((item, i) => {
    item.addEventListener("click", () => {
        search.value = suggestionText[i].innerText;
        closeBtn.style.visibility = "visible";
    })
});

// Fixation du body
function fixeBody() {  
    let scrollY = window.scrollY; // positionnement du body
    body.style.overflow = "hidden";
    body.style.height = "100vh";
    body.style.width = "100vw";
    body.style.position = "fixed";
    body.style.top = -scrollY + "px";
    scrollEnd = scrollY;
}

function noFixeBody() {
    body.style.overflow = "visible";
    body.style.height = "";
    body.style.width = "";
    body.style.position = "";
    body.style.top = "";
    window.scroll(0, scrollEnd);
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
cancelPopup = document.querySelector(".popup img");
choicePopup = document.querySelector(".choice");

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


// Animation du menu pour les debugs personnels
let option = document.querySelectorAll('.option');
let optionMenu = document.querySelectorAll('.option-menu');

for (let i = 0; i < option.length; i++) {
    
    option[i].addEventListener("click", () => {
        let optionPosition = option[i].getBoundingClientRect().bottom;

        if (optionMenu[i].style.display == "" || optionMenu[i].style.display == "none") {

            option[i].style.transition = "0.1.75s";
            option[i].style.backgroundColor = "#9198a16e";
            // optionMenu[i].style.top = `${optionPosition}px`;
            // console.log(optionMenu[i].style.top);
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
    stateImgSimple = document.querySelectorAll(".state-simple");

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


// Bouton delete
let delBtn = document.querySelectorAll(".delete-btn"),
    mydebug = document.querySelectorAll(".mydebug"),
    mydebugPage = document.querySelector(".page"),
    nopost = document.querySelector(".nopost");

for (let i = 0; i < delBtn.length; i++) {
    
    delBtn[i].addEventListener("click", () => {
        
        currentIndex = i;
        
        fixeBody();
        
        popup("Êtes vous sûr?", "Cette action est irréversible!", "delete", "block");
        
    })
    
}

// Bouton share
let shareBtn = document.querySelectorAll(".share-btn"),
    modalShare = document.querySelector(".modal"),
    linkDebug = document.querySelector(".debug-link"),
    linkRessource = document.querySelector(".ressource-link"),
    debugName = document.querySelectorAll(".mydebug .title, .notmydebug .title"),
    ressource = document.querySelectorAll(".mydebug .ressource a, .notmydebug .ressource a")
    smokePage = document.querySelector(".smoke"),
    cancelShare = document.querySelector(".cancel-share");

for (let i = 0; i < shareBtn.length; i++) {
    
    shareBtn[i].addEventListener("click", () => {
        
        fixeBody();
        linkDebug.innerText = "https://debuggerLife.com/ethanBokame/" + debugName[i].innerText.replaceAll(" ", "-");
        linkRessource.innerText = ressource[i].innerText;

        modalShare.style.display = "block";
        smokePage.style.display = "block";
        modalShare.style.display = "flex";
        
    })
    
}

window.addEventListener("click", (e) => {
    if (modalShare.style.display == "flex") {
        // Fermetture de la fenetre modale
        if (cancelShare.contains(e.target) || smokePage.contains(e.target)) {
            modalShare.style.display = "none";
            smokePage.style.display = "none";
            noFixeBody();
        }
    }
});


// Boutons copier

let copyBtn = document.querySelectorAll(".link-container img");

function copyDebugLink() {
    
    navigator.clipboard.writeText(linkDebug.innerText);
    
    // Notification
    showNotif("../image/fait.png", "Le lien du debug a été copié");
    setTimeout(() => {
        hideNotif();
    }, 2000);
    
}

function copyRessourceLink() {
    
    navigator.clipboard.writeText(linkRessource.innerText).then(
        () => {
          /* clipboard successfully set */
        },
        () => {
          /* clipboard write failed */
        },
      );
    
    // Notification
    showNotif("../image/fait.png", "Le lien de la ressource a été copié");
    setTimeout(() => {
        hideNotif();
    }, 2000);
    
}

let copyFunctionTab = [copyDebugLink, copyRessourceLink];

for (let i = 0; i < copyBtn.length; i++) {
    
    copyBtn[i].addEventListener("click", copyFunctionTab[i])
    
}


// Traitement de la popup en fonction de l'option
choicePopup.addEventListener("click", () => {
    popup(state = "none");
    noFixeBody();

    if (choicePopup.innerText == "Supprimer ce debug") {
        
        // Suppression du debug
        mydebug[currentIndex].remove();
        let debugPage = document.querySelectorAll('.page .mydebug');

        if (debugPage.length == 0) {
            nopost.style.display = "block";
        }

        // Notification
        showNotif("../image/fait.png", "Votre debug a été supprimé");
        setTimeout(() => {
            hideNotif();
        }, 2000);
    }
    else {
        popup(state = "none");
        noFixeBody();
        
        // Changement de l'état du debug
        let newStateImg = stateImg[currentIndex].getAttribute("src");
        let newStateImgSimple = stateImgSimple[currentIndex].getAttribute("src");
        
        stateImg[currentIndex].setAttribute("src", newStateImgSimple);
        stateImgSimple[currentIndex].setAttribute("src", newStateImg);
    
        //console.log(newStateImg, newStateImgSimple);
        
        newStateTextMenu = newStateImgSimple.slice(9,15);
        stateText[currentIndex].innerText = "Mettre en " + newStateTextMenu;
        
        showNotif("../image/fait.png", "Votre Debug est maintenant " + newStateTextPopup);
        setTimeout(() => {
            hideNotif();
        }, 2000);
    }

})


cancelPopup.addEventListener("click", () => {
    
    popup(state = "none");
    noFixeBody();

})


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

// Bouton like et favoris d'un debug autre que celui de l'utilisateur
let likePost = document.querySelectorAll(".notmydebug .count-like"),
    likePostImg = document.querySelectorAll(".notmydebug .count-like img"),
    likePostNumber = document.querySelectorAll(".notmydebug .count-like p"),
    favPost = document.querySelectorAll(".notmydebug .count-fav"),
    favPostImg = document.querySelectorAll(".notmydebug .count-fav img"),
    favPostNumber = document.querySelectorAll(".notmydebug .count-fav p");

function postBtn(btn, btnImg, btnImgOldColor, btnImgNewColor, color, count) {
    btn.style.transition = "0.2s";
    btn.style.transform = "scale(1.2)";

    if (!btn.style.color) {
        btn.style.color = color;
        btnImg.setAttribute("src", btnImgNewColor);
        let number = parseInt(count.innerText);
        count.innerText = number + 1;
    } else {
        btn.style.color = "";
        btnImg.setAttribute("src", btnImgOldColor);
        let number = parseInt(count.innerText);
        count.innerText = number - 1;
    }

    setTimeout(() => {
        btn.style.transition = "0.4s";
        btn.style.transform = "scale(1)";
    }, 400);
}

for (let i = 0; i < likePost.length; i++) {
    
    likePost[i].addEventListener("click", () => {
        postBtn(likePost[i], likePostImg[i], "../image/heart-regular-240-white.png", "../image/heart-solid-240-pink.png", "#f91880", likePostNumber[i]);
    })
}

for (let i = 0; i < favPost.length; i++) {
    
    favPost[i].addEventListener("click", () => {
        postBtn(favPost[i], favPostImg[i], "../image/bookmark-regular-240-white.png", "../image/bookmark-solid-240-or.png", "#FFC107", favPostNumber[i]);
    })
}


// Animation du formulaire d'ajout des debugs en cas d'erreurs
let inputTitle = document.querySelector('.title-form-add'),
    inputDescription = document.querySelector('.description-form-add'),
    inputUrl = document.querySelector('.url-form-add'),
    inputAddErrorMessage = document.querySelectorAll('.entry .max-count'),
    errorMessage = document.querySelectorAll('.entry .error-simple');


    function displayError(obj, max, indexErrorMessage) {
        if (obj.value.length = max) {
            obj.style.borderColor = "#f85149";
            inputAddErrorMessage[indexErrorMessage].style.display = "flex";
        }
    
        if (obj.value.length < max) {
            obj.style.borderColor = "";
            inputAddErrorMessage[indexErrorMessage].style.display = "none";
        }
    }

inputTitle.addEventListener("input", function () {
    displayError(this, 150, 0);
    errorMessage[0].style.display = "none";
})

inputDescription.addEventListener("input", function () {
    displayError(this, 450, 1);
})

inputUrl.addEventListener("input", function () {
    errorMessage[1].style.display = "none";
})