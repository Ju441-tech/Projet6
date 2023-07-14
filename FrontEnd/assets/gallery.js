


//Demande à l'API de fournir la liste des travaux (requête GET envoyée à l'API):
async function getWorks() {
    const reponse = await fetch(`http://localhost:5678/api/works`);
    //Conversion de la réponse de l'API, en format JSON, grâce à la fonction.json() afin de pouvoir utiliser la liste reçue des travaux :
    const works = await reponse.json();
    return works;
}
//Récupération et création de la liste des catégories :
async function getCategory() {
    const reponse = await fetch(`http://localhost:5678/api/categories`);
    //Conversion de la réponse de l'API, en format JSON, grâce à la fonction.json() afin de pouvoir utiliser la liste reçue des travaux :    
    const categories = await reponse.json();
    categories.unshift({ "id": 0, "name": "Tous" });//On ajoute au déburt de la liste la categorie 0, appelé "Tous"   
    return categories;
}



//Generer les boutons filtre dynamiquement :
async function genererBoutonsFiltres() {
    const filtres = document.querySelector(".filtres")
    for (let categorie of await getCategory()) {
        const boutonFiltre = document.createElement("button");
        filtres.appendChild(boutonFiltre)
        boutonFiltre.innerText = categorie.name;
        boutonFiltre.addEventListener("click", filter)//Les boutons deviennent fonctionnels lorsqu'on clique dessus, on filtre la liste des travaux complète d'origine

        //Generer la liste des categories dans le select de la modal qui ajoute un projet :
        const CategoriesSelector = document.querySelector("#select-category-loading")
        if (categorie.id!=0){const selectOption = document.createElement("option")//!! On ne met pas la catégorie "tous" dans le select, car ce n'est pas une catégorie
            CategoriesSelector.appendChild(selectOption)
            selectOption.innerText = categorie.name
            selectOption.setAttribute("value", categorie.id)//Ajoute un "value" pour pouvoir envoyer le numéro de la catégorie dans la requete POST, afin d'envoyer un nouveau projet
        }
    }

}




//fonction qui filtre la liste des travaux par catégories en fonction du filtre sur lequel on a cliqué :
async function filter(event) {
    const works = await getWorks()
    const parent = event.target.closest(".filtres")
    if (parent) {
        let filterWorks = [];
        if (event.target.innerText === "Tous") {
            filterWorks = works;
        } else {
            filterWorks = works.filter(function (list) {//On va filtrer la liste d'origine des travaux. si le texte qui est à l'int"rieur des balises de l'élément cliqué=le texte d'un élément de la liste des travaux, on le met dans une nouvelle liste qui s'appelle newList, par exemple : si on clique sur le bouton Objet newList aura un nouvel élément , celui qui aura un category.name = à Objet
                return list.category.name === event.target.innerText;//SI le nom de la catégorie de l'élément du tableau des travaux originaux ===le text du bouton, on ajoute l'élément à la newList
            })
        }
        genererGallery(filterWorks, "gallery")//régénère la nouvelle gallerie filtrée
    }
}


//Ici, on créer le JS pour l'affichage dynamique de la gallery dans la page web au lieu de l'écrire dans le Html
//Création de la fonction qui créée une gallerie avec autant de fiches que dans la liste reçue, fiche, qui contient l'image et le titre d'un projet:

async function genererGallery(listeTravaux, type = "gallery") {
    const galleryAcceuil = document.querySelector(".gallery")
    const galleryModal = document.querySelector("#gallery-modal")
    //liste travaux pour modal : getWorks() n'est pas une liste classique c'est une liste JSON il faut donc la convertir quoique : faire un console.log
    //Boucle qui fait apparaitre les elements (image et titres) de chaque article dans la galerie  :


    //A chaque tour de boucle, il se créer une balise article contenant une image et son titre de projet:
    if (type === "gallery") {
        galleryAcceuil.innerHTML = ""
        for (let work of listeTravaux) {
            const ficheTravaux = document.createElement("article");
            const image = document.createElement("img")
            const title = document.createElement("p");

            //x.appendchild(x);


            galleryAcceuil.appendChild(ficheTravaux);

            ficheTravaux.appendChild(image);
            ficheTravaux.appendChild(title);


            title.innerText = work.title;
            image.src = work.imageUrl;
        }
    }
    if (type === "modal") {
        galleryModal.innerHTML = ""//Permet de ne pas rajouter des projets à chaque fois qu'on click et qu'on filtre des projets, le nombre de projets ne change pas, quoiqu'il arrive
        const listWorks = await getWorks()
        for (let element of listWorks) {
            const ficheTravaux = document.createElement("article");
            const image = document.createElement("img")
            const iconBin = document.createElement("img")
            const title = document.createElement("p");


            //x.appendchild(x);


            galleryModal.appendChild(ficheTravaux);
            ficheTravaux.appendChild(iconBin);
            ficheTravaux.appendChild(image);
            ficheTravaux.appendChild(title);

            iconBin.setAttribute("data-id", element.id)
            iconBin.src = "./assets/icons/bin.svg"
            iconBin.setAttribute("class", "iconBin")
            iconBin.addEventListener("click", deleteWork)
            title.innerText = "éditer";
            image.src = element.imageUrl;
        }
    }
}



//*********************LOGIN************************ */


if (localStorage.getItem("token")) {//Si localstorage a un élémént appelé "token" (getItem fonction bizarre qui appartient à local storage)
    //On n'affiche plus les filtres :
    const affichefiltres =document.querySelector(".filtres")
    affichefiltres.style.display="none"

    //On fait apparaitre tous les éléments qui doivent apparaitre en mode admin (tous ceux qui ont la class admin), en changeant la propriété du css admin en display flex au lieu de none:
    const classAdmin = document.querySelectorAll(".admin");//On selectionne tous les éléments qui on la class Admin
    for (let classA of classAdmin) { //pour chaque élément de la classe admin
        classA.style.display = "flex";// La propriété display de chaque élément = maintenant à "flex", alors qu'il était à "none" donc tous ces éléménts apparaissent à l'écran
    }
    const login = document.querySelector(".login");//l'élémnent se connecter qui est à côté des liens Projets et Contact disparait en mettant none à sa propriété display
    login.style.display = "none";//

}
/**deconnection de la session */
function disconnect() {
    localStorage.clear()
    window.open("index.html")
}
const logout = document.querySelector(".logout")
logout.addEventListener("click", disconnect)
/*********Gestion modales************ */


const openModalWrapp = async function () {
    const works = await getWorks()
    modalWrapp.removeAttribute("class", "hidde")
    modalWrapp.setAttribute("class", "modal-wrapp")
    ouvreModalWrapp.removeEventListener("click", openModalWrapp)
    modalWrapp.addEventListener("click", closeModalWrapp)
    genererGallery(works, "modal")
    const buttonAjouterPhoto = document.querySelector("#buttonAjouterPhoto")
    buttonAjouterPhoto.addEventListener("click", openModalLoading)
}

const closeModalWrapp = function (event) {
    const buttonCloseModalWrapp = document.querySelector("#close-modal")
    const parent = event.target.closest(".modal-wrapp-content")
    if (!parent || event.target === buttonCloseModalWrapp) {
        modalWrapp.removeAttribute("class", "modal-wrapp")
        modalWrapp.setAttribute("class", "hidde")
        modalWrapp.removeEventListener("click", closeModalWrapp)
    }
    ouvreModalWrapp.addEventListener("click", openModalWrapp) //A ne pas oublier !! Car lorsque toutes les modales sont fermées, il faut un eventlistener pour écouter si on clique pour ouvrir la première modale 
}

function openModalLoading() {
    modalWrapp.removeAttribute("class", "modal-wrapp")
    modalWrapp.setAttribute("class", "hidde")
    buttonAjouterPhoto.removeEventListener("click", openModalLoading)
    const modalLoading = document.querySelector("#modal-loading")
    modalLoading.removeAttribute("class", "hidde")
    modalLoading.setAttribute("class", "modal-loading")
    modalLoading.addEventListener("click", returnModalWrapp)
    modalLoading.addEventListener("click", closeModalLoading)
}
function returnModalWrapp(event) {
    const fleche = document.querySelector("#arrow-left-modal-loading")
    const modalLoading = document.querySelector("#modal-loading")
    if (event.target === fleche) {
        modalLoading.removeEventListener("click", returnModalWrapp)
        modalLoading.removeAttribute("class", "modal-loading")
        modalLoading.setAttribute("class", "hidde")
        openModalWrapp()
    }
}
function closeModalLoading(event) {
    const modalLoading = document.querySelector("#modal-loading")
    const croix = document.querySelector("#close-modal-loading")
    const parent = event.target.closest(".modal-loading-content")
    if (!parent || event.target === croix) {
        modalLoading.removeEventListener("click", closeModalLoading)
        modalLoading.removeAttribute("class", "modal-loading")
        modalLoading.setAttribute("class", "hidde")
    }
    ouvreModalWrapp.addEventListener("click", openModalWrapp)//!!!!!!!pour pouvoir rouvrir modalWrapp lorsqu'aucune modale n'est ouverte
}

//Ouvrir la modal depuis la page d'acceuil :
const modalWrapp = document.querySelector("#modal-wrapp")
const ouvreModalWrapp = document.querySelector(".js-modal-wrapp")
ouvreModalWrapp.addEventListener("click", openModalWrapp)//Ouvre la modale



//Fonction appelée dans modale wrapp!!!  :
async function deleteWork(event) {
    //console.log(event.target.dataset.id)//On obtient un nombre qui correspond au nuéro du projet. Attention:: Ca commence par 1 pas par 0
    event.preventDefault();
    event.stopPropagation();
    const iconeElement = event.target.dataset.id;
    let monToken = localStorage.getItem("token");
    let response = await fetch(
        `http://localhost:5678/api/works/${iconeElement}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${monToken}`,
            },
        }

    );
    alert("Projet supprimé avec Succès!!")
    const gallery = document.querySelector(".gallery")
    const galleryModal = document.querySelector("#gallery-modal")
    const works = await getWorks()
    galleryModal.innerHTML = ""
    gallery.innerHTML = ""
    genererGallery(works, "gallery")
    genererGallery(works, "modal")


}




//-------------------PREVISUALISATION-------------------------------
//ecouteur evenements previsualisation image on écoute l'évènement :
const entryInputFile = document.querySelector("#inputFile")

entryInputFile.addEventListener("change", previsualisation)


function previsualisation() {
    const entryInputFile = document.querySelector("#inputFile")
    entryInputFile.innerHTML = ""//Afin d'éviter que si l'utilisateur reclique pour charger une nouvelle photo, on réinitialise tout cequ'il y a dans l'inputFile
    //Affiche l'image dans la modal-loading :
    buttonDownloadFile.removeEventListener("click", previsualisation)
    buttonDownloadFile.removeAttribute("z-index")
    const img = document.getElementById("inputFile").files[0]
    const urlImg = URL.createObjectURL(img)
    const previsualisationImg = document.querySelector("#previsualisation-img")
    previsualisationImg.removeAttribute("src")
    previsualisationImg.setAttribute("src", urlImg)
    //testTailleFile(entryInputFile) Pas besoin pour les demandes du projet

}
//******************TEST TAILLE FICHIER CHARGE INPUT**************** */
function testTailleFile(entryInputFile) {
    const img = document.getElementById("inputFile").files[0].size
    if (img >= 4000000) {
        alert("taille du fichier supérieure à 4Mo !!!")

    }

}

//event listner si "click", on appelle la fonction post() :
const AjouterProjet = document.getElementById("button-valider-modal-loading")
AjouterProjet.addEventListener("click", post)
//----------------AJOUT PROJET------------------------------
//récupérer l'image par l'input file:
async function post() {
    const img = document.getElementById("inputFile").files[0]
    //Création d'un URL pour pouvoir le mettre dans le src, afin de le prévisualiser
    //console.log(urlImg)//Affiche bien une url créée par la fonction createOjectURL(), que je ne connaissais pas


    //Création des données à envoyer à l'api sous forme de formdata :
    const title = document.getElementById("title-loading")
    const category = document.getElementById("select-category-loading")

    const formData = new FormData()//pour créer une formdata, qui est obligatoire, lorsqu'on envoie un fichier (image,zip, fichier...)car ce ne sont pas des données directes comme du texte ou des numéros.

    formData.append("image", img)
    formData.append("title", title.value)
    formData.append("category", category.value)
    let myToken = localStorage.getItem("token");
    let response = await fetch(
        `http://localhost:5678/api/works`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${myToken}`,
                accept: "application/json",


            },
            body: formData

        })

    //alert(response.status)
    if (response.status === 201) {
        const works = await getWorks()
        alert("Projet enregistré avec succès!!")
        genererGallery(works, "modal")
        genererGallery(works, "gallery")//On régénère les galleries
        //fonction qui reset les inputs de téléchargemnt projet qui sera appelée lorsqu'on ferme la page de  :

        title.value = ""
        category.value = ""
        //Effacer image qui est en prévisualisation :
        const previsualisationImg = document.querySelector("#previsualisation-img")

        previsualisationImg.removeAttribute("src")//On supprime l'attribut src de la prévisualisation donc plus aucune image ni icone
        previsualisationImg.setAttribute("src", "./assets/icons/loadingFile.svg")//on créer un nouvel attribut src et on lui donne la valeur de l'icone donc, l'icone input s'affiche

    } if (response.status === 400) {
        alert("Tous les champs ne sont pas remplis")
    }
    // if(////){//code réponse de l'api
    //s''il y a un autre problème}  



}

//pour le premier chargement, on appelle la fonction générer pour afficher la galerie au chargement de la page :


(async function main() {
    const works = await getWorks();
    genererBoutonsFiltres();
    genererGallery(works, "gallery")



})()

