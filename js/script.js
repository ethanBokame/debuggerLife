let body = document.querySelector("body"),
    hostname = window.location.hostname == "localhost" ? "http://localhost/debugger_life/" : "https://sharethevision.net/",
    myDebug = document.querySelectorAll(".mydebug"),
    smokePage = document.querySelector(".smoke"),
    page = document.querySelector(".page"),
    debugContainer = document.querySelector('.debug-container'),
    debug = debugContainer ? debugContainer.children : document.querySelectorAll(".notmydebug"),
    spinner = document.querySelector(".loader"),
    filePath = window.location.pathname,
    fileName = filePath.split("/").pop(),
    currentUsername = debugContainer ? document.querySelector(".top .pic-name-post-date a").innerText : "",
    currentProfilPic = debugContainer ? document.querySelector(".mini-profil-pic-container img").getAttribute("src") : "";

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
    ".count-fav",
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
    "Favoris",
];

classes_array.forEach((selector, index) => {
    tippy(selector, {
        content: contents_array[index],
        placement: "bottom",
        theme: "custom",
    });
});

// fonction pour le formattage de la date
function shortTimePost(date) {
    const now = new Date(); // Heure actuelle
    const postDate = new Date(date); // Date à comparer

    const seconds = Math.floor((now - postDate) / 1000); // Différence en secondes

    // Création de l'intervalle pour des formats plus lisibles
    const years = Math.floor(seconds / 31536000); // 1 an = 31536000 secondes
    const months = Math.floor(seconds / 2678400); // 1 mois (31 jours) = 2678400 secondes
    const days = Math.floor(seconds / 86400); // 1 jour = 86400 secondes
    const hours = Math.floor(seconds / 3600); // 1 heure = 3600 secondes
    const minutes = Math.floor(seconds / 60); // 1 minute = 60 secondes

    let shortTime;

    if (years > 0) {
        shortTime = `${years}a`; // Années
    } else if (months > 0) {
        shortTime = `${months} mois`; // Mois
    } else if (days > 0) {
        shortTime = `${days}j`; // Jours
    } else if (hours > 0) {
        shortTime = `${hours}h`; // Heures
    } else if (minutes > 0) {
        shortTime = `${minutes}m`; // Minutes
    } else {
        shortTime = `${seconds}s`; // Secondes
    }

    return shortTime;
}

console.log(debug);

// Fonction pour la surbrillance de la recherche
function highlightMatch(text, query) {
    if (!query) return text; // Si aucune requête, retourner le texte d'origine

    // Création d'une expression régulière pour trouver toutes les correspondances
    const regex = new RegExp(`(${query})`, "gi"); // "g" = global, "i" = insensible à la casse
    return text.replace(regex, '<span class="highlight">$1</span>'); // Ajouter le surlignage
}

// Search box
let search = document.querySelector("#search"),
    closeBtn = document.querySelector(".close"),
    searchBox = document.querySelector(".search-box"),
    loupe = document.querySelector(".loupe");


// Fonction pour rattacher les event listener
function refreshEventListener() {

let option = document.querySelectorAll(".option");
let optionMenu = document.querySelectorAll(".option-menu");

for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", () => {
        let optionPosition = option[i].getBoundingClientRect().bottom;

        if (
            optionMenu[i].style.display == "" ||
            optionMenu[i].style.display == "none"
        ) {
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
            if (
                !optionMenu[i].contains(e.target) &&
                !option[i].contains(e.target)
            ) {
                option[i].style.transition = "0.1.75s";
                option[i].style.backgroundColor = "";
                optionMenu[i].style.transition = "0.1.75s";
                optionMenu[i].style.display = "none";
            }
        });
    });


// Animation du menu pour les debugs personnels

for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", () => {
        let optionPosition = option[i].getBoundingClientRect().bottom;

        if (
            optionMenu[i].style.display == "" ||
            optionMenu[i].style.display == "none"
        ) {
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
            if (
                !optionMenu[i].contains(e.target) &&
                !option[i].contains(e.target)
            ) {
                option[i].style.transition = "0.1.75s";
                option[i].style.backgroundColor = "";
                optionMenu[i].style.transition = "0.1.75s";
                optionMenu[i].style.display = "none";
            }
        });
    });
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

        newStateTextPopup = stateText[i].innerText.slice(
            10,
            stateText[i].length
        );

        fixeBody();

        if (newStateTextPopup == "privé") {
            popup(
                "Rendre le debug privé?",
                "Il ne sera plus visible pour les autres utilisateurs.",
                "lock",
                "block"
            );
        } else {
            popup(
                "Publier votre debug?",
                "Êtes-vous sûr de vouloir rendre ce debug visible pour tous?",
                "public",
                "block"
            );
        }
    });
}

// Bouton delete
let delBtn = document.querySelectorAll(".delete-btn"),
    mydebug = document.querySelectorAll(".mydebug"),
    mydebugPage = document.querySelector(".page");

for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener("click", () => {
        currentIndex = i;

        fixeBody();

        popup(
            "Êtes vous sûr?",
            "Cette action est irréversible!",
            "delete",
            "block"
        );
    });
}

// Bouton like et favoris d'un debug autre que celui de l'utilisateur
let likePost = document.querySelectorAll(".notmydebug .count-like"),
    likePostImg = document.querySelectorAll(".notmydebug .count-like img"),
    likePostNumber = document.querySelectorAll(".notmydebug .count-like p"),
    favPost = document.querySelectorAll(".notmydebug .count-fav"),
    favPostImg = document.querySelectorAll(".notmydebug .count-fav img"),
    favPostNumber = document.querySelectorAll(".notmydebug .count-fav p");

// Fonction pour les boutons like et favoris
function postBtn(
    btn,
    btnImg,
    btnImgOldColor,
    btnImgNewColor,
    color,
    count,
    index_post,
    action
) {
    btn.style.transition = "0.2s";
    btn.style.transform = "scale(1.2)";
    let id_post = debug[index_post].getAttribute("id-post");

    // ON
    if (!btn.style.color) {
        // changement du style
        btn.style.color = color;
        btnImg.setAttribute("src", btnImgNewColor);
        let number = parseInt(count.innerText);
        count.innerText = number + 1;

        // Requete http
        fetch(
            hostname +
                "desktop-template-php/" +
                action +
                ".php?id_post=" +
                id_post +
                "&step=1"
        );

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

        fetch(
            hostname +
                "desktop-template-php/" +
                action +
                ".php?id_post=" +
                id_post +
                "&step=-1"
        );

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
        postBtn(
            likePost[i],
            likePostImg[i],
            "image/heart-regular-240-white.png",
            "image/heart-solid-240-pink.png",
            "#f91880",
            likePostNumber[i],
            i,
            "like"
        );
    });
}

// Bouton favoris
for (let i = 0; i < favPost.length; i++) {
    favPost[i].addEventListener("click", () => {
        postBtn(
            favPost[i],
            favPostImg[i],
            "image/bookmark-regular-240-white.png",
            "image/bookmark-solid-240-or.png",
            "#FFC107",
            favPostNumber[i],
            i,
            "fav"
        );

        // Retrait du debug des favoris
        if (window.location.pathname.includes("favoris.php")) {
            debug[i].remove();
            let notMyDebugCount = document.querySelectorAll(".notmydebug");
            nofav && notMyDebugCount.length == 0
                ? (nofav.style.display = "flex")
                : "";

            showNotif("image/fait.png", "Retiré de vos favoris");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        }
    });
}
}

// Copie du lien d'un debug
let copyLink = document.querySelectorAll(".copy-btn"),
    linkPost = document.querySelectorAll(".notmydebug .ressource a");

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
let sharePost = document.querySelectorAll(".share-btn"),
    usernamePost = document.querySelectorAll(
        ".top .pic-name-post-date a"
    );

for (let i = 0; i < sharePost.length; i++) {
    sharePost[i].addEventListener("click", () => {
        let idPost = debug[i].getAttribute("id-post"),
            contentToShare =
                hostname + usernamePost[i].innerText + "/" + idPost;

        navigator.clipboard.writeText(contentToShare).then(() => {
            showNotif("image/fait.png", "Lien du debug copié");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        });
    });
}

// Copie du lien d'un debug dans mydebug.php
let copyLinkMydebug = document.querySelectorAll(".ressource-btn"),
    linkPostMydebug = document.querySelectorAll(".mydebug .ressource a");

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

// // Copie du lien d'un debug dans mydebug.php
// let sharePostMydebug = document.querySelectorAll(".option-menu .share-btn"),
//     usernamePostMydebug = document.querySelectorAll(
//         ".notmydebug .top .pic-name-post-date a"
//     );

// // for (let i = 0; i < sharePostMydebug.length; i++) {
// //     sharePostMydebug[i].addEventListener("click", () => {
// //         let idPost = debug[i].getAttribute("id-post"),
// //             contentToShare =
// //                 hostname + usernamePostMydebug[i].innerText + "/" + idPost;

// //         navigator.clipboard.writeText(contentToShare).then(() => {
// //             showNotif("image/fait.png", "Lien du debug copié");
// //             setTimeout(() => {
// //                 hideNotif();
// //             }, 2000);
// //         });
// //     });
// // }

// Debug en grand
let nameContainer = document.querySelectorAll(".pic-name-post-date .img-container"),
    linkDebug = document.querySelectorAll(".ressource"),
    bottomDebug = document.querySelectorAll(".page .bottom"),
    backBigDebug = document.querySelector(".back-big-debug"),
    referrer = document.referrer,
    isFromApp = referrer.includes(hostname),
    codeBlocContainer = document.querySelectorAll(".code"),
    usernamePostSearch = document.querySelectorAll(".top .pic-name-post-date a"),
    imgDebugContainer = document.querySelectorAll(".img-debug");

for (let i = 0; i < debug.length; i++) {

    debug[i].addEventListener("click", (e) => {
        // Ajout du paramètre 'e' ici pour capturer l'événement
        // Vérification préalable pour s'assurer que tous les éléments sont définis
        
        // Vérification que e.target n'est dans aucun de ces éléments
        if (
            (!nameContainer[i] || !nameContainer[i].contains(e.target)) &&
            (!option[i] || !option[i].contains(e.target)) &&
            (!linkDebug[i] || !linkDebug[i].contains(e.target)) &&
            (!imgDebugContainer[i] || !imgDebugContainer[i].contains(e.target)) &&
            (!bottomDebug[i] || !bottomDebug[i].contains(e.target)) &&
            (!codeBlocContainer[i] || !codeBlocContainer[i].contains(e.target)) &&
            (!optionMenu[i] || !optionMenu[i].contains(e.target))
        ) {
            let idPost = debug[i].getAttribute("id-post");
        
            // Navigation vers la nouvelle URL
            window.location.href = usernamePostSearch[i].innerText + "/" + idPost;
        }
    });
}

// retour
if (backBigDebug) {
    backBigDebug.addEventListener("click", () => {
        if (isFromApp) {
            // Retour à la page précédente
            window.history.back();
        } else {
            // Redirige vers une page par défaut (par exemple, la page d'accueil de l'application)
            window.location.href = "/explorer"; // Remplacez par l'URL de la page d'accueil
        }
    });
}

// Signalement du debug
let warningBtn = document.querySelectorAll(".warning-op");
// console.log(warningBtn);

for (let i = 0; i < warningBtn.length; i++) {
    warningBtn[i].addEventListener("click", () => {
        // console.log("ee");

        currentIndex = i;

        fixeBody();

        popup(
            "Êtes vous sûr?",
            "Cette action est irréversible et notifiera l'administrateur.",
            "warning",
            "block"
        );
    });
}

// Copie du code posté
let copyCode = document.querySelectorAll(".code .header div"),
    copyCodeImg = document.querySelectorAll(".code .header div img"),
    copyCodeText = document.querySelectorAll(".code .header div p"),
    codeBloc = document.querySelectorAll(".code pre code");

for (let i = 0; i < copyCode.length; i++) {
    copyCode[i].addEventListener("click", () => {
        navigator.clipboard.writeText(codeBloc[i].innerText).then(() => {
            copyCodeText[i].innerText = "Copié";
            copyCodeImg[i].setAttribute("src", "image/check-regular-240.png");

            setTimeout(() => {
                copyCodeImg[i].setAttribute(
                    "src",
                    "image/copy-regular-240.png"
                );
                copyCodeText[i].innerText = "Copier le code";
            }, 2000);
        });
    });
}

// Modification d'un de mes debugs
let modifBtn = document.querySelectorAll(".option-menu .modif-btn"),
    cancelModification = document.querySelector(".choice-group .cancel");

for (let i = 0; i < modifBtn.length; i++) {
    modifBtn[i].addEventListener("click", () => {
        let idPost = debug[i].getAttribute("id-post");
        console.log(typeof idPost);

        window.location.href = "update-debug/" + idPost;
    });
}

if (cancelModification) {
    cancelModification.addEventListener("click", () => {
        history.back();
    });
}
}

// fonction pour créer un post notmydebug
function createDebug(post, query = "", likesArray, favArray, page = fileName) {

    // Création du noeud
    let container = document.createElement("div");
    container.classList.add("new-debug");
    container.setAttribute("id-post", post.id_post);
    container.setAttribute("redirect-big-debug", "");
    container.style.display = "flex";


    // Mise en évidence de la recherche
    let highlightedTitle = highlightMatch(post.title, query),
        highlightedDescription = highlightMatch(post.description, query),
        highlightedLink = highlightMatch(post.link_ressource, query);


    // Charger le style de Highlight.js
    const highlightJsStyle = document.createElement("link");
    highlightJsStyle.rel = "stylesheet";
    highlightJsStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css";
    document.head.appendChild(highlightJsStyle);



    if (page == "explorer" || page == "favoris") {
        
        container.classList.add("notmydebug");
        
    }
    else {
        
        container.classList.add("mydebug");
        
    }

    container.innerHTML = `
        <div class="top" redirect-big-debug>
            <div class="pic-name-post-date">
                <div class="img-container">
                    <img src="
                    ${
                        page == "mydebug"
                        ? currentProfilPic
                        : 'image/profil_pic_user/' + post.profile_pic
                    }
                    " alt="profile">
                </div>
                <a href="#">
                ${
                    page == "mydebug"
                    ? currentUsername
                    : post.username
                }
                </a>
                <p redirect-big-debug>•</p>    
                <p redirect-big-debug> ${shortTimePost(post.post_date)} </p>
            </div>
            <div class="option-container">
                <img src="image/options.png" class="option">
                <div class="option-menu">
                ${
                    page == "mydebug"
                    ? `
                    <div class="op share-btn">
                        <img src="image/partager.png" alt="Statistiques">
                        <p>Partager</p>
                    </div>

                    <div class="op ressource-btn">
                        <img src="image/liens.png" alt="setter">
                        <p>Copier le lien</p>
                    </div>

                    <div class="op modif-btn">
                        <img src="image/outil-crayon.png" alt="setter">
                        <p>Modifier le debug</p>
                    </div>

                    <div class="op state-btn">
                        <img 
                            src="${post.status_post === 'public' ? 'image/privé .png' : 'image/public.png'}" 
                            alt="${post.status_post === 'public' ? 'Lock' : 'World'}">
                        <p>
                            ${post.status_post === 'public' ? 'Mettre en privé' : 'Mettre en public'}
                        </p>
                    </div>

                    <div class="op delete-btn">
                        <img src="image/trash.png" alt="trash">
                        <p>Supprimer</p>
                    </div>
                        `
                    : `                    <div class="op">
                        <img src="image/user-regular-240.png" alt="profil">
                        <p>Voir le profil</p>
                    </div>
                    <div class="op warning-op">
                        <img src="image/point-dexclamation2.png" alt="report">
                        <p>Signaler le debug</p>
                    </div>`
                }
                </div>
            </div>
        </div>
        <p class="title" redirect-big-debug ${
            !post.description ? 'style="margin: -8px 0 3px 0"' : ""
        }>
            ${highlightedTitle}
        </p>
        <div class="description" redirect-big-debug ${
            !post.description && !post.code ? 'style="margin: -11px"' : ""
        }>
            <p redirect-big-debug>${highlightedDescription}</p>
        </div>
        ${
            post.link_ressource
                ? `
            <div class="ressource">
                <a href="${post.link_ressource}" target="_blank">${highlightedLink}</a>
            </div>`
                : ""
        }
        ${
            post.link_picture
                ? `
            <div class="img-debug" style="margin-bottom: -4px">
                <div class="img-debug-bg" style="background-image: url('${post.link_picture}');"></div>
                <img src="${post.link_picture}" alt="debug-image">
            </div>`
                : ""
        }
        ${
            post.code
                ? `
            <div class="code">
                <div class="header">
                    <p>code</p>
                    <div class="copy-code-container">
                        <img src="image/copy-regular-240.png" alt="">
                        <p>Copier le code</p>
                    </div>
                </div>
                <pre><code>${post.code}</code></pre>      
            </div>`
                : ""
        }
        <div class="bottom" redirect-big-debug>
            ${
                page == "explorer" || page == "favoris"
                    ? `            
                <div class="count-like" ${
                    likesArray.includes(post.id_post)
                        ? 'style="color: rgb(249, 24, 128)"'
                        : ""
                }>
                <img src="${
                    likesArray.includes(post.id_post)
                        ? "image/heart-solid-240-pink.png"
                        : "image/heart-regular-240-white.png"
                }" alt="like">
                <p>${post.like_number}</p>
                </div>
                <div class="count-fav" ${
                favArray.includes(post.id_post)
                    ? 'style="color: rgb(255, 193, 7)"'
                    : ""
                }>
                <img src="${
                    favArray.includes(post.id_post)
                        ? "image/bookmark-solid-240-or.png"
                        : "image/bookmark-regular-240-white.png"
                }" alt="fav">
                <p>${post.fav_number}</p>
                </div>
                ${
                    post.link_ressource
                        ? `
                    <div class="copy-btn">
                        <img src="image/copier.png" alt="copier">
                    </div>`
                        : ""
                }
                <div class="share-btn">
                    <img src="image/share-white.png" alt="share">
                </div>`
                    : `
                <img redirect-big-debug  
                    src="${
                        post.status_post === "public"
                            ? "image/public.png"
                            : "image/privé .png"
                    }" 
                    alt="${
                        post.status_post === "public"
                            ? "Public post"
                            : "Private post"
                    }" 
                    class="state-simple">
                
                <div class="count-like-mydebug" redirect-big-debug>
                    <img src="image/heart-regular-240.png" alt="like" redirect-big-debug>
                    <p redirect-big-debug>${post.like_number}</p>
                </div>
                
                <div class="count-fav-mydebug" redirect-big-debug>
                    <img src="image/bookmark-regular-240.png" alt="fav" redirect-big-debug>
                    <p redirect-big-debug>${post.fav_number}</p>
                </div>
            `
            }

        </div>  
    `;
    


    // Appliquer Highlight.js uniquement si le code existe
    if (post.code) {
        
        // Appliquer Highlight.js uniquement si le code existe
        const codeElement = container.querySelector("pre code");
        hljs.highlightElement(codeElement);
        
        // Formattage du code
        container.querySelector("pre").style.marginTop = "0";
        container.querySelector("pre").style.marginBottom = "0";
    }

    return container;

}

let noResultExplorer = document.querySelector('.noresult-explorer');

// Fonction qui manipule l'état des debugs
function debugState(state, selector) {
    let debug = document.querySelectorAll(selector);
    debug.forEach(function (item) {
        item.style.display = state;
    });
}

// Faire disparaitre les debugs de la recherche
function removeDebugSearch() {
    let debug = document.querySelectorAll(".new-debug");
    debug.forEach(function (item) {
        item.remove();
    });
}

if (search) {
    search.addEventListener("input", () => {
        
        closeBtn.style.visibility = "visible";
    });

    search.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log("Touche Entrée pressée !");

            //Appel API pour obtenir les debugs
            if (search.value.length > 0 && search.value.trim() != "") {
                // faire disparaitre le message en cas de non résultat
                noResultExplorer.style.display = "none";

                // Spinner pour le chargement
                spinner.style.display = "flex";

                // Faire disparaitre les debugs deja là de base
                debugState("none", ".old-debug");

                // Faire disparaitre les debugs de la recherche
                removeDebugSearch();

                fetch(
                    `${hostname}desktop-template-php/live-search-${fileName}.php?query=${search.value}`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        let noResultExplorer = document.querySelector(".noresult-explorer");

                        setTimeout(() => {
                            // // Faire disparaitre les debugs de la recherche
                            // removeDebugSearch();

                            // Fin du chargement
                            spinner.style.display = "none";

                            // En cas non resultat
                            if (data.debugs.length == 0) {
                                noResultExplorer.style.display = "flex";

                            } else if (fileName == "explorer" || fileName == "favoris") {

                                noResultExplorer.style.display = "none";

                                data.debugs.map((post) => {
                                    debugContainer.appendChild(
                                        createDebug(
                                            post,
                                            search.value,
                                            data.likesArray,
                                            data.favArray
                                        )
                                    );
                                    console.log(debug);
                                });

                                // Attachement des events
                                refreshEventListener();

                                // Formattage des images
                                formatDebugImg()
                            } else {
                                noResultExplorer.style.display = "none";

                                data.debugs.map((post) => {
                                    debugContainer.appendChild(
                                        createDebug(post, search.value)
                                    );
                                    console.log(debug);
                                });

                                // Attachement des events
                                refreshEventListener();
                                
                                // Formattage des images
                                formatDebugImg()
                            }
                        }, 300);

                        console.log(data);
                    });
            } else if (search.value.length == 0) {
                // Faire disparaitre le message de non-résultat
                noResultExplorer.style.display = "none";

                // Faire disparaitre les debugs de la recherche
                removeDebugSearch();

                // Faire apparaitre les debugs de base
                debugState("flex", ".old-debug");

                setTimeout(() => {
                    // Faire disparaitre les debugs de la recherche
                    removeDebugSearch();
                    console.log("remove");
                }, 2000);
            }
        }
    });
    
    search.addEventListener("focus", () => {
        searchBox.style.transition = "0.2s";
        searchBox.style.border = "1px solid white";
        loupe.setAttribute("src", "image/magnifier.png");
    });

    search.addEventListener("blur", () => {
        searchBox.style.transition = "0.2s";
        searchBox.style.border = "1px solid #9198a1a6";
        loupe.setAttribute("src", "image/loupe.png");
    });
}

// 'X' de la search box
if (closeBtn) {
    
    closeBtn.addEventListener("click", () => {
        search.value = "";
        closeBtn.style.visibility = "hidden";

        search.focus();
        
            // // Faire disparaitre le message de non-résultat
            // noResultExplorer.style.display = "none";
            
            // // Faire disparaitre les debugs de la recherche
            // removeDebugSearch()
            
            // // Faire apparaitre les debugs de base
            // debugState("flex", ".old-debug")
    });
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

function popup(title = "", text = "", choice = "", state = "") {
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
        });

        popupChoice.addEventListener("mouseout", () => {
            popupChoice.style.backgroundColor = "#f85149";
        });
    } else if (choice == "lock") {
        popupChoice.innerText = "Mettre en privé";
        popupChoice.style.backgroundColor = "#4493f8";

        popupChoice.addEventListener("mouseover", () => {
            popupChoice.style.backgroundColor = "#44b0f8";
        });

        popupChoice.addEventListener("mouseout", () => {
            popupChoice.style.backgroundColor = "#4493f8";
        });
    } else if (choice == "public") {
        popupChoice.innerText = "Mettre en public";
        popupChoice.style.backgroundColor = "#4493f8";

        popupChoice.addEventListener("mouseover", () => {
            popupChoice.style.backgroundColor = "#44b0f8";
        });

        popupChoice.addEventListener("mouseout", () => {
            popupChoice.style.backgroundColor = "#4493f8";
        });
    } else if (choice == "warning") {
        popupChoice.innerText = "Signaler ce debug";
        popupChoice.style.backgroundColor = "#f85149";

        popupChoice.addEventListener("mouseover", () => {
            popupChoice.style.backgroundColor = "#ff6058";
        });

        popupChoice.addEventListener("mouseout", () => {
            popupChoice.style.backgroundColor = "#f85149";
        });
    }

    smokePage.style.display = state;
    popup.style.display = state;
}

// Animation du menu pour les debugs personnels
let option = document.querySelectorAll(".option");
let optionMenu = document.querySelectorAll(".option-menu");

// for (let i = 0; i < option.length; i++) {
//     option[i].addEventListener("click", () => {
//         let optionPosition = option[i].getBoundingClientRect().bottom;

//         if (
//             optionMenu[i].style.display == "" ||
//             optionMenu[i].style.display == "none"
//         ) {
//             option[i].style.transition = "0.1.75s";
//             option[i].style.backgroundColor = "#9198a16e";
//             // optionMenu[i].style.top = `${optionPosition}px`;
//             // console.log(optionMenu[i].style.top);
//             optionMenu[i].style.transition = "0.1.75s";
//             optionMenu[i].style.display = "block";
//         } else {
//             option[i].style.transition = "0.1.75s";
//             option[i].style.backgroundColor = "";
//             optionMenu[i].style.transition = "0.1.75s";
//             optionMenu[i].style.display = "none";
//         }

//         window.addEventListener("click", (e) => {
//             if (
//                 !optionMenu[i].contains(e.target) &&
//                 !option[i].contains(e.target)
//             ) {
//                 option[i].style.transition = "0.1.75s";
//                 option[i].style.backgroundColor = "";
//                 optionMenu[i].style.transition = "0.1.75s";
//                 optionMenu[i].style.display = "none";
//             }
//         });
//     });
// }

// Menu contextuel des debugs

// // Animation du bouton state
// let state = document.querySelectorAll(".state-btn"),
//     stateImg = document.querySelectorAll(".state-btn img"),
//     stateText = document.querySelectorAll(".state-btn p"),
//     stateImgSimple = document.querySelectorAll(".state-simple");

// for (let i = 0; i < state.length; i++) {
//     state[i].addEventListener("click", () => {
//         currentIndex = i; // Indice actuel

//         newStateTextPopup = stateText[i].innerText.slice(
//             10,
//             stateText[i].length
//         );

//         fixeBody();

//         if (newStateTextPopup == "privé") {
//             popup(
//                 "Rendre le debug privé?",
//                 "Il ne sera plus visible pour les autres utilisateurs.",
//                 "lock",
//                 "block"
//             );
//         } else {
//             popup(
//                 "Publier votre debug?",
//                 "Êtes-vous sûr de vouloir rendre ce debug visible pour tous?",
//                 "public",
//                 "block"
//             );
//         }
//     });
// }

// Bouton delete
let delBtn = document.querySelectorAll(".delete-btn"),
    mydebug = document.querySelectorAll(".mydebug"),
    mydebugPage = document.querySelector(".page");

// for (let i = 0; i < delBtn.length; i++) {
//     delBtn[i].addEventListener("click", () => {
//         currentIndex = i;

//         fixeBody();

//         popup(
//             "Êtes vous sûr?",
//             "Cette action est irréversible!",
//             "delete",
//             "block"
//         );
//     });
// }

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
        }
    );

    // Notification
    showNotif("image/fait.png", "Le lien de la ressource a été copié");
    setTimeout(() => {
        hideNotif();
    }, 2000);
}

let copyFunctionTab = [copyDebugLink, copyRessourceLink];

for (let i = 0; i < copyBtn.length; i++) {
    copyBtn[i].addEventListener("click", copyFunctionTab[i]);
}

// // Traitement de la popup en fonction de l'option
// choicePopup.addEventListener("click", () => {
//     popup((state = "none"));
//     noFixeBody();

//     if (choicePopup.innerText == "Supprimer ce debug") {
//         // Suppression du debug
//         debug[currentIndex].style.display = "none";
//         let debugPage = document.querySelectorAll(".page .mydebug");

//         if (debugPage.length == 0) {
//             nopost.style.display = "block";
//         }

//         let id_post = debug[currentIndex].getAttribute("id-post");
//         // Fetching pour la suppression d'un debug
//         fetch(hostname + "desktop-template-php/delete.php?id_post=" + id_post);

//         // Notification
//         showNotif("image/fait.png", "Votre debug a été supprimé");
//         setTimeout(() => {
//             hideNotif();
//         }, 2000);
//     } else if (choicePopup.innerText == "Signaler ce debug") {
//         let id_post = debug[currentIndex].getAttribute("id-post");
//         // Fetching pour le signalement d'un debug
//         fetch(hostname + "desktop-template-php/warning.php?id_post=" + id_post);
//     } else {
//         popup((state = "none"));
//         noFixeBody();

//         // Changement de l'état du debug
//         let newStateImg = stateImg[currentIndex].getAttribute("src");
//         let newStateImgSimple =
//             stateImgSimple[currentIndex].getAttribute("src");

//         stateImg[currentIndex].setAttribute("src", newStateImgSimple);
//         stateImgSimple[currentIndex].setAttribute("src", newStateImg);

//         console.log(newStateImg, newStateImgSimple);

//         newStateTextMenu = newStateImgSimple.slice(6, 12);
//         console.log(newStateTextMenu);
//         stateText[currentIndex].innerText = "Mettre en " + newStateTextMenu;

//         // Fetching pour la mise a jour du status
//         let id_post = debug[currentIndex].getAttribute("id-post"),
//             status = newStateTextPopup == "privé" ? "private" : "public";

//         fetch(
//             hostname +
//                 "desktop-template-php/status.php?id_post=" +
//                 id_post +
//                 "&status=" +
//                 status
//         );

//         showNotif(
//             "image/fait.png",
//             "Votre Debug est maintenant " + newStateTextPopup
//         );
//         setTimeout(() => {
//             hideNotif();
//         }, 2000);
//     }
// });

// cancelPopup.addEventListener("click", () => {
//     popup((state = "none"));
//     noFixeBody();
// });

// Affichage d'un message un message lorsque certaines pages sont vides
let nopost = document.querySelector(".nopost"),
    nofav = document.querySelector(".nofav"),
    nodebug = document.querySelector(".nodebug");

window.addEventListener("load", () => {
    nofav && debug.length == 0 ? (nofav.style.display = "flex") : "";
    nodebug && debug.length == 0 ? (nodebug.style.display = "flex") : "";
});

// Bouton like et favoris d'un debug autre que celui de l'utilisateur
let likePost = document.querySelectorAll(".notmydebug .count-like"),
    likePostImg = document.querySelectorAll(".notmydebug .count-like img"),
    likePostNumber = document.querySelectorAll(".notmydebug .count-like p"),
    favPost = document.querySelectorAll(".notmydebug .count-fav"),
    favPostImg = document.querySelectorAll(".notmydebug .count-fav img"),
    favPostNumber = document.querySelectorAll(".notmydebug .count-fav p");

// Fonction pour les boutons like et favoris
function postBtn(
    btn,
    btnImg,
    btnImgOldColor,
    btnImgNewColor,
    color,
    count,
    index_post,
    action
) {
    btn.style.transition = "0.2s";
    btn.style.transform = "scale(1.2)";
    let id_post = debug[index_post].getAttribute("id-post");

    // ON
    if (!btn.style.color) {
        // changement du style
        btn.style.color = color;
        btnImg.setAttribute("src", btnImgNewColor);
        let number = parseInt(count.innerText);
        count.innerText = number + 1;

        // Requete http
        fetch(
            hostname +
                "desktop-template-php/" +
                action +
                ".php?id_post=" +
                id_post +
                "&step=1"
        );

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

        fetch(
            hostname +
                "desktop-template-php/" +
                action +
                ".php?id_post=" +
                id_post +
                "&step=-1"
        );

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
        postBtn(
            likePost[i],
            likePostImg[i],
            "image/heart-regular-240-white.png",
            "image/heart-solid-240-pink.png",
            "#f91880",
            likePostNumber[i],
            i,
            "like"
        );
    });
}

// Bouton favoris
for (let i = 0; i < favPost.length; i++) {
    favPost[i].addEventListener("click", () => {
        postBtn(
            favPost[i],
            favPostImg[i],
            "image/bookmark-regular-240-white.png",
            "image/bookmark-solid-240-or.png",
            "#FFC107",
            favPostNumber[i],
            i,
            "fav"
        );

        // Retrait du debug des favoris
        if (window.location.pathname.includes("favoris.php")) {
            debug[i].remove();
            let notMyDebugCount = document.querySelectorAll(".notmydebug");
            nofav && notMyDebugCount.length == 0
                ? (nofav.style.display = "flex")
                : "";

            showNotif("image/fait.png", "Retiré de vos favoris");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        }
    });
}

// Formulaire d'ajout des debugs
let inputTitle = document.querySelector(".title-form-add"),
    inputDescription = document.querySelector(".description-form-add"),
    inputUrl = document.querySelector(".url-form-add"),
    inputAddErrorMessage = document.querySelectorAll(".entry .max-count"),
    errorMessage = document.querySelectorAll(".entry .error-simple"),
    inputCode = document.querySelector(".code-form-add"),
    labelUrl = document.querySelector(".label-link");

function displayError(obj, max, indexErrorMessage) {
    if ((obj.value.length = max)) {
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
    });

    inputDescription.addEventListener("input", function () {
        displayError(this, 500, 1);
    });

    inputUrl.addEventListener("input", function () {
        errorMessage[1].style.display = "none";
    });

    inputCode.addEventListener("input", function () {
        displayError(this, 7000, 2);
        // errorMessage[2].style.display = "none";
    });
}

// Image
let inputFileContainer = document.querySelector(".file-input"),
    inputFileImagePreview = document.querySelector(".file-input img"),
    inputFileText = document.querySelector(".file-input p"),
    inputFileInput = document.querySelector(".file-input input"),
    imageContainer = document.querySelector(".image-preview-container"),
    closeImage = document.querySelectorAll(".image-preview-container img")[1],
    link_picture_value = document.querySelector(".link_picture_value"),
    inputCodeContainer = document.querySelector(".entry-code");

if (inputFileText) {
    inputFileText.addEventListener("click", () => {
        inputFileInput.click();
    });
}

// Miniature de l'image
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
        inputCodeContainer.style.display = "none";
    }
}

if (inputFileInput) {
    inputFileInput.addEventListener("change", () => {
        // Vérification de la taille de l'image
        let inputSize = (inputFileInput.files[0].size / (1024 * 1024)).toFixed(
            1
        );

        if (inputSize > 5) {
            alert("La taille de l'image est trop grande (maximum 10 Mo)");
            inputFileInput.value = "";
        } else {
            previewFile();
            inputFileText.innerText = inputFileInput.files[0].name;
            imageContainer.style.display = "flex";
        }
    });

    // fermetture de l'image en cliquand sur le x
    closeImage.addEventListener("click", () => {
        imageContainer.style.display = "none";
        inputFileText.innerText = "Aucune image choisie";
        inputFileInput.value = "";
        link_picture_value ? (link_picture_value.value = "") : "";
        inputCodeContainer.style.display = "flex";
    });
}

// Snippet de code
if (inputCode) {
    inputCode.addEventListener("input", () => {
        if (inputCode.value.length > 0) {
            inputFileContainer.style.display = "none";
            inputUrl.required = false;
            labelUrl.innerText = "Lien (optionel)";
        } else {
            inputFileContainer.style.display = "flex";
            inputUrl.required = true;
            labelUrl.innerText = "Lien *";
        }
    });
}

// Banner
let setBannerContainer = document.querySelector(".set-banner-container"),
    bannerFile = document.querySelector('.form-set-banner input[type="file"]'),
    bannerSub = document.querySelector('.form-set-banner input[type="submit"]');

if (setBannerContainer) {
    setBannerContainer.addEventListener("click", () => {
        bannerFile.click();
    });

    bannerFile.addEventListener("change", () => {
        bannerSub.click();
    });
}

// Interaction notmydebug

// Rechargement de la page au clic du logo
let logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
    window.location.href = window.location.pathname;
});


// Copie du lien d'un debug dans mydebug.php
let sharePostMydebug = document.querySelectorAll(".option-menu .share-btn"),
    usernamePostMydebug = document.querySelectorAll(
        ".mydebug .top .pic-name-post-date a"
    );


// // Modification d'un de mes debugs
// let modifBtn = document.querySelectorAll(".option-menu .modif-btn"),
//     cancelModification = document.querySelector(".choice-group .cancel");

// for (let i = 0; i < modifBtn.length; i++) {
//     modifBtn[i].addEventListener("click", () => {
//         let idPost = debug[i].getAttribute("id-post");
//         console.log(typeof idPost);

//         window.location.href = "update-debug/" + idPost;
//     });
// }

// if (cancelModification) {
//     cancelModification.addEventListener("click", () => {
//         history.back();
//     });
// }

// // Image modale du debug
// let imgDebugModalContainer = document.querySelector(
//         ".image-debug-modal-container"
//     ),
//     imgDebugModal = document.querySelector(".img-debug-modal"),
//     imgDebug = document.querySelectorAll(".img-debug img"),
//     imgDebugClose = document.querySelector(".close-debug-modal"),
//     imgDebugContainer = document.querySelectorAll(".img-debug");

// // Click sur l'image
// for (let i = 0; i < imgDebug.length; i++) {
//     imgDebugContainer[i].addEventListener("click", () => {
//         // Récupération du path de l'image
//         let pathOfDebugImg = imgDebug[i].getAttribute("src");

//         imgDebugModal.setAttribute("src", pathOfDebugImg);
//         smokePage.style.display = "block";
//         imgDebugModalContainer.style.display = "block";

//         console.dir(imgDebugModal.width);
//         console.log(window.innerWidth);

//         if (imgDebugModal.width > (window.innerWidth * 80) / 100) {
//             imgDebugModal.style.width = "80%";
//             imgDebugModal.style.height = "auto";
//         }

//         if (imgDebugModal.height > (window.innerHeight * 90) / 100) {
//             imgDebugModal.style.width = "auto";
//             imgDebugModal.style.height = "90%";
//         }
//     });
// }

// // Click sur la croix pour fermer l'image
// imgDebugClose.addEventListener("click", () => {
//     smokePage.style.display = "none";
//     imgDebugModalContainer.style.display = "none";
// });

// // Click sur la zone neutre
// imgDebugModalContainer.addEventListener("click", (e) => {
//     if (e.target != imgDebugModal) {
//         smokePage.style.display = "none";
//         imgDebugModalContainer.style.display = "none";
//     }
// });

// // Copie du code posté
// let copyCode = document.querySelectorAll(".code .header div"),
//     copyCodeImg = document.querySelectorAll(".code .header div img"),
//     copyCodeText = document.querySelectorAll(".code .header div p"),
//     codeBloc = document.querySelectorAll(".code pre code");

// for (let i = 0; i < copyCode.length; i++) {
//     copyCode[i].addEventListener("click", () => {
//         navigator.clipboard.writeText(codeBloc[i].innerText).then(() => {
//             copyCodeText[i].innerText = "Copié";
//             copyCodeImg[i].setAttribute("src", "image/check-regular-240.png");

//             setTimeout(() => {
//                 copyCodeImg[i].setAttribute(
//                     "src",
//                     "image/copy-regular-240.png"
//                 );
//                 copyCodeText[i].innerText = "Copier le code";
//             }, 2000);
//         });
//     });
// }

// Debug en grand
// let nameContainer = document.querySelectorAll(".pic-name-post-date .img-container"),
//     linkDebug = document.querySelectorAll(".ressource"),
//     bottomDebug = document.querySelectorAll(".page .bottom"),
//     backBigDebug = document.querySelector(".back-big-debug"),
//     referrer = document.referrer,
//     isFromApp = referrer.includes(hostname),
//     codeBlocContainer = document.querySelectorAll(".code");
// console.log();

// console.log(window.location);
// mydebug

// for (let i = 0; i < debug.length; i++) {
//     debug[i].addEventListener("click", (e) => {
//         // Vérification préalable pour s'assurer que les éléments existent
//         if (
//             nameContainer[i] &&
//             option[i] &&
//             linkDebug[i] &&
//             imgDebugContainer[i] &&
//             usernamePostMydebug[i] &&
//             codeBloc[i] &&
//             !backBigDebug
//         ) {
//             // Vérification que e.target n'est dans aucun des éléments
//             if (
//                 !nameContainer[i].contains(e.target) &&
//                 !option[i].contains(e.target) &&
//                 !linkDebug[i].contains(e.target) &&
//                 !imgDebugContainer[i].contains(e.target) &&
//                 !codeBlocContainer[i].contains(e.target) &&
//                 !optionMenu[i].contains(e.target)
//             ) {
//                 let idPost = debug[i].getAttribute("id-post");

//                 // Navigation vers la nouvelle URL
//                 window.location.href =
//                     usernamePostMydebug[i].innerText + "/" + idPost;
//             }
//         } else {
//             console.warn(
//                 `Un ou plusieurs éléments sont indéfinis pour l'index ${i}`
//             );
//         }
//     });
// }

// notmydebug
// for (let i = 0; i < debug.length; i++) {
//     debug[i].addEventListener("click", (e) => {
//         // Ajout du paramètre 'e' ici pour capturer l'événement
//         // Vérification préalable pour s'assurer que tous les éléments sont définis
//         if (
//             nameContainer[i] &&
//             option[i] &&
//             linkDebug[i] &&
//             imgDebugContainer[i] &&
//             bottomDebug[i] &&
//             codeBloc[i] &&
//             !backBigDebug
//         ) {
//             // Vérification que e.target n'est dans aucun de ces éléments
//             if (
//                 !nameContainer[i].contains(e.target) &&
//                 !option[i].contains(e.target) &&
//                 !linkDebug[i].contains(e.target) &&
//                 !imgDebugContainer[i].contains(e.target) &&
//                 !bottomDebug[i].contains(e.target) &&
//                 !codeBlocContainer[i].contains(e.target) &&
//                 !optionMenu[i].contains(e.target)
//             ) {
//                 let idPost = debug[i].getAttribute("id-post");

//                 // Navigation vers la nouvelle URL
//                 window.location.href = usernamePost[i].innerText + "/" + idPost;
//             }
//         }
//     });
// }

// retour
// if (backBigDebug) {
//     backBigDebug.addEventListener("click", () => {
//         if (isFromApp) {
//             // Retour à la page précédente
//             window.history.back();
//         } else {
//             // Redirige vers une page par défaut (par exemple, la page d'accueil de l'application)
//             window.location.href = "/explorer"; // Remplacez par l'URL de la page d'accueil
//         }
//     });
// }

// // Signalement du debug
// let warningBtn = document.querySelectorAll(".warning-op");
// // console.log(warningBtn);

// for (let i = 0; i < warningBtn.length; i++) {
//     warningBtn[i].addEventListener("click", () => {

//         currentIndex = i;

//         fixeBody();

//         popup(
//             "Êtes vous sûr?",
//             "Cette action est irréversible et notifiera l'administrateur.",
//             "warning",
//             "block"
//         );
//     });
// }

// Animation pour l'input du container
let commentContainerTextarea = document.querySelector(
        ".comment-container textarea"
    ),
    commentContainer = document.querySelector(".comment-container"),
    bottomComment = document.querySelector(".bottom-comment"),
    cancelComment = document.querySelector(".bottom-comment .cancel"),
    commentBtn = document.querySelector(".bottom-comment .comment-btn");

if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener("focus", () => {
        bottomComment.style.display = "flex";
        commentContainerTextarea.style.height = "70px";
        commentContainerTextarea.style.minHeight = "70px";
        commentContainer.style.borderRadius = "20px";
    });

    cancelComment.addEventListener("click", () => {
        bottomComment.style.display = "none";
        commentContainerTextarea.style.height = "45px";
        commentContainerTextarea.style.minHeight = "45px";
        commentContainer.style.borderRadius = "50px";
        commentContainerTextarea.value = "";
    });

    commentBtn.addEventListener("click", () => {
        let profil_pic = document
                .querySelector(".mini-profil-pic-container img")
                .getAttribute("src"),
            username = document.querySelector(
                ".mini-profil .username"
            ).innerText,
            bigContainer = document.querySelector(".comments-big-container"),
            idPost = document
                .querySelector(".notmydebug")
                .getAttribute("id-post");

        // Ajout du commentaire dans la DB
        fetch(
            hostname +
                "desktop-template-php/comment_post.php?id_post=" +
                idPost +
                "&" +
                "content_comment=" +
                commentContainerTextarea.value +
                "&" +
                "status_comment=" +
                (bigContainer.childNodes.length == 1 ? "first" : "lambda")
        );

        createComment(
            username, // Nom d'utilisateur
            "0s", // Date du post
            commentContainerTextarea.value, // Contenu
            profil_pic // Image de profil
        );

        bottomComment.style.display = "none";
        commentContainerTextarea.style.height = "45px";
        commentContainerTextarea.style.minHeight = "45px";
        commentContainer.style.borderRadius = "50px";
        commentContainerTextarea.value = "";
    });
}

// Fonction pour créer un nouveau commentaire
function createComment(username, postDate, content, profilePic) {
    // Sélectionner le conteneur parent
    const bigContainer = document.querySelector(".comments-big-container");

    // Créer le conteneur principal du commentaire
    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");

    // Créer l'image de profil
    const profileImg = document.createElement("img");
    profileImg.src = profilePic; // Source de l'image de profil
    profileImg.classList.add("profil-pic-comment");

    // Créer le conteneur pour le nom, la date et le contenu
    const nameDateContent = document.createElement("div");
    nameDateContent.classList.add("name-date-content");

    // Créer le conteneur pour le nom et la date
    const nameDate = document.createElement("div");
    nameDate.classList.add("name-date");

    // Créer le lien pour le nom d'utilisateur
    const userLink = document.createElement("a");
    userLink.href = "#"; // Tu peux remplacer par une URL dynamique
    userLink.textContent = username;

    // Créer le séparateur "•"
    const separator = document.createElement("p");
    separator.textContent = "•";

    // Créer la date du post
    const postDateElement = document.createElement("p");
    postDateElement.textContent = postDate;

    // Ajouter le nom, le séparateur et la date au conteneur "name-date"
    nameDate.appendChild(userLink);
    nameDate.appendChild(separator);
    nameDate.appendChild(postDateElement);

    if (bigContainer.childNodes.length == 1) {
        // Créer le 2eme séparateur "•"
        const separatorTwo = document.createElement("p");
        separatorTwo.textContent = "•";

        // Mention first comment
        const firstComment = document.createElement("i");
        firstComment.textContent = "first comment 🥇";

        nameDate.appendChild(separatorTwo);
        nameDate.appendChild(firstComment);
    }

    // Créer le contenu du commentaire
    const contentParagraph = document.createElement("p");
    contentParagraph.classList.add("content");
    contentParagraph.textContent = content;

    // Assembler les éléments dans "name-date-content"
    nameDateContent.appendChild(nameDate);
    nameDateContent.appendChild(contentParagraph);

    // Ajouter l'image de profil et "name-date-content" dans "comments-container"
    commentsContainer.appendChild(profileImg);
    commentsContainer.appendChild(nameDateContent);

    // Ajouter le commentaire complet dans le conteneur principal
    bigContainer.appendChild(commentsContainer);
}

// Chargement avec spinner
window.addEventListener("load", () => {
    setTimeout(() => {
        if (spinner) spinner.style.display = "none"; // Masque le spinner s'il existe

        if (debug.length > 0) {
            
            // Fait apparaitre les debugs
            [...debug].forEach((element) => {
                element.style.display = "flex";
            });

            // Formattage de l'image des debugs
            formatDebugImg()
        }
    }, 500);
});

// Fonction pour le formattage de l'image des debugs
function formatDebugImg() {
    
    // let imgDebug = document.querySelectorAll(".img-debug img");
    
    for (let i = 0; i < imgDebug.length; i++) {
        if (imgDebug[i].clientHeight > 310) {
            imgDebug[i].style.height = "310px";
            imgDebug[i].style.width = "auto";
        }
    }
    console.log(imgDebug[imgDebug.length - 1].clientHeight);
console.log(imgDebug.length);
}

// console.log("Debug length:", debug.length);
// console.log("nameContainer length:", nameContainer.length);
// console.log("linkDebug length:", linkDebug.length);
// console.log("bottomDebug length:", bottomDebug.length);
// console.log("imgDebugContainer length:", imgDebugContainer.length);

// Scroll infini 15 par 15
// Créer une instance de l'Intersection Observer
if (fileName == "mydebug" || fileName == "explorer" || fileName == "favoris") {
    let start_point = 15,
        index_observation = 14;
    
    const observer = new IntersectionObserver((element, observer) => {
        if (element[0].isIntersecting) {
            console.log(element);
            console.log("dernier debug vu !");
            
            let spinnerClone = spinner.cloneNode(true);
            page.appendChild(spinnerClone);
            spinnerClone.style.display = "flex";
            spinnerClone.style.marginBottom = "20px";
            observer.unobserve(element[0].target);
            
            fetch(
                `${hostname}desktop-template-php/infinite-scroll-${fileName}.php?start_point=${start_point}`
            )
                .then((response) => response.json())
                
                .then((data) => {
                    setTimeout(() => {
                        // Création des debugs supplémentaires
                        data.map((post) => {
                            debugContainer.appendChild(createDebug(post));
                        });
                        
                        // Suppression du spinner
                        spinnerClone.remove();
                        
                        // Incrémentation des index d'observation et de points de départ
                        index_observation += 15;
                        start_point += 15;
                        
                        // Observer le dernier debug
                        observer.observe(debug[index_observation]);
                        
                        console.log(data);
                        console.log(debug);
                        
                        setTimeout(() => {
                            // Formattage de l'image du debug
                            imgDebug = document.querySelectorAll(".img-debug img");
                            formatDebugImg();
                        }, 100);
                        
                    }, 500);
                });
        }
    });
    
    // Observer le dernier debug
    fileName == "mydebug" ? observer.observe(debug[index_observation]) : "";
}


// Ajout des evennements par délégation

debugContainer?.addEventListener("click", (event) => {
    // console.dir(event.target);
    
    // Menu
    if (event.target.classList.contains("option")) {
        
        let option = event.target, 
            optionMenu = option.nextElementSibling;
        
        if (optionMenu.style.display == "" || optionMenu.style.display == "none") {
            
            option.style.transition = "0.1.75s";
            option.style.backgroundColor = "#9198a16e";
            optionMenu.style.transition = "0.1.75s";
            optionMenu.style.display = "block";
            
        } else {
            
            option.style.transition = "0.1.75s";
            option.style.backgroundColor = "";
            optionMenu.style.transition = "0.1.75s";
            optionMenu.style.display = "none";
            
        }
        
        // Click sur une autre zone à part le menu
        window.addEventListener("click", (e) => {
            if (
                !optionMenu.contains(e.target) &&
                !option.contains(e.target)
            ) {
                option.style.transition = "0.1.75s";
                option.style.backgroundColor = "";
                optionMenu.style.transition = "0.1.75s";
                optionMenu.style.display = "none";
            }
        });
        console.log("menu cliqué");
    }
    
    // Bouton partagé
    if (event.target.classList.contains("share-btn") || event.target.parentNode.classList.contains("share-btn")) {
        
        if (fileName == "mydebug") {
            var usernamePost = event.target.offsetParent.offsetParent.querySelector(".top .pic-name-post-date a").innerText,
                idPost = event.target.offsetParent.offsetParent.getAttribute("id-post");
        }
        else {
            var usernamePost = event.target.offsetParent.querySelector(".top .pic-name-post-date a").innerText,
            idPost = event.target.offsetParent.getAttribute("id-post");
        }
        
        let contentToShare = hostname + usernamePost + "/" + idPost;
        
        navigator.clipboard.writeText(contentToShare).then(() => {
            showNotif("image/fait.png", "Lien du debug copié");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        })
        
    }
    
    // Bouton copier le lien
    if (event.target.classList.contains("ressource-btn") || event.target.parentNode.classList.contains("ressource-btn") || event.target.classList.contains("copy-btn") || event.target.parentNode.classList.contains("copy-btn")) {
        
        if (fileName == "mydebug") {
            var debugLink = event.target.offsetParent.offsetParent.querySelector(".ressource a").href;
        }
        else {
            var debugLink = event.target.offsetParent.querySelector(".ressource a").href;
        }
        
        navigator.clipboard.writeText(debugLink).then(() => {
            showNotif("image/fait.png", "Lien de la ressource copié");
            setTimeout(() => {
                hideNotif();
            }, 2000);
        })
    }
    
    // Modification d'un debug
    if (event.target.classList.contains("modif-btn") || event.target.parentNode.classList.contains("modif-btn")) {
        
        let idPost = event.target.offsetParent.offsetParent.getAttribute("id-post");
        window.location.href = "update-debug/" + idPost;
        
    }

    // Etat d'un debug
    if (event.target.classList.contains("state-btn") || event.target.parentNode.classList.contains("state-btn")) {
        
        debugPopup = event.target.offsetParent.offsetParent; // Debug concerné
        
        stateImg = debugPopup.querySelector(".state-btn img");
        stateText = debugPopup.querySelector(".state-btn p");
        stateImgSimple = debugPopup.querySelector(".state-simple");
        
        newStateTextPopup = stateText.innerText.slice(10, stateText.length);
        
        fixeBody();
        
        if (newStateTextPopup == "privé") {
            popup(
                "Rendre le debug privé?",
                "Il ne sera plus visible pour les autres utilisateurs.",
                "lock",
                "block"
            );
        } else {
            popup(
                "Publier votre debug?",
                "Êtes-vous sûr de vouloir rendre ce debug visible pour tous?",
                "public",
                "block"
            );
        }
    }
    
    // Suppression d'un debug
    if (event.target.classList.contains("delete-btn") || event.target.parentNode.classList.contains("delete-btn")) {
        
        debugPopup = event.target.offsetParent.offsetParent; // Debug concerné
        
        fixeBody();
        
        popup(
            "Êtes vous sûr?",
            "Cette action est irréversible!",
            "delete",
            "block"
        );
        
    }

    // Copie du code posté
    if (event.target.classList.contains("copy-code-container") || event.target.parentNode.classList.contains("copy-code-container")) {
        
        console.log(event.target.offsetParent.offsetParent);
        
        let debugClick = event.target.offsetParent.offsetParent,
            copyCodeImg = debugClick.querySelector(".code .header div img"),
            copyCodeText = debugClick.querySelector(".code .header div p"),
            codeBloc = debugClick.querySelector(".code pre code");
        
        navigator.clipboard.writeText(codeBloc.innerText).then(() => {
            
            copyCodeText.innerText = "Copié";
            copyCodeImg.setAttribute("src", "image/check-regular-240.png");
            
            setTimeout(() => {
                copyCodeImg.setAttribute(
                    "src",
                    "image/copy-regular-240.png"
                );
                copyCodeText.innerText = "Copier le code";
            }, 2000);
            
        })
        
    }
    
    // Signalement d'un debug
    if (event.target.classList.contains("warning-op") || event.target.parentNode.classList.contains("warning-op")) {
        
        debugPopup = event.target.offsetParent.offsetParent; // Debug concerné
        
        fixeBody();
        
        popup(
            "Êtes vous sûr?",
            "Cette action est irréversible et notifiera l'administrateur.",
            "warning",
            "block"
        );
    }
    
    // Redirection vers le debug en grand
    if (event.target.hasAttribute("redirect-big-debug")) {
        
        if (event.target.classList.contains("old-debug") || event.target.classList.contains("new-debug")) {
            var usernamePost = event.target.querySelector(".top .pic-name-post-date a").innerText,
            idPost = event.target.getAttribute("id-post");
        } else {
            var usernamePost = event.target.offsetParent.querySelector(".top .pic-name-post-date a").innerText,
            idPost = event.target.offsetParent.getAttribute("id-post");
        }
        
        console.log(`usernamePost: ${usernamePost}`);
        console.log(`idPost: ${idPost}`);
        
        // Navigation vers la nouvelle URL
        window.location.href = usernamePost.innerText + "/" + idPost;
    }
    
    // Image modale du debug
    if (event.target.parentNode.classList.contains("img-debug")) {
        
        let imgDebugModalContainer = document.querySelector(".image-debug-modal-container"),
            imgDebugModal = document.querySelector(".img-debug-modal");
        
        if (event.target.alt == "debug-image") {
            var imgDebug = event.target;
        } else {
            var imgDebug = event.target.nextElementSibling;
        }
        
        // Récupération du path de l'image
        let pathOfDebugImg = imgDebug.getAttribute("src");
        
        imgDebugModal.setAttribute("src", pathOfDebugImg);
        smokePage.style.display = "block";
        imgDebugModalContainer.style.display = "block";
        
        if (imgDebugModal.width > (window.innerWidth * 80) / 100) {
            imgDebugModal.style.width = "80%";
            imgDebugModal.style.height = "auto";
        }
        
        if (imgDebugModal.height > (window.innerHeight * 90) / 100) {
            imgDebugModal.style.width = "auto";
            imgDebugModal.style.height = "90%";
        }
        
    }
});

// Annulation de la modification d'un debug
let cancelModification = document.querySelector(".choice-group .cancel");
cancelModification?.addEventListener("click", () => {
    history.back();
});


// Traitement de la popup en fonction de l'option
choicePopup.addEventListener("click", () => {
    popup((state = "none"));
    noFixeBody();

    if (choicePopup.innerText == "Supprimer ce debug") {
        // Suppression du debug
        debugPopup.style.display = "none";

        if (debug.length == 0) {
            nopost.style.display = "block";
        }

        let id_post = debugPopup.getAttribute("id-post");
        // Fetching pour la suppression d'un debug
        fetch(hostname + "desktop-template-php/delete.php?id_post=" + id_post);

        // Notification
        showNotif("image/fait.png", "Votre debug a été supprimé");
        setTimeout(() => {
            hideNotif();
        }, 2000);
    } else if (choicePopup.innerText == "Signaler ce debug") {
        
        let id_post = debugPopup.getAttribute("id-post");
        
        // Fetching pour le signalement d'un debug
        fetch(hostname + "desktop-template-php/warning.php?id_post=" + id_post);
        
        // Notification
        showNotif("image/fait.png", "Debug signalé");
        setTimeout(() => {
            hideNotif();
        }, 2000);

    } else {
        popup((state = "none"));
        noFixeBody();
        
        // Changement de l'état du debug
        let newStateImg = stateImg.getAttribute("src");
        let newStateImgSimple = stateImgSimple.getAttribute("src");
        
        stateImg.setAttribute("src", newStateImgSimple);
        stateImgSimple.setAttribute("src", newStateImg);
        
        console.log(newStateImg, newStateImgSimple);
        
        newStateTextMenu = newStateImgSimple.slice(6, 12);
        console.log(newStateTextMenu);
        stateText.innerText = "Mettre en " + newStateTextMenu;
        
        // Fetching pour la mise a jour du status
        let id_post = debugPopup.getAttribute("id-post"),
            status = newStateTextPopup == "privé" ? "private" : "public";
        
        fetch(hostname + "desktop-template-php/status.php?id_post=" + id_post + "&status=" + status);
        
        showNotif("image/fait.png", "Votre Debug est maintenant " + newStateTextPopup);
        
        setTimeout(() => {
            hideNotif();
        }, 2000);
    }
});

// Bouton "X" ou annuler sur la popup
cancelPopup.addEventListener("click", () => {
    popup((state = "none"));
    noFixeBody();
});


// retour du debug en grand
let backBigDebug = document.querySelector(".back-big-debug"),
    referrer = document.referrer,
    isFromApp = referrer.includes(hostname);

backBigDebug?.addEventListener("click", () => {
    if (isFromApp) {
        // Retour à la page précédente
        window.history.back();
    } else {
        // Redirige vers une page par défaut (par exemple, la page d'accueil de l'application)
        window.location.href = "/explorer"; // Remplacez par l'URL de la page d'accueil
    }
});


// Image modale du debug
let imgDebugModalContainer = document.querySelector(".image-debug-modal-container"),
imgDebugClose = document.querySelector(".close-debug-modal"),
imgDebug = document.querySelectorAll(".img-debug img"),
imgDebugModal = document.querySelector(".img-debug-modal"),
imgDebugContainer = document.querySelectorAll(".img-debug");

// Click sur la croix pour fermer l'image modale du debug
imgDebugClose.addEventListener("click", () => {
smokePage.style.display = "none";
imgDebugModalContainer.style.display = "none";
});

// Click sur la zone neutre pour fermer l'image modale du debug
imgDebugModalContainer.addEventListener("click", (e) => {
if (e.target != imgDebugModal) {
    smokePage.style.display = "none";
    imgDebugModalContainer.style.display = "none";
}
});



