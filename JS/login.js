
function authUser(event) {
    event.preventDefault;
    email = document.getElementById("emailAuth").value;
    senha = document.getElementById("senhaAuth").value;

    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(function () {
        alert("Usuario Logado");
        console.log("Usuario Logado");
        let user = firebase.auth().currentUser;
        console.log(user.uid);
        idUser = user.uid;
        localStorage.setItem('idUser',idUser);

        if (email.match(/@gov.com*/)) {
            window.location.assign("perfilPoderPublico.html");
        }
        else {
            window.location.assign("perfil.html");
        }
        

    }).catch(function (error) {
        alert("Usuario nao autenticado!");
        console.log("Usuario nao autenticado!");
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

    });
}

/*function deleteUser(event) {
    event.preventDefault;
    let user = firebase.auth().currentUser;
    if (user != null) {
        if (confirm("Tem certeza que deseja deletar a conta?")) {
            user.delete()
            .then(function () {
                console.log("Usuario deletado!");
                document.getElementById("messageDelete").innerText = "Usuario deletado!";
            });
        }
    }else{
        document.getElementById("messageDelete").innerText = "Nenhum usuario logado!";
    }
}
*/

function resetSenhaUser(event){
    event.preventDefault;
    if(emailAuth.value === ""){
        alert("Você deve colocar o email da conta para recuperar a senha!");
    }else{
        let email = document.getElementById("emailAuth").value;
        firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            alert("Email de recuperação enviado.");
            console.log("Email de recuperação enviado.");
        })
        .catch(function(error){
            alert("Não foi possivel resetar a senha.");
            console.log("Não foi possivel resetar a senha.");
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }
}

function listaTodosProblemas (event) {
    var linhas = 0;
    idUser = localStorage.getItem('idUser');
    let tabela = document.getElementsByTagName('table')[0];   

    db.collection("problemas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>  {
            console.log(doc.id, " => ", doc.data());
            let linha = tabela.insertRow(-1);
            let col0 = linha.insertCell(0);
            let col1 = linha.insertCell(1);
            let col2 = linha.insertCell(2);
            let col3 = linha.insertCell(3);
            let col4 = linha.insertCell(4);

            var foto = document.createElement("img");
            foto.src = doc.data().URL;
            foto.style.width = "250px";
            foto.style.height = "150px";

            col0.appendChild(document.createTextNode(doc.data().Local));
            col1.appendChild(document.createTextNode(doc.data().Descricao));
            col2.appendChild(document.createTextNode(doc.data().Resposta));
            col3.appendChild(document.createTextNode(doc.data().Status));
            col4.appendChild(foto);

        });
    });
}   