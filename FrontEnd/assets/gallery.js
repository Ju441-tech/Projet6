


//Demande à l'API de fournir la liste des travaux (requête GET envoyée à l'API):
async function getWorks() {
    const reponse = await fetch(`http://localhost:5678/api/works`);
    //Conversion de la réponse de l'API, en format JSON, grâce à la fonction.json() afin de pouvoir utiliser la liste reçue des travaux :
    const works = await reponse.json();
    return works;
}
async function getCategory() {
    const reponse = await fetch(`http://localhost:5678/api/categories`);
    //Conversion de la réponse de l'API, en format JSON, grâce à la fonction.json() afin de pouvoir utiliser la liste reçue des travaux :    
    const categories = await reponse.json();
    categories.unshift({ "id": "0", "name": "Tous" });//On ajoute au déburt de la liste la categorie 0, appelé "Tous"   
    return categories;
}

//Generer les boutons filtre dynamiquement :
async function genererBoutonsFiltres() {
    const gallery = document.querySelector(".filtres");
    const categories = await getCategory();
    //console.log(liste.length);
    const works= await getWorks();

    for (let categorie of categories) {
        const boutonFiltre = document.createElement("button");

        gallery.appendChild(boutonFiltre);
        //Achaque fois qu'on créer un bouton, on lui attitre grâce à event.currentTarget.innerText la fonction de tri de liste lorsqu'on clique dessus
        boutonFiltre.addEventListener("click", function (event) {//eventListner losrqu'on clique sur ce bouton on appelle la fonction anonyme avec son paramètre (event)
            //console.log(event.currentTarget.innerHTML);//event.currentTarge.innerHtml renvoi le texte qui est à l'intérieur du bouton qui vient d'être cliqué
            //console.log(liste[0].category.name);//liste[0].category.name contient le texte ui est appliqué lui aussi dans chaque bouton à sa création
            let filterWorks=[];
            if (event.currentTarget.innerText === "Tous") {
                filterWorks=works;
            } else {

                filterWorks = works.filter(function (list) {//On va filtrer la liste d'origine des travaux. si le texte qui est à l'int"rieur des balises de l'élément cliqué=le texte d'un élément de la liste des travaux, on le met dans une nouvelle liste qui s'appelle newList, par exemple : si on clique sur le bouton Objet newList aura un nouvel élément , celui qui aura un category.name = à Objet
                    return list.category.name === event.currentTarget.innerText;//SI le nom de la catégorie de l'élément du tableau des travaux originaux ===le text du bouton, on ajoute l'élément à la newList
                })
                console.log(filterWorks);
               
            }
            document.querySelector(".gallery").innerHTML = "";//On efface la galerie
            genererGallerieAcceuil(filterWorks);//on génère l'affichage des éléments, cette fois ci, contenus dans newList
        })



        boutonFiltre.innerText = categorie.name;
    }
}


//Ici, on créer le JS pour l'affichage dynamique de la gallery dans la page web au lieu de l'écrire dans le Html
//Création de la fonction qui créée une gallerie avec autant de fiches que dans la liste reçue, fiche, qui contient l'image et le titre d'un projet:

function genererGallerieAcceuil(listeTravaux) {
    const gallery = document.querySelector(".gallery");
    //Boucle qui fait apparaitre les elements (image et titres) de chaque article dans la galerie  :
    for (let work of listeTravaux) {
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


(async function main(){
    const works=await getWorks();
    genererBoutonsFiltres();
    genererGallerieAcceuil(works);
})()