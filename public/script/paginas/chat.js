
// abre o chat
document.getElementById('chat').onclick = () => {
    const menu = document.getElementById('chat-menu');
    if (menu.style.display == "none" || menu.style.display == ''){
        menu.style.display = "block"
    } else {
        menu.style.display = 'none'
    }    
}

// pega o textarea e adiciona um evento que vigia as teclas pressionadas
const texto = document.getElementById('texto')
texto.addEventListener('keydown', sendMessage)

// função que adiciona o texto na tela e limpa a caixa de texto
function addTextChat(){    
    document.getElementById('conversa').innerHTML += 
    "<div class='remetente'>" +
        "<span >" + texto.value +"</span>" +
    "</div>";
    texto.value = '';
}

// checa se o botão de enviar mensagem foi pressionado
document.getElementById('enviar-mensagem').onclick = () => {
    if (texto.value != ''){
        addTextChat();
    }
}

// checa se a tecla pressionada no textarea é a tecla enter
function sendMessage(e){    
    if (e.which == 13){
        if (texto.value != ''){        
            addTextChat();            
        }
        // impede que o usuario desça de linha
        e.preventDefault();            
    }
}

