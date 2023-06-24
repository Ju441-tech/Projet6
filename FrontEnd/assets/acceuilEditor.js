//Si token est dans le local storage :
//dans le css de la page d'acceuil mettre la class editor en dipslay: yes (ou quelque chose comme ça).


//essai: tentetive de savoir si un token est bien présent et conole.log pour vérif:

if (localStorage.getItem("token")){
    console.log("storage on");
    const classEditor= document.querySelector(".editor");
classEditor.style.display="flex";
}else{
    console.log("there is no token");
}
//ok

const token=localStorage.getItem("token");
console.log(token);
//////
//créer une fonction qui dit à la class .editor de passer son attribut display:on :
const classEditor= document.querySelector(".editor");
classEditor.style.display="flex";
//yes, ça fonctionne. (reste à revoir l'intégration e la page acceuil en mode "Editor")!!!!!(à mettre dans si token ci dessus, sinon dans le else, ne rien mettre)