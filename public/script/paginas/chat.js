const arrows = document.getElementsByClassName('down-arrow');
const chats = document.getElementsByClassName('chats');
const directChats = document.getElementsByClassName('message-chat');
const nomeConversa = document.getElementById('nome-conversa');
const chatsContainer = document.getElementById('chats-container');
const conversaContainer = document.getElementById('conversa-container');
const conversa = document.getElementById('conversa');
const flechaVoltar = document.getElementById('flecha-voltar');

// DEIXA OS CHATS DE CADA CATEGORIA ABERTO
for (let x = 0; x < 2; x++) {
    arrows[x].addEventListener('click', () => {
        chats[x].classList.toggle('visible')
        chats[x].classList.toggle('invisible')
    })
}

// ALTERA ENTRE AS CATEGORIAS E O CHAT PRIVADO
for (const d of directChats) {
    d.addEventListener('click', () => {
        nomeConversa.innerText = d.innerText
        chatsContainer.classList.toggle('visible');
        chatsContainer.classList.toggle('invisible');
        conversaContainer.classList.toggle('visible');
        conversaContainer.classList.toggle('invisible');
    })
}

flechaVoltar.addEventListener('click', () => {
    chatsContainer.classList.toggle('visible');
    chatsContainer.classList.toggle('invisible');
    conversaContainer.classList.toggle('visible');
    conversaContainer.classList.toggle('invisible');
})

// ABRE O ASIDE DO CHAT
document.getElementById('chat').onclick = () => {
    const menu = document.getElementById('chat-menu');
    if (menu.style.display == "none" || menu.style.display == ''){
        menu.style['display'] = "flex"
    } else {
        menu.style['display'] = 'none'
    }    
}

// pega o textarea e adiciona um evento que vigia as teclas pressionadas
const texto = document.getElementById('texto')
texto.addEventListener('keydown', sendMessage)

// função que adiciona o texto na tela e limpa a caixa de texto
function addTextChat(){
    const msg = document.createElement('div');
    msg.classList.add('remetente');

    const spanText = document.createElement('span');
    spanText.innerText = texto.value;

    msg.appendChild(spanText);
    conversa.appendChild(msg);

    conversa.scrollTop = conversa.scrollHeight;

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

setInterval(async () => {
    const data = await fetch('/getChat/1', {
        method: 'GET',
    }).then(response => response.json()).then(response => console.log(JSON.stringify(response)))
    
}, 1000)