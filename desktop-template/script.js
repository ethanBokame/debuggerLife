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
    closeBtn = document.querySelector('.close');

search.addEventListener("input", () => {
    closeBtn.style.visibility = "visible"
})

closeBtn.addEventListener("click", () => {
    search.value = "";
    closeBtn.style.visibility = "hidden";
})