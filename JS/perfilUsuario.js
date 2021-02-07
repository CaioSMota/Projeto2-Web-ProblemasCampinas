var files = [];

function escolherImg() {

    var reader;
    var input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("imgPreview").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click;
}

const uploadImagem = (event) =>{
    event.preventDefault();
    var imgName = document.getElementById("imgName").value;
    var desc= document.getElementById("descricao").value;
    var loc = document.getElementById("local").value;
    var stat="Cadastrado";
    var resp="";
    var path = "images/" + imgName + ".png";
    var uploadTask = firebase.storage().ref(path).put(files[0]);
    var imgUrl;
    var storage = firebase.storage();

    if(desc === "" || loc ==="" || imgName === ""){
        alert("Preencha todos os campos para cadastrar um novo Problema!");
    }else{
    if(desc.length > 500){
        let msg = "Descrição grande demais (max 500 caracter)!";
        document.getElementById("mensagemD").innerText = msg;
    }else{
        document.getElementById("mensagemD").innerText = " ";
        if(loc.length > 100){
            let msg = "Local grande demais (max 100 caracter)!";
            document.getElementById("mensagemL").innerText = msg;
        }else{

            document.getElementById("mensagemL").innerText = " ";

            uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },

            function (error) {
                alert("error");
            },

            function () {

                uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                    imgUrl = url;

                    db.collection("problemas").add({
                        Name: imgName,
                        URL: imgUrl,
                        Descricao:desc,
                        Local:loc,
                        Status:stat,
                        Autor: localStorage.getItem('idUser'),
                        Resposta:resp
                    }).then(function(docRef){
                        alert("Problema cadastrado com sucesso!!");
                        window.location.reload(true);
                    }).catch(function (error){
                        alert("Falha no cadastro do problema!");
                    })
                });
            });
        }
    }
  }
}

function listaProblemasUser (event) {
    var linhas = 0;
    idUser = localStorage.getItem('idUser');
    let tabela = document.getElementsByTagName('table')[0];
    

    db.collection("problemas").where("Autor", "==", idUser)
    .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) =>  {
            let linha = tabela.insertRow(-1);
            let col0 = linha.insertCell(0);
            let col1 = linha.insertCell(1);
            let col2 = linha.insertCell(2);
            let col3 = linha.insertCell(3);
            let col4 = linha.insertCell(4);
            let col5 = linha.insertCell(5);
            let col6 = linha.insertCell(6);
            let col7 = linha.insertCell(7);
            var botao_editar = document.createElement("input");
            botao_editar.setAttribute('type','submit');
            botao_editar.setAttribute('value','Editar');
            botao_editar.setAttribute('id','btnEditar');
            botao_editar.addEventListener('click',function editar(){
                window.location.assign("#EditarDados");
                document.getElementById("id").value= doc.id;
                document.getElementById("descricao").value= doc.data().Descricao;
                document.getElementById("local").value= doc.data().Local;
                document.getElementById("detalhes").value= doc.data().Detalhes;
      
            });

            var botao_deletar = document.createElement("input");
            botao_deletar.setAttribute('type','submit');
            botao_deletar.setAttribute('value','X');
            botao_deletar.setAttribute('class','btnDeletar');
            botao_deletar.setAttribute('id',doc.id);
            botao_deletar.addEventListener('click',function removerProblema(){
                
                var confirm = prompt("Digite SIM se realmente quer Deletar esse Problema!");
                if(confirm === "SIM" || confirm === "sim"){
                    db.collection("problemas").doc(doc.id).delete().then(function() {
                        alert("Problema Deletado!");
                        window.location.reload(true);
                    }).catch(function(error) {
                        console.error("Error ao remover problema: ", error);
                    });

            }
            else{
                return;
            }
            });

            var foto = document.createElement("img");
            foto.src = doc.data().URL;
            foto.style.width = "250px";
            foto.style.height = "150px";

            col0.appendChild(document.createTextNode(doc.id));
            col1.appendChild(document.createTextNode(doc.data().Local));
            col2.appendChild(document.createTextNode(doc.data().Descricao));
            col3.appendChild(foto);
            col4.appendChild(document.createTextNode(doc.data().Status));
            col5.appendChild(document.createTextNode(doc.data().Resposta));
            col6.appendChild(botao_editar);
            col7.appendChild(botao_deletar);
        });
    });
}   

function updateProblema(event){
    event.preventDefault();
    var id = document.getElementById("id").value;
    var desc= document.getElementById("descricao").value;
    var deta= document.getElementById("detalhes").value;
    var loc = document.getElementById("local").value;

    if(desc === "" || loc ==="" || deta ===""){
        alert("Preencha todos os campos para cadastrar um novo Problema!");
    }else{
    if(desc.length > 500){
        let msg = "Descrição grande demais (max 500 caracter)!";
        document.getElementById("mensagemD").innerText = msg;
    }else{
        document.getElementById("mensagemD").innerText = " ";
        if(loc.length > 100){
            let msg = "Local grande demais (max 100 caracter)!";
            document.getElementById("mensagemL").innerText = msg;
        }else{

    db.collection("problemas").doc(id).update({
        "Descricao": desc,
        "Local": loc,
        Detalhes: deta
    }).then(function(){
        alert("Problema Editado!");
        window.location.reload(true);
    }).catch(function(error){
        alert("Falha na Edição!");
    }); 
    } 
}
}
}