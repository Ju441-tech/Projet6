let user={
    email:'julienhotmail.com',
    password:'hello44'
}

const envoi=await fetch(`http://localhost:5678/api/users/login`,
    {method:"POST",
    header:{
            "content-type":"application/json",
        },
    body:{
    "email":"sophie.bluel@test.tld",
    "password":"S0phie"
    }
    });

let reponse=await envoi.json();
console.log(reponse);

