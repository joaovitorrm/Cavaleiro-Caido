document.getElementById('chat').onclick = () => {
    const menu = document.getElementById('chat-menu');
    if (menu.style.display == "none" || menu.style.display == ''){
        menu.style.display = "block"
    } else {
        menu.style.display = 'none'
    }    
}

const texto = document.getElementById('texto')
texto.addEventListener('keydown', sendMessage)

function addTextChat(){    
    document.getElementById('conversa').innerHTML += 
    "<div class='remetente'>" +
        "<span >" + texto.value +"</span>" +
    "</div>";
    texto.value = '';
}

document.getElementById('enviar-mensagem').onclick = () => {
    if (texto.value != ''){
        addTextChat();
    }
}

function sendMessage(e){    
    if (e.which == 13){
        if (texto.value != ''){        
            addTextChat();            
        }
        e.preventDefault();            
    }
}

