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

// Tabulation pour grand écran
// let tabBtn = document.querySelectorAll('.tab .group div');

// function toPage(index) {
    
//     let page = document.querySelectorAll('.page div'),
//         brandText = document.querySelector('.logo p'),
//         tabBtnText = document.querySelectorAll('.tab .group div p');
    
//     // Changelent d'état pour le bouton et de page
//     page.forEach(function(item, i) {
        
//         i == index ? 
        
//         (tabBtn[i].style.backgroundColor = "#9198a184",
//         brandText.innerText = tabBtnText[i].innerText,
//         item.style.display = "block") : 
        
//         (tabBtn[i].style.backgroundColor = "",
//         item.style.display = "none");
//     });
    
// }

// // Application de la fonction de changement de pages pour chaque bouton
// tabBtn.forEach((item, i) => {
//     item.addEventListener("click", () => {
//         toPage(i);
//     })
// });