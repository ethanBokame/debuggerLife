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
let tabBtn = document.querySelectorAll('.tab .group div');

function toPage(index) {
    
    let page = document.querySelectorAll('.page div');
    
    page.forEach(function(item, i) {
        
        i == index ? 
        
        (tabBtn[i].style.backgroundColor = "#9198a184",
        item.style.display = "block") : 
        
        (tabBtn[i].style.backgroundColor = "",
        item.style.display = "none");
    });
    
}


tabBtn.forEach((item, i) => {
    item.addEventListener("click", () => {
        toPage(i);
    })
});