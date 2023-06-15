import { boutonFiltreObjet } from "./travaux.js";


//Ici, on créer le JS pour l'affichage dynamique de la gallery dans la page web au lieu de l'écrire dans le Html
const gallery=document.querySelector(".gallery");
for(let i=0;i<10;i++){
const articleElement=document.createElement("article");


gallery.appendChild(articleElement);
articleElement.innerText="Projet"+(i+1);
};
//Ajout eventListners aux boutons filtres
//Bouton tous OUAI!!!!MAIS SI JE N'AI PAS DE LISTE DES PROJETS, JE NE PEUX PAS FAIRE CA !!!! :
const boutonTous=document.querySelector("#tous");
boutonTous.addEventListener("click",function(){
    //gallery.innerHTML=""; //Efface toute la partie gallery
})

//Ajout de la fonction de l'event bouton objet importé de travaux.js :
boutonFiltreObjet();
