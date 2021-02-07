function listaProblemas (event) {
    var linhas = 0;
    let tabela = document.getElementsByTagName('table')[0];

db.collection("problemas").get().then((querySnapshot) => {
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
                document.getElementById("detalhes").value= doc.data().Detalhes;
                document.getElementById("status").value= doc.data().Status;
                document.getElementById("resposta").value= doc.data().Resposta;
      
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
    var resp= document.getElementById("resposta").value;
    var sta= document.getElementById("status").value;


    if(resp === ""){
        alert("Preencha o campo de resposta!");
    }else{
    db.collection("problemas").doc(id).update({
        "Resposta": resp,
        "Status": sta

    }).then(function(){
        alert("Problema Editado!");
        window.location.reload(true);
    }).catch(function(error){
        alert("Falha na Edição!");
    });  
}
}