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
    // option = ["html","css","javascript","php","react","vue","angular","node.js","express","mongodb","sql","python","java","swift","kotlin","android","ios","flutter","git","github","docker","jenkins","aws","azure","linux","bash","vscode","sublime text","webpack","npm","yarn","babel","firebase","graphql","rest api","ui/ux","design patterns","debugging","testing","performance optimization","ci/cd","machine learning","ai tools","cloud storage","version control",];

// function Search(options, entry) {
//     let goodOptions = [];
//     options.forEach((item) => {
//         if (item.includes(entry)) {
//             goodOptions.push(item)
//         }
//     });
//     return goodOptions;
// }

// searchBox.addEventListener("click", () => {
//     searchBox.style.transition = "0.2s";
//     searchBox.style.border = "1px solid white";
// })

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