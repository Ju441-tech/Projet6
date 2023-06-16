
//Demande à l'API de fournir la liste des travaux (requête GET envoyée à l'API):
const reponse= await fetch (`http://localhost:5678/api/works`);
//Conversion de la réponse de l'API, en format JSON, grâce à la fonction.json() afin de pouvoir utiliser la liste reçue des travaux :
    const works=await reponse.json();



//Ici, on créer le JS pour l'affichage dynamique de la gallery dans la page web au lieu de l'écrire dans le Html
//Création de la fonction qui créée une gallerie avec autant de fiches que dans la liste reçue, fiche, qui contient l'image et le titre d'un projet:
const gallery=document.querySelector(".gallery");
function genererGallerieAcceuil(works){
    //Boucle qui fait apparaitre les elements (image et titres) de chaque article dans la galerie  :
    for (let i=0; i<=works.length-1;i++){
    //A chaque tour de boucle, il se créer une balise article contenant une image et son titre de projet:
    const ficheTravaux =document.createElement("article"); 
    const image=document.createElement("img");
    const title=document.createElement("p");
    //x.appendchild(x);
    
    gallery.appendChild(ficheTravaux);
    ficheTravaux.appendChild(image);
    ficheTravaux.appendChild(title);
    
    title.innerText=works[i].title;
    image.src=works[i].imageUrl;
}
}
//pour le premier chargement, on appelle la fonction générer pour afficher la galerie au chargement de la page :
genererGallerieAcceuil(works);
  

    

//BOUTON FILTRE : TOUS QUI AFFICHE TOUS LES TRAVAUX DYNAMIQUEMENT :

const boutonTravaux=document.querySelector("#tous");
//EventListner:
boutonTravaux.addEventListener("click", async function(){
    //Ici, le bloc de code est sauf l'effacement de la galerie, puis la génération de la liste des travaux (de TOUS les travaux)
    //Cette liste s'appelle : works
    document.querySelector(".gallery").innerHTML="";
    genererGallerieAcceuil(works); 
})



//Bouton filtre OBJETS/
const boutonObjets=document.querySelector("#objets");
boutonObjets.addEventListener("click", async function(){
   
//On filtre la liste works pour créer la liste worksObjets qui contient uniquement les travaux qui sont des objets :
const worksObjets = works.filter(function (works) {
//!!!!!works.category.id pour avoir le type de travaux 1-objets 2-Appartements 3-Hotels&Restaurants :
   return works.category.id ===1;
  
   });
   //
console.log(worksObjets);
document.querySelector(".gallery").innerHTML = "";
genererGallerieAcceuil(worksObjets);
    });  






//EventListner bouton APPARTMENTS :  
const boutonAppartements=document.querySelector("#appartements");
boutonAppartements.addEventListener("click", async function(){
//On filtre la liste works pour créer la liste worksAppartements qui contient uniquement les travaux qui sont des appartemnts :
    const worksAppartements = works.filter(function (works) {
 //!!!!!works.category.id pour avoir le type de travaux 1-objets 2-Appartements 3-Hotels&Restaurants :
        return works.category.id ===2;
});
//Effacement de la galerie, puis, generation des fiches qui sont des travaux d'appartements via la fonction générer:
    console.log(worksAppartements);
    document.querySelector(".gallery").innerHTML = "";
    genererGallerieAcceuil(worksAppartements);
    })  





//Event listner bouton HOTELS ET RESTAURANTS:
const boutonHotelsEtRestaurants=document.querySelector("#hotelsEtRestaurants");
boutonHotelsEtRestaurants.addEventListener("click", async function(){
 //On filtre la liste works pour créer la liste worksHotelsEtRestaurants qui contient uniquement les travaux qui sont des Hotels ou des Restaurants :
       const worksHotelEtRestaurants = works.filter(function (works) {
        //!!!!!works.category.id pour avoir le type de travaux 1-objets 2-Appartements 3-Hotels&Restaurants :
       return works.category.id ===3;
       });
      //Effacement de la galerie, puis, generation des fiches qui sont des travaux d'appartements via la fonction générer: 
       console.log(worksHotelEtRestaurants);
       document.querySelector(".gallery").innerHTML = "";
       genererGallerieAcceuil(worksHotelEtRestaurants);
        });
  
