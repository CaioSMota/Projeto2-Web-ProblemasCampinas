function enviarContato(){
	if(nome.value == "" || fone.value == "" || email.value == "" || comentario.value == ""){
		alert("Para entrar em contato é necessário preencher todos os campos!");
	}else{
		alert("Contato Realizado! Obrigado!");
	}
}