let body = document.querySelector('body'),
    hostname = window.location.hostname == "localhost" ? "http://localhost/debugger_life/" : "https://sharethevision.net/",
    notMyDebug = document.querySelectorAll('.notmydebug'),
    myDebug = document.querySelectorAll('.mydebug'),
    smokePage = document.querySelector(".smoke");

//Infobulles
let classes_array = [
    ".add-debug-nav",
    ".notification-nav",
    ".profil_pic",
    ".bottom .copy-btn",
    ".bottom .share-btn",
    ".stat-db",
    ".stat-like",
    ".stat-fav",
    ".stat-age",
    ".mini-profil .rank",
    ".set-banner-container",
    ".count-like",
    ".count-fav"
];

let contents_array = [
    "Ajouter un debug",
    "Notifications",
    "Menu utilisateur",
    "Copier le lien",
    "Partager",
    "Nombre total de Debugs",
    "Nombre total de j'aime",
    "Nombre total de favoris",
    "Nombre de jours depuis que vous nous avez rejoints",
    "Votre rang change en fonction du nombre de vos Debugs",
    "Modifier la bannière",
    "Aimer",
    "Favoris"
];

classes_array.forEach((selector, index) => {
    tippy(selector, {
        content: contents_array[index],
        placement: 'bottom',
        theme: 'custom',
    });
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
        loupe.setAttribute("src", "image/magnifier.png")
    })
    
    search.addEventListener("blur", () => {
        searchBox.style.transition = "0.2s";
        searchBox.style.border = "1px solid #9198a1a6";
        loupe.setAttribute("src", "image/loupe.png")
    })
}


if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        search.value = "";
        closeBtn.style.visibility = "hidden";
    })
}

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
    mydebugPage = document.querySelector(".page");

for (let i = 0; i < delBtn.length; i++) {
    
    delBtn[i].addEventListener("click", () => {
        
        currentIndex = i;
        
        fixeBody();
        
        popup("Êtes vous sûr?", "Cette action est irréversible!", "delete", "block");
        
    })
    
}

// Boutons copier

let copyBtn = document.querySelectorAll(".link-container img");

function copyDebugLink() {
    
    navigator.clipboard.writeText(linkDebug.innerText);
    
    // Notification
    showNotif("image/fait.png", "Le lien du debug a été copié");
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
    showNotif("image/fait.png", "Le lien de la ressource a été copié");
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

        let id_post = myDebug[currentIndex].getAttribute("id-post");
        // Fetching pour la suppression d'un debug
        fetch(hostname + "desktop-template-php/delete.php?id_post=" + id_post);

        // Notification
        showNotif("image/fait.png", "Votre debug a été supprimé");
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
    
        console.log(newStateImg, newStateImgSimple);
        
        newStateTextMenu = newStateImgSimple.slice(6,12);
        console.log(newStateTextMenu);
        stateText[currentIndex].innerText = "Mettre en " + newStateTextMenu;

        // Fetching pour la mise a jour du status
        let id_post = myDebug[currentIndex].getAttribute("id-post"),
            status = newStateTextPopup == "privé" ? "private" : "public";

        fetch(hostname + "desktop-template-php/status.php?id_post=" + id_post + "&status=" + status);
        
        showNotif("image/fait.png", "Votre Debug est maintenant " + newStateTextPopup);
        setTimeout(() => {
            hideNotif();
        }, 2000);
    }

})


cancelPopup.addEventListener("click", () => {
    
    popup(state = "none");
    noFixeBody();

})

// Affichage d'un message un message lorsque certaines pages sont vides
let nopost = document.querySelector(".nopost"),
    nofav = document.querySelector(".nofav"),
    nodebug = document.querySelector(".nodebug");

window.addEventListener("load", () => {
    nofav && notMyDebug.length == 0 ? nofav.style.display = "flex" : "";
    nodebug && myDebug.length == 0 ? nodebug.style.display = "flex" : "";
})

// Bouton like et favoris d'un debug autre que celui de l'utilisateur
let likePost = document.querySelectorAll(".notmydebug .count-like"),
    likePostImg = document.querySelectorAll(".notmydebug .count-like img"),
    likePostNumber = document.querySelectorAll(".notmydebug .count-like p"),
    favPost = document.querySelectorAll(".notmydebug .count-fav"),
    favPostImg = document.querySelectorAll(".notmydebug .count-fav img"),
    favPostNumber = document.querySelectorAll(".notmydebug .count-fav p");

// Fonction pour les boutons like et favoris
function postBtn(btn, btnImg, btnImgOldColor, btnImgNewColor, color, count, index_post, action) {
    btn.style.transition = "0.2s";
    btn.style.transform = "scale(1.2)";
    let id_post = notMyDebug[index_post].getAttribute("id-post");

    // ON
    if (!btn.style.color) {
        
        // changement du style
        btn.style.color = color;
        btnImg.setAttribute("src", btnImgNewColor);
        let number = parseInt(count.innerText);
        count.innerText = number + 1;
        
        // Requete http
        fetch(hostname + "desktop-template-php/" + action + ".php?id_post=" + id_post + "&step=1");
        
        // Notification
        if (action == "fav") {
            showNotif("image/fait.png", "Ajouté a vos favoris");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        }
        
    // OFF
    } else {
        
        btn.style.color = "";
        btnImg.setAttribute("src", btnImgOldColor);
        let number = parseInt(count.innerText);
        count.innerText = number - 1;
        
        fetch(hostname + "desktop-template-php/" + action + ".php?id_post=" + id_post + "&step=-1");
        
        if (action == "fav") {
            showNotif("image/fait.png", "Retiré de vos favoris");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        }
        
    }

    setTimeout(() => {
        btn.style.transition = "0.4s";
        btn.style.transform = "scale(1)";
    }, 400);
}

// Bouton like
for (let i = 0; i < likePost.length; i++) {
    
    likePost[i].addEventListener("click", () => {
        postBtn(likePost[i], likePostImg[i], "image/heart-regular-240-white.png", "image/heart-solid-240-pink.png", "#f91880", likePostNumber[i], i, "like");
    })
}

// Bouton favoris
for (let i = 0; i < favPost.length; i++) {
    
    favPost[i].addEventListener("click", () => {
        postBtn(favPost[i], favPostImg[i], "image/bookmark-regular-240-white.png", "image/bookmark-solid-240-or.png", "#FFC107", favPostNumber[i], i, "fav");

        // Retrait du debug des favoris
        if (window.location.pathname.includes("favoris.php")) {
            notMyDebug[i].remove();
            let notMyDebugCount = document.querySelectorAll('.notmydebug');
            nofav && notMyDebugCount.length == 0 ? nofav.style.display = "flex" : "";
            
            showNotif("image/fait.png", "Retiré de vos favoris");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        }
    })
}


// Formulaire d'ajout des debugs
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

if (inputTitle) {
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
}


// Image
let inputFileContainer = document.querySelector(".file-input"),
    inputFileImagePreview = document.querySelector(".file-input img"),
    inputFileText = document.querySelector(".file-input p"),
    inputFileInput = document.querySelector(".file-input input"),
    imageContainer = document.querySelector(".image-preview-container"),
    closeImage = document.querySelectorAll(".image-preview-container img")[1],
    link_picture_value = document.querySelector(".link_picture_value");

if (inputFileText) {
    inputFileText.addEventListener("click", () => {
        inputFileInput.click();
    })
}


function previewFile() {
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            inputFileImagePreview.src = reader.result;
        },
        false
    );

    if (inputFileInput.files[0]) {
        reader.readAsDataURL(inputFileInput.files[0]);
    }
}

if (inputFileInput) {
    inputFileInput.addEventListener("change", () => {

        // Vérification de la taille de l'image
        let inputSize = (inputFileInput.files[0].size / (1024 * 1024)).toFixed(1)
    
        if (inputSize > 5) {
            alert("La taille de l'image est trop grande (maximum 10 Mo)");
            inputFileInput.value = "";
        }
        else {
            previewFile();
            inputFileText.innerText = inputFileInput.files[0].name;
            imageContainer.style.display = "flex";
        }

    })
    
    closeImage.addEventListener("click", () => {
        imageContainer.style.display = "none";
        inputFileText.innerText = "Aucune image choisie";
        inputFileInput.value = "";
        link_picture_value.value = "";
    })
}



// Banner
let setBannerContainer = document.querySelector('.set-banner-container'),
    bannerFile = document.querySelector('.form-set-banner input[type="file"]'),
    bannerSub = document.querySelector('.form-set-banner input[type="submit"]');

if (setBannerContainer) {
    setBannerContainer.addEventListener("click", () => {
        bannerFile.click();
    })
    
    bannerFile.addEventListener("change", () => {
        bannerSub.click();
    })
}


// Interaction notmydebug


// Rechargement de la page au clic du logo 
let logo = document.querySelector('.logo');

logo.addEventListener("click", () => {
    window.location.href = window.location.pathname;
})

// Copie du lien d'un debug
let copyLink = document.querySelectorAll('.copy-btn'),
    linkPost = document.querySelectorAll('.notmydebug .ressource a');

for (let i = 0; i < copyLink.length; i++) {
    
    copyLink[i].addEventListener("click", () => {
        
        navigator.clipboard.writeText(linkPost[i].href).then(() => {
            
            showNotif("image/fait.png", "Lien de la ressource copié");
            setTimeout(() => {
                hideNotif();
            }, 2000);
            
        });
        
    });
}

// Copie du lien d'un debug
let sharePost = document.querySelectorAll('.share-btn'),
    usernamePost = document.querySelectorAll('.notmydebug .top .pic-name-post-date a');

for (let i = 0; i < sharePost.length; i++) {
    
    sharePost[i].addEventListener("click", () => {
        
        let idPost = notMyDebug[i].getAttribute("id-post"),
            contentToShare = "https://debuggerLife.com/" + usernamePost[i].innerText + "/" + idPost;
        
        navigator.clipboard.writeText(contentToShare).then(() => {
            
            showNotif("image/fait.png", "Lien du debug copié");
            setTimeout(() => {
                hideNotif();    
            }, 2000);
            
        });
        
    });
}

// Copie du lien d'un debug dans mydebug.php
let copyLinkMydebug = document.querySelectorAll('.ressource-btn'),
    linkPostMydebug = document.querySelectorAll('.mydebug .ressource a');

for (let i = 0; i < copyLinkMydebug.length; i++) {
    
    copyLinkMydebug[i].addEventListener("click", () => {
        
        navigator.clipboard.writeText(linkPostMydebug[i].href).then(() => {
            
            showNotif("image/fait.png", "Lien de la ressource copié");
            setTimeout(() => {
                hideNotif();
            }, 2000);
            
        });
        
    });
}


// Copie du lien d'un debug dans mydebug.php
let sharePostMydebug = document.querySelectorAll('.option-menu .share-btn'),
    usernamePostMydebug = document.querySelectorAll('.mydebug .top .pic-name-post-date a');

for (let i = 0; i < sharePostMydebug.length; i++) {
    
    sharePostMydebug[i].addEventListener("click", () => {
        
        let idPost = myDebug[i].getAttribute("id-post"),
            contentToShare = "https://debuggerLife.com/" + usernamePostMydebug[i].innerText + "/" + idPost;
        
        navigator.clipboard.writeText(contentToShare).then(() => {
            
            showNotif("image/fait.png", "Lien du debug copié");
            setTimeout(() => {
                hideNotif();    
            }, 2000);
            
        });
        
    });
}

// Modification d'un de mes debugs
let modifBtn = document.querySelectorAll('.option-menu .modif-btn'),
    cancelModification = document.querySelector('.choice-group .cancel');

for (let i = 0; i < modifBtn.length; i++) {
    
    modifBtn[i].addEventListener("click", () => {
        
        let idPost = myDebug[i].getAttribute("id-post");
        console.log(typeof(idPost));

        window.location.href = "update-debug/" + idPost;
    })
}

if (cancelModification) {
    cancelModification.addEventListener("click", () => {
        history.back();
    })
}


// Image modale du debug
let imgDebugModalContainer = document.querySelector('.image-debug-modal-container'),
    imgDebugModal = document.querySelector('.img-debug-modal'),
    imgDebug = document.querySelectorAll('.img-debug img'),
    imgDebugClose = document.querySelector('.close-debug-modal');

// Click sur l'image
for (let i = 0; i < imgDebug.length; i++) {
    
    imgDebug[i].addEventListener("click", () => {
        
        // Récupération du path de l'image
        let pathOfDebugImg = imgDebug[i].getAttribute("src");
        
        imgDebugModal.setAttribute("src", pathOfDebugImg);
        smokePage.style.display = "block";
        imgDebugModalContainer.style.display = "block";
        
        console.dir(imgDebugModal.width);
        console.log(window.innerWidth);
        
        if (imgDebugModal.width > window.innerWidth * 80 / 100) {
            console.log("l'image du debug a dépassé 80% de la largeur de la fenetre");
            imgDebugModal.style.width = "80%";
            imgDebugModal.style.height = "auto";
        }
    })
    
}

// Click sur la croix pour fermer l'image
imgDebugClose.addEventListener("click", () => {
    smokePage.style.display = "none";
    imgDebugModalContainer.style.display = "none";
})

// Click sur la zone neutre
imgDebugModalContainer.addEventListener("click", (e) => {
    if (e.target != imgDebugModal) {
        smokePage.style.display = "none";
        imgDebugModalContainer.style.display = "none";
    }

})


// Copie du code posté
let copyCode = document.querySelectorAll('.code .header div'),
    copyCodeImg = document.querySelectorAll('.code .header div img'),
    copyCodeText = document.querySelectorAll('.code .header div p'),
    codeBloc = document.querySelectorAll('.code pre code');

for (let i = 0; i < copyCode.length; i++) {

    copyCode[i].addEventListener("click", () => {
        navigator.clipboard.writeText(codeBloc[i].innerText).then(() => {
            copyCodeText[i].innerText = "Copié";
            copyCodeImg[i].style.display = "none";

            setTimeout(() => {
                copyCodeText[i].innerText = "Copier le code";
                copyCodeImg[i].style.display = "block";
            }, 2000);
        });
    })
    
}

