import { getWorks } from "./gallery.js";//On importe la liste des travaux capturé dans gallery.js


//essai: tentative de savoir si un token est bien présent et console.log pour vérif:

if (localStorage.getItem("token")) {//Si localstorage a un élémént appelé "token" (getItem fonction bizarre qui appartient à local storage)
    //console.log("storage on");
    const classAdmin = document.querySelectorAll(".admin");//On selectionne tous les éléments qui on la class Admin
    for (let classA of classAdmin) { //pour chaque élément de la classe admin
        classA.style.display = "flex";// La propriété display de chaque élément = maintenant à "flex", alors qu'il était à "none" donc tous ces éléménts apparaissent à l'écran
    }
    const login = document.querySelector(".login");//l'élémnent se connecter qui est à côté des liens Projets et Contact disparait en mettant none à sa propriété display
    login.style.display = "none";//
}


function ouvreModalePrincipale() {
    const modale = document.querySelector(".modale");

    const modaleWrapp = document.querySelector(".modale-wrapp");
    const ouvreModale = document.querySelectorAll(".ouvre-modale");
    for (let ouvreMod of ouvreModale) {
        ouvreMod.addEventListener("click", function () {
            modale.style.position = "fixed";//On met la propriété position=fixed pour que la modale prennent tout l'écran, qu'elle puisse apparaitre et qu'on puisse ccentre la modale-wrapp via un flex
            modaleWrapp.style.display = "flex";// par défaut display:none donc la modale-wrapp apparait
        })
    }
}


function fermeModalePrincipale() {
    const modale = document.querySelector(".modale");
    const modaleWrapp = document.querySelector(".modale-wrapp");
    const croix = document.querySelector(".modale-wrapp .close");

    document.addEventListener("click", function (event) {
        console.log(event.target.matches);
        
    if(event.target===modale||event.target===croix){
        console.log(croix);
        modaleWrapp.style.display = "none";
        modale.style.position = "relative";
    }
        });
   
}






function OuvreModaleAjoutProjet() {
    const modale = document.querySelector(".modale");
    const ajoutPhoto = document.querySelector(".ajouterPhoto");
    const modaleLoading = document.querySelector(".modale-loading");
    const modaleWrapp = document.querySelector(".modale-wrapp");
    ajoutPhoto.addEventListener("click", function () {
        modaleWrapp.style.display = "none";
        modaleLoading.style.display = "flex";
        modale.style.position = "fixed";
    })
}

function retourModalePrincipale() {
    const modaleWrapp = document.querySelector(".modale-wrapp");
    const modaleLoading = document.querySelector(".modale-loading");
    const fleche = document.querySelector(".arrow-left");
    fleche.addEventListener("click", function () {
        modaleLoading.style.display = "none";
        modaleWrapp.style.display = "flex";
    })
}

function fermerModaleAjoutProjet() {
    const modale = document.querySelector(".modale");
    const modaleLoading = document.querySelector(".modale-loading");
    const modaleWrapp = document.querySelector(".modale-wrapp");
    const croix = document.querySelector(".modale-loading .close");
    document.addEventListener("click", function (event) {
        if(event.target===croix||event.target===modale){
        modaleLoading.style.display = "none";
        modaleWrapp.style.position = "flex";
        modale.style.position = "relative";
        }
    })
}



function genererGallerieAcceuil(listeTravaux) {
    const galleri = document.querySelector(".galleri");

    //Boucle qui fait apparaitre les elements (image et titres) de chaque article dans la galerie  :
    for (let work of listeTravaux) {
        //A chaque tour de boucle, il se créer une balise article contenant une image et son titre de projet, et les deux icones bin et croix-fleche:
        const ficheTravaux = document.createElement("article");

        const image = document.createElement("img");
        const title = document.createElement("p");
        //Création des icones pour chaque photo :
        const imageCroixFleche = document.createElement("img")
        const imageBin = document.createElement("img");

        //x.appendchild(x) pour tous les éléments créés;

        galleri.appendChild(ficheTravaux);
        ficheTravaux.appendChild(imageBin);
        ficheTravaux.appendChild(image);
        ficheTravaux.appendChild(title);
        ficheTravaux.appendChild(imageCroixFleche);


        title.innerText = "éditer";
        image.src = work.imageUrl;
        //Créer icone bin pour chaque photo :
        image.setAttribute("class", "photo");
        imageBin.src = "./assets/icons/bin.svg";
        imageBin.setAttribute("class", "bin");
        imageCroixFleche.setAttribute("class", "croix-fleche");
        imageCroixFleche.src = "./assets/icons/croix-fleche.svg";

    }
}




(async function main() {
    const listeTravaux = await getWorks();
    await genererGallerieAcceuil(listeTravaux);
    ouvreModalePrincipale();
    fermeModalePrincipale();
    OuvreModaleAjoutProjet();
    retourModalePrincipale();
    fermerModaleAjoutProjet();
})();