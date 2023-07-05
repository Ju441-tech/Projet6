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
/**deconnection de la session */
function disconnect(){
    localStorage.clear()
    window.open("index.html")
}
const logout=document.querySelector(".logout")
logout.addEventListener("click",disconnect)
/********************* */


const openModalWrapp=function (){ 
    
    modalWrapp.removeAttribute("class","hidde")
    modalWrapp.setAttribute("class","modal-wrapp")
    ouvreModalWrapp.removeEventListener("click",openModalWrapp)
    modalWrapp.addEventListener("click",closeModalWrapp)

    const buttonAjouterPhoto=document.querySelector("#buttonAjouterPhoto")
    buttonAjouterPhoto.addEventListener("click",openModalLoading)
}

const closeModalWrapp=function (event){  
    const buttonCloseModalWrapp=document.querySelector("#close-modal")
    const parent=event.target.closest(".modal-wrapp-content")
    if (!parent||event.target===buttonCloseModalWrapp){
        modalWrapp.removeAttribute("class","modal-wrapp")
        modalWrapp.setAttribute("class","hidde")
        modalWrapp.removeEventListener("click",closeModalWrapp)
    }
    ouvreModalWrapp.addEventListener("click",openModalWrapp) //A ne pas oublier !! Car lorsque toutes les modales sont fermées, il faut un eventlistener pour écouter si on clique pour ouvrir la première modale 
}

function openModalLoading(){
    modalWrapp.removeAttribute("class","modal-wrapp")
        modalWrapp.setAttribute("class","hidde")
        buttonAjouterPhoto.removeEventListener("click",openModalLoading)
        const modalLoading=document.querySelector("#modal-loading")
        modalLoading.removeAttribute("class","hidde")
        modalLoading.setAttribute("class", "modal-loading")
        modalLoading.addEventListener("click",returnModalWrapp)
        modalLoading.addEventListener("click", closeModalLoading)
}
function returnModalWrapp(event){
    const fleche=document.querySelector("#arrow-left-modal-loading")
    const modalLoading=document.querySelector("#modal-loading")
    if(event.target===fleche){
    modalLoading.removeEventListener("click",returnModalWrapp)
    modalLoading.removeAttribute("class","modal-loading")
    modalLoading.setAttribute("class", "hidde")
    openModalWrapp()
    }
}
function closeModalLoading(event){
    const modalLoading=document.querySelector("#modal-loading")
    const croix=document.querySelector("#close-modal-loading")
    const parent=event.target.closest(".modal-loading-content")
    if(!parent||event.target===croix){
    modalLoading.removeEventListener("click",closeModalLoading)
        modalLoading.removeAttribute("class","modal-loading")
        modalLoading.setAttribute("class", "hidde")
    }
    ouvreModalWrapp.addEventListener("click",openModalWrapp)//!!!!!!!pour pouvoir rouvrir modalWrapp lorsqu'aucune modale n'est ouverte
}




const modalWrapp=document.querySelector("#modal-wrapp")

const ouvreModalWrapp=document.querySelector(".js-modal-wrapp")
ouvreModalWrapp.addEventListener("click",openModalWrapp)






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
        imageBin.setAttribute("data-id", work.id)//Création d'un data-id sur chaque corbeille pour pouvoir identifier précisément quel projet a été cliqué
        imageCroixFleche.setAttribute("class", "croix-fleche");
        imageCroixFleche.src = "./assets/icons/croix-fleche.svg";

        //Si on click sur la corbeille, on obtient son data-id qui correspondra  à l'index de la liste de la fonction getWorks()
        imageBin.addEventListener("click", function (event) {
            console.log(event.target.dataset.id)
            //console.log(listeTravaux)
            const projetASupprimer=JSON.stringify(event.target.dataset.id-1)//On a récupérer toutes les données du projet sélectionné
            console.log(projetASupprimer)
            
        })

    }
}




(async function main() {
    const listeTravaux = await getWorks();
   
   

  
   
  


})();

async function suppressionProjet() {
    
   
    ////Envoi de la requête à l'adresse de l'api puis, après la virgule les données de la requête tout ceci dans la constante réponse qui elle même recevra la réponse de l'api
    const reponse = await fetch("http://localhost:5678/api/works/0",{method:`DELETE`});
    const resultat = await reponse.json();//On transforme la réponse en format json()
}

/////Il faut l'autorisation pour supprimer un projet



