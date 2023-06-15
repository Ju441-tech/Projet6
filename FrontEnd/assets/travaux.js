export function boutonFiltreObjet(){
    const boutonTravaux=document.querySelector("#objets");
    boutonTravaux.addEventListener("click", async function(event){
        
        fetch (`http://localhost:5678/api/categories`);
    })
}