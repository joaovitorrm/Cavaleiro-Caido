const arrows = document.getElementsByClassName('down-arrow');
const chats = document.getElementsByClassName('chats');
const globalChats = document.getElementsByClassName('global-chat');
const nomeConversa = document.getElementById('nome-conversa');
const chatsContainer = document.getElementById('chats-container');
const conversaContainer = document.getElementById('conversa-container');
const conversa = document.getElementById('conversa');
const flechaVoltar = document.getElementById('flecha-voltar');
const pesquisarContainer = document.querySelector('.pesquisar');
const pesquisarInput = document.querySelector('.pesquisar-input');
const chatContainer = document.querySelector('.chat');
const menuContainer = document.querySelector('#chat-menu');
const amigosSeta = document.querySelector('.amigos').querySelector('.down-arrow');
const amigosContainer = document.querySelector('.amigos-container');

let userId;

// pega o textarea e adiciona um evento que vigia as teclas pressionadas
const texto = document.getElementById('texto')
texto.addEventListener('keydown', sendMessage)

let destinatarioId;
let globalIdPlacehold = 1;

// ABRE O ASIDE DO CHAT
chatContainer.onclick = () => {
    userId = document.querySelector('.input-id').value;
    if (menuContainer.style.display == "none" || menuContainer.style.display == ''){
        menuContainer.style['display'] = "flex"
    } else {
        menuContainer.style['display'] = 'none'
    }
}

// QUANDO APERTA A SETA DOS AMIGOS PUXA DO BANCO DE DADOS
amigosSeta.addEventListener('click', () => {
    fetch('/getFriends', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response => response.json()).then(response => {
        amigosContainer.innerHTML = '';
        for (const u of response) {
            const mainDiv = document.createElement('div');
            
            const img = document.createElement('img');
            img.src = "../images/icones/perfil.png";

            const nome = document.createElement('div');
            nome.classList.add('message-chat', 'amigo-chat');
            nome.id = u.iduser;
            nome.innerText = u.nome;
            nome.addEventListener('click', () => {abrirChat(nome)})

            const editar = document.createElement('div');
            editar.classList.add('editar-amigo');
            editar.innerText = '-';
            editar.id = u.iduser;
            editar.addEventListener('click', () => {excluirAmigo(editar)});

            mainDiv.append(img, nome, editar);            
            amigosContainer.appendChild(mainDiv);
        };
    });
});

let getChatIntervalId;

// DEIXA OS CHATS DE CADA CATEGORIA ABERTO
for (let x = 0; x < 2; x++) {
    arrows[x].addEventListener('click', () => {
        chats[x].classList.toggle('visible');
        chats[x].classList.toggle('invisible');
    });
};

// ALTERA ENTRE AS CATEGORIAS E O CHAT 
function abrirChat(div) {
    globalIdPlacehold = 0;
    destinatarioId = div.id;
    nomeConversa.innerText = div.innerText;
    chatsContainer.classList.toggle('visible');
    chatsContainer.classList.toggle('invisible');
    conversaContainer.classList.toggle('visible');
    conversaContainer.classList.toggle('invisible');        
    firstOpenChat(globalIdPlacehold, userId, destinatarioId);
    startChatInterval(globalIdPlacehold, userId, destinatarioId)
};

function excluirAmigo(div) {
    fetch('/excluirAmigo', {
        method: 'POST',
        body: JSON.stringify({amigoId: div.id}),
        headers: {
            'Content-type': 'application/json'
        },
    });
    amigosContainer.removeChild(div.parentElement);    
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
        firstOpenChat(globalIdPlacehold, userId, destinatarioIdPlacehold);
        startChatInterval(globalIdPlacehold, userId, destinatarioIdPlacehold)
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

// função que adiciona o texto na tela e limpa a caixa de texto
function addTextChat(text){
    const msg = document.createElement('div');
    msg.classList.add('remetente');

    const spanText = document.createElement('span');
    spanText.innerText = text;

    msg.appendChild(spanText);
    conversa.appendChild(msg);

    conversa.scrollTop = conversa.scrollHeight;
}

// FUNÇÃO PARA ENVIAR AS MENSAGENS
function enviarMensagem(msg) {
    let tempo = new Date();

    const data = {
        global: globalIdPlacehold,
        remetId: userId,
        destId: destinatarioId,
        msg: msg,
        tempo: `${tempo.getUTCFullYear()}-${tempo.getUTCMonth()}-${tempo.getUTCDate()} ${tempo.getUTCHours()}:${tempo.getUTCMinutes()}:${tempo.getUTCSeconds()}`,
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
        texto.value = '';
    }
}

// checa se a tecla pressionada no textarea é a tecla enter
function sendMessage(e){    
    if (e.which == 13){
        if (texto.value != ''){   
            enviarMensagem(texto.value);
            addTextChat(texto.value);
            texto.value = '';
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

function searchUser(nome, callback) {
    const users = fetch('/getUsers', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({nome})
    }).then(response => response.json()).then(response => {
        return callback(JSON.stringify(response))
    })
}

function addUser(userId) {
    fetch('/addUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({"userId": userId})
    });
};

let timerGetUsers;
pesquisarInput.addEventListener('input', () => {
    clearTimeout(timerGetUsers);
    timerGetUsers = setTimeout(() => {
        pesquisarContainer.querySelectorAll('.adicionar').forEach((e) => e.remove());
        if (pesquisarInput.value != '') {
            searchUser(pesquisarInput.value, (users) => {
                for (const u of JSON.parse(users)) {
                    const divAdicionar = document.createElement('div');
                    divAdicionar.classList.add('adicionar');

                    const divImg = document.createElement('img');
                    divImg.src = "../images/icones/perfil.png";
    
                    const divNome = document.createElement('div');
                    divNome.classList.add('adicionar-nome');
                    divNome.innerHTML = u.nome;
    
                    const divAddIcone = document.createElement('div');
                    divAddIcone.innerText = "+";
                    divAddIcone.id = u.iduser;
                    divAddIcone.classList.add('adicionar-button');

                    divAddIcone.addEventListener('click', () => {
                        addUser(u.iduser);
                        divAdicionar.remove()
                    });
    
                    divAdicionar.append(divImg, divNome, divAddIcone);
                    pesquisarContainer.appendChild(divAdicionar);
                };
            });
        };      
    }, 800);
});