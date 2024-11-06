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

// Search box
let search = document.querySelector('#search'),
    closeBtn = document.querySelector('.close'),
    searchBox = document.querySelector('.search-box'),
    loupe = document.querySelector('.loupe');

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

closeBtn.addEventListener("click", () => {
    search.value = "";
    closeBtn.style.visibility = "hidden";
})

// Ajout des suggestions a la recherche
let suggestion = document.querySelectorAll('.suggestion'),
    suggestionText = document.querySelectorAll('.suggestion h5');

suggestion.forEach((item, i) => {
    item.addEventListener("click", () => {
        search.value = suggestionText[i].innerText;
        closeBtn.style.visibility = "visible";
    })
});