const arrows = document.getElementsByClassName('down-arrow');
const chats = document.getElementsByClassName('chats');
const directChats = document.getElementsByClassName('amigo-chat');
const globalChats = document.getElementsByClassName('global-chat');
const nomeConversa = document.getElementById('nome-conversa');
const chatsContainer = document.getElementById('chats-container');
const conversaContainer = document.getElementById('conversa-container');
const conversa = document.getElementById('conversa');
const flechaVoltar = document.getElementById('flecha-voltar');

// pega o textarea e adiciona um evento que vigia as teclas pressionadas
const texto = document.getElementById('texto')
texto.addEventListener('keydown', sendMessage)

let remetenteIdPlacehold = 1;
let destinatarioIdPlacehold = 2;
let globalIdPlacehold = 0;

let getChatIntervalId;

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
        globalIdPlacehold = 0
        destinatarioIdPlacehold = 2
        nomeConversa.innerText = d.innerText
        chatsContainer.classList.toggle('visible');
        chatsContainer.classList.toggle('invisible');
        conversaContainer.classList.toggle('visible');
        conversaContainer.classList.toggle('invisible');        
        firstOpenChat(globalIdPlacehold, remetenteIdPlacehold, destinatarioIdPlacehold);
        startChatInterval(globalIdPlacehold, remetenteIdPlacehold, destinatarioIdPlacehold)
    })
}

// ALTERA ENTRE AS CATEGORIAS E O CHAT GLOBAL
for (const g of globalChats) {
    g.addEventListener('click', () => {
        globalIdPlacehold = 1
        destinatarioIdPlacehold = 0
        nomeConversa.innerText = g.innerText
        chatsContainer.classList.toggle('visible');
        chatsContainer.classList.toggle('invisible');
        conversaContainer.classList.toggle('visible');
        conversaContainer.classList.toggle('invisible');        
        firstOpenChat(globalIdPlacehold, remetenteIdPlacehold, destinatarioIdPlacehold);
        startChatInterval(globalIdPlacehold, remetenteIdPlacehold, destinatarioIdPlacehold)
    })
}

// VOLTAR PARA TELA INICIAL DOS CHATS
flechaVoltar.addEventListener('click', () => {
    chatsContainer.classList.toggle('visible');
    chatsContainer.classList.toggle('invisible');
    conversaContainer.classList.toggle('visible');
    conversaContainer.classList.toggle('invisible');
    conversaContainer.querySelector('#conversa').innerHTML = '';
    stopChatInterval();
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

// função que adiciona o texto na tela e limpa a caixa de texto
function addTextChat(text){
    const msg = document.createElement('div');
    msg.classList.add('remetente');

    const spanText = document.createElement('span');
    spanText.innerText = text;

    msg.appendChild(spanText);
    conversa.appendChild(msg);

    conversa.scrollTop = conversa.scrollHeight;

    texto.value = '';
}

// FUNÇÃO PARA ENVIAR AS MENSAGENS
function enviarMensagem(msg) {
    let tempo = new Date();

    const data = {
        global: globalIdPlacehold,
        remetId: remetenteIdPlacehold,
        destId: destinatarioIdPlacehold,
        msg: msg,
        tempo: `${tempo.getUTCFullYear()}-${tempo.getUTCMonth()}-${tempo.getUTCDay()} ${tempo.getUTCHours()}:${tempo.getUTCMinutes()}:${tempo.getUTCSeconds()}`,
    }

    fetch('/enviarMensagem', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        },
    })
}

// checa se o botão de enviar mensagem foi pressionado
document.getElementById('enviar-mensagem').onclick = () => {
    if (texto.value != ''){
        enviarMensagem(texto.value);
        addTextChat(texto.value);
    }
}

// checa se a tecla pressionada no textarea é a tecla enter
function sendMessage(e){    
    if (e.which == 13){
        if (texto.value != ''){   
            enviarMensagem(texto.value);
            addTextChat(texto.value);
        }
        // impede que o usuario desça de linha
        e.preventDefault();            
    }
}

// CARREGA TODAS AS MENSAGENS INICIALMENTE
function firstOpenChat(global, remetId, destId) {
    getChat(global, remetId, destId, (result) => {        
        const messages = JSON.parse(result);
        for (const m of messages){
            addTextChat(m.mensagem);
        }
    })
}

// INICIA O LOOP QUE VERIFICA AS NOVAS MENSAGENS
function startChatInterval(global=0, remetId, destId) {
    getChatIntervalId = setInterval(() => {getChat(global, remetId, destId, (result) => {
        JSON.parse(result).forEach((m, i) => {
            if ((i + 1) > conversaContainer.querySelector('#conversa').children.length) {
                addTextChat(m.mensagem)
            }
        });
    })}, 1000);    
}

// CANCELA O LOOP QUE BUSCA AS MENSAGENS NO BANCO DE DADOS
function stopChatInterval() {
    clearInterval(getChatIntervalId)
}

// FUNÇÃO PARA PEGAR AS MENSAGENS DO BANCO DE DADOS
function getChat(global, remetId, destId, callback) {
    const data = {
        global,
        destId,
        remetId,
    }
    const chats = fetch('/getChat', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(response => {
        return callback(JSON.stringify(response))
    })
    
    
}