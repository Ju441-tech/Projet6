localStorage.clear();
document.querySelector('form').addEventListener('submit', function (event) {//event veut dire si l'evenement "le formulaire sélectionné est envoyé"
    //console.log(e);affiche quel élément a submit : si le bouton envoyer es clické (=que le formulaire est submit) :
    event.preventDefault(); //bloque la page pour éviter qu'elle en ouvre une autre
    const form = event.currentTarget;//On donne à la constante form la cible car c'est bien le formulaire qui est envoyé aeventlistner = si le formulaire est envoyé(c'est ça l'event)
    let baliseEmail=document.getElementById("email");//On sélectionne l'élément #email
    let email= baliseEmail.value;//on récupère l'email
    let balisePassword= document.getElementById("password");//on sélectionne l'élément #password
    let password=balisePassword.value;//on récupère le passwor ui est à l'intérieur
    Login(email, password);

});




//Verification email et password en envoyant une requete (post) à l'api, si le mail et le password donne le status 200 : autorisé

async function Login(email, password) {
    //email et passwor récupérés auparavant par l'event listner :
    const userData = {
        "email": email,
        "password": password
    };
    //method, headers et body de la requete à envoyer :
    const requeteAPI = {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userData) //stringify() met tout ce qu'il y a dans l'objet entre parenthèses
    };
    ////Envoi de la requête à l'adresse de l'api puis, après la virgule les onnées de la requête tout ceci dans la constante réponse qui elle même recevra la réponse de l'api
    const reponse = await fetch("http://localhost:5678/api/users/login", requeteAPI);
    const resultat = await reponse.json();//On transforme la réponse en format json()
    const token=resultat.token;
    console.log(resultat);
    console.log(reponse.status)//.status donne le code (par exemple 200 que renvoit l'api en réponse à la requête)
    console.log(token);
    localStorage.clear();
    ///////////////Conditions de traitement de la réponse de l'api :
   if (reponse.status===200){
    window.open("index.html");
    localStorage.setItem("token",token);
   }
   if(reponse.status===401){
    console.log("Non autorisé");
   }
   else{
    console.log("identifiants non reconnus");
   } 
    
}




