// SETUP EJS, EXPRESS E NODE
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const session = require('express-session')


const Usuario = require('./models/Usuario');
const HighScore = require('./models/HighScore');
const Chat = require('./models/Chat');
const User_has_achievements = require('./models/User_has_achievements');

app.listen(port, function(){
    console.log(`Servidor no ar - Porta: ${port}`)
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

app.use(session({secret: 'teste', saveUninitialized:true, resave: true}))

app.set('views', __dirname + '/public/views')
app.set('view engine', 'ejs')

// CONEXÃO COM O MYSQL
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cavaleiro"
});
conexao.connect(function(err) {
    if (err) throw err;
    console.log("Banco de Dados Conectado!");
});

// FUNÇÃO PARA GERAR AS VARIAVEIS GLOBAIS
app.use((req, res, next) => {
    app.locals.userId = req.session.userId;
    app.locals.admin = req.session.admin;
    app.locals.logado = req.session.logado;
    next();
});

app.get('/', function(req, res){					//ABRIR HOME	
	res.render('home');
});

// CADASTRO DE USUARIOS
app.post('/salvarUsuario', (req, res) => { 		//FORM DO CADASTRO
    const {id, nome, email, senha, imagem, acao} = req.body;

    const user = new Usuario();    
    user.nome = nome;
    user.email = email;
    user.senha = senha;
    user.imagem = imagem;
    user.cargo = 'user'

    if (acao == 'Cadastrar') {    
        user.inserir(conexao, (err, result) => {
            if (err) {
                res.render('resultado', {mensagem: 'Erro ao cadastrar usuário!'});
            } else {
                res.render('resultado', {mensagem: 'Usuário cadastrado com sucesso!'});
            };
        });
    } else if (acao == 'Atualizar') {
        user.id = id;
        console.log(id);
        user.atualizar(conexao, () => {
            res.redirect('/cadastrados');
        });
    };
    
});

app.post('/processarUsuario', (req, res) => {		//EXCLUIR USER PAG. CADASTRADOS
    const {acao, userId} = req.body;

    const usuario = new Usuario();
    usuario.id = userId;

    if (acao == 'Excluir') {        
        usuario.excluir(conexao, (result) => {
            res.redirect('/cadastrados');
        });
    } else if (acao == 'Atualizar') {
        usuario.pesquisar(conexao, (user) => {
            res.render('cadastro', {acao: 'Atualizar', user: user[0]});
        });
    };
});

app.post('/pesquisarUsuarios', (req, res) => { 		//LISTA DOS CADASTRADOS
    const {inputText} = req.body;

    const usuario = new Usuario();
    usuario.nome = "%" + inputText + "%";

    usuario.pesquisar(conexao, (usuarios) => {
        res.render('cadastrados', {usuarios});
    });
});

app.post('/addUser', (req, res) => {
    const {userId} = req.body;

    const user = new Usuario();
    user.id = req.session.userId;

    user.adicionarAmigo(conexao, userId);

    res.end();
})

app.get('/cadastro', function(req, res){ 			//PAGINA FORM DE CADASTRO
    const user = new Usuario();
    res.render('cadastro', {acao: 'Cadastrar', user});
});

app.get('/entrar', function(req, res){ 				//PAGINA FORM DE LOGIN
    res.render('entrar');
});

app.post('/getUsers', (req, res) => {
    const {nome} = req.body;

    const usuario = new Usuario();
    usuario.nome = "%" + nome + "%";
    usuario.id = req.session.userId;

    usuario.pesquisarAmigos(conexao, (usuarios) => {
        res.json(usuarios);
        res.end();
    });
})

app.post('/getFriends', (req, res) => {
    const usuario = new Usuario();
    usuario.id = req.session.userId;

    usuario.listarAmigos(conexao, (amigos) => {
        res.json(amigos);
        res.end();
    });
})

app.get('/cadastrados', function(req, res){ 		//ABRIR PAG. ADMINISTRATIVA QUE CONTEM A LISTA DE CADASTROS
    if(req.session.admin) {
        const user = new Usuario();

        user.listar(conexao, (result) => {
            res.render("cadastrados", {usuarios: result});
        })
    }
    else{
		res.redirect('/entrar');
    };

});

app.post('/login', function(req, res){ 				//ATRIBUIR EMAIL
    const {email, senha} = req.body;
    const user = new Usuario();

    user.email = email;
    user.senha = senha;

    user.logar(conexao, (result) => {
        if (result.length > 0) {
            req.session.logado = true;
            req.session.userId = result[0].iduser;
            if (result[0].cargo == 'admin') {
                req.session.admin = true;
            }
            res.redirect('/');
        } else {
            res.render('resultado', {mensagem: 'Erro ao fazer o login! Verifique os dados inseridos.'})
        }
    })   
	
});

app.get('/perfil', (req, res) => {    
    if (req.session.logado) {
        const u = new Usuario();   
        u.id = req.session.userId;

        u.pesquisar(conexao, (result) => {
            res.render('cadastro', {user: result[0], acao: "Atualizar"});
        });
    } else {
        res.redirect('/entrar')
    }
    

});

app.get('/sair', function(req, res){ 				//DESATRIBUIR EMAIL
	req.session.logado = false;
    req.session.admin = false;
    req.session.userId = '';
	res.redirect('/');
});


// CHAT
app.post('/getChat', (req, res) => { 				//LOAD CHAT
    let chat = new Chat();
    const {global, remetId, destId} = req.body;

    chat.remetId = remetId;
    chat.destId = destId;
    chat.global = global;

    chat.listarMensagens(conexao, (result) => {
        res.json(result);
        res.end();
    })    
})

app.post('/enviarMensagem/', (req, res) => { 		//ENVIAR MSG

    const {global, remetId, destId, msg, tempo} = req.body;

    let chat = new Chat();

    chat.mensagem = msg;
    chat.global = global;
    chat.remetId = remetId;
    chat.destId = destId;
    chat.tempo = tempo;

    

    chat.enviarMensagem(conexao);

    res.end();
})
	


app.get('/tutoriais', function(req, res){ 			//TUTORIAIS
    res.render('tutoriais');
});


app.get('/contato', function(req, res){ 			//CONTATO
    res.render('contato');
});

app.get('/sobre', function(req, res){ 				//SOBRE
    res.render('sobre');
});

app.post('/getAchievementsNaoFeitos', (req, res) => {//SELECT ACHIEVEMENTS Ñ CONCLUIDOS
    let uha = new User_has_achievements();
    const { userId, achievementId, condicao, img, recompensa, descricao } = req.body; // Assuming you receive the user's ID in the request body
    
    uha.userId = userId;
    uha.achievement.achievementId = achievementId;
    uha.achievement.condicao = condicao;
    uha.achievement.img = img;
    uha.achievement.recompensa = recompensa;
    uha.achievement.descricao = descricao;

    uha.listarNConcluidos(conexao, (result) => {

        res.json(result) //results == idachievement, condicao,img,recompensa,descricao
        res.end();
    });
});

app.post('/giveAchievementToUser', (req, res) => {	//CONCEDER ACHIEVEMENT

    const { achievementId } = req.body;

    let uha = new User_has_achievements();

    uha.userId = 2
    uha.achievementId = achievementId

    uha.inserirAchievementCompleto(conexao);


})

app.post('/insertPontuacao', (req, res) => {       //INSERIR PONTUACAO NO DB

    if(req.session.userId){
        const { pontuacao } = req.body;


    
        let highscore = new HighScore();
    
        highscore.usuario = req.session.userId
        highscore.pontuacao = pontuacao
    
        highscore.inserir(conexao)

    }
})

app.get('/highscore', function (req, res) {			//PÁGINA LISTA DE HIGHSCORE
    
    console.log('/highscore rodou!')
    const hs = new HighScore();

    hs.listar(conexao, (result) => {
        res.render("highscore", {hs: result})
    });
})