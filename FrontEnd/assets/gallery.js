
//Demande à l'API de fournir la liste des travaux (requête GET envoyée à l'API):
async function getWorks() {
    const reponse = await fetch(`http://localhost:5678/api/works`);
    //Conversion de la réponse de l'API, en format JSON, grâce à la fonction.json() afin de pouvoir utiliser la liste reçue des travaux :
    const works = await reponse.json();
    return works;
}
async function getCategory(){
    const reponse = await fetch(`http://localhost:5678/api/categories`);
    //Conversion de la réponse de l'API, en format JSON, grâce à la fonction.json() afin de pouvoir utiliser la liste reçue des travaux :
    
    const categories = await reponse.json();
    categories.unshift({"id":0, "name":"Tous"});//On ajoute au déburt de la liste la categorie 0, appelé "Tous"
    
    return categories;
}




//Generer les boutons filtre dynamiquement :
async function genererBoutonsFiltres(){
    const gallery=document.querySelector(".filtres");
    const categories=await getCategory();
    for(let categorie of categories){
        const boutonFiltre=document.createElement("article");

        gallery.appendChild(boutonFiltre);
        boutonFiltre.setAttribute("data-id",categorie.id);//met un identifiant différent sur chaque bouton pour différencier chaque bouton
        boutonFiltre.innerText=categorie.name;
        //bouton.setAttribute("id","button"+categorie.id);//on donne une id=0, id=1...pour pouvoir retrouver individeuellement les buttons

        
    }
    
}
genererBoutonsFiltres();
//Ici, on créer le JS pour l'affichage dynamique de la gallery dans la page web au lieu de l'écrire dans le Html
//Création de la fonction qui créée une gallerie avec autant de fiches que dans la liste reçue, fiche, qui contient l'image et le titre d'un projet:

async function genererGallerieAcceuil(listeTravaux) {
    const gallery = document.querySelector(".gallery");
    //Boucle qui fait apparaitre les elements (image et titres) de chaque article dans la galerie  :
    for (let work of await listeTravaux) {
        //A chaque tour de boucle, il se créer une balise article contenant une image et son titre de projet:
        const ficheTravaux = document.createElement("article");
        const image = document.createElement("img");
        const title = document.createElement("p");
        //x.appendchild(x);

        gallery.appendChild(ficheTravaux);
        ficheTravaux.appendChild(image);
        ficheTravaux.appendChild(title);

        title.innerText = work.title;
        image.src = work.imageUrl;
    }
}
//pour le premier chargement, on appelle la fonction générer pour afficher la galerie au chargement de la page :
genererGallerieAcceuil(getWorks());
  
//Fonction pour trier liste travaux et créer une listeen fonction de la category.id:

   



 //Savoir quel bouton a été cliqué :
 
 addEventListener("click", async  function(event){
    
    const boutonClick = await  event.target.dataset.id;
    const newNumber=  parseInt(boutonClick);
    console.log(newNumber);//Affichage du bouton qui a été cliqué

    const liste= await getWorks();
    console.log(liste);
    const newList = liste.filter( function (liste) {
       //!!!!!works.category.id pour avoir le type de travaux 1-objets 2-Appartements 3-Hotels&Restaurants :
       return liste.category.id === newNumber;
    });
    console.log(newList);
    this.document.querySelector(".gallery").innerHTML="";
   genererGallerieAcceuil(newList);
 });


