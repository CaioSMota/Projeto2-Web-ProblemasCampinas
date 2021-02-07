function createUser(event) {
    event.preventDefault();
    email = document.getElementById("cadastraEmail").value;
    senha = document.getElementById("cadastraSenha").value;
    senhaConfirm = document.getElementById("cadastraConfirmarSenha").value;
    if(email == "" || senha==""){
        alert("Você deve preencher todos os campos para o registro!");
    }else{
    if (senha == senhaConfirm) {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(function () {
            	alert("Usuario criado!");
                window.location.assign("login.html");
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage);
            });
    } else {
        alert("As senhas nao coincidem!");
    }
    }
}