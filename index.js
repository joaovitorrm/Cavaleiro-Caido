/* salvarPontuacao() {
    const data = {
        jogo: 'brick-breaker',            
        pontuacao: this.pontos,
        total: this.nivel,
    }

    fetch('/inserirPontuacaoSimples', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    })
}
 */

// SETUP EJS, EXPRESS E NODE
const express = require('express')
const app = express()
const port = 3000

app.listen(port, function(){
    console.log(`Servidor no ar - Porta: ${port}`)
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/public/views')

app.set('view engine', 'ejs')

pages =__dirname + '/public/views'

// CONEXÃO COM O MYSQL
const req = require('express/lib/request');
const mysql = require('mysql');


const HighScore = require('./models/HighScore');
const Chat = require('./models/Chat');
const User_has_achievements = require('./models/User_has_achievements');


const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cavaleiro"
})
conexao.connect(function(err) {
    if (err) throw err;
    console.log("Banco de Dados Conectado!");
  });


//ABRIR HOME
app.get('/', function(req, res){
    res.render('home');
});

// CADASTRO DE USUARIOS
const Usuario = require('./models/Usuario');

app.post('/cadastrarUsuario', (req, res) => { //FORM DO CADASTRO
    const user = new Usuario()
    user.id = req.body.iduser
    user.nome = req.body.nome
    user.email = req.body.email
    user.senha = req.body.senha
    user.cargo = "user"
    user.imagem = req.body.imagemURL

    user.inserir(conexao)
    res.render('confirmaCadastro')
});

app.get('/cadastro', function(req, res){ 
    res.render('cadastro');
});

app.get('/entrar', function(req, res){ //FORM DE ENTRAR
    res.render('entrar');
});

app.get('/cadastrados', function(req, res){ //ABRIR PAGINA ADMINISTRATIVA QUE CONTEM A LISTA DE CADASTROS
    const user = new Usuario

    user.listar(conexao, (result) => {
        res.render("cadastrados", {usuarios: result})
    })    
});


// CHAT
app.post('/getChat', (req, res) => {
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

app.post('/enviarMensagem/', (req, res) => {

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


//TUTORIAIS
app.get('/tutoriais', function(req, res){
    res.render('tutoriais');
});


app.get('/contato', function(req, res){
    res.render('contato');
});

app.get('/sobre', function(req, res){
    res.render('sobre');
});

app.get('/login_efetuado', function(req, res){
    res.render('login_efetuado');
});

app.get('/minijogos', (req, res) => {
    res.render('minijogos')
})

app.get('/highscore', function (req, res) {
    const hs = new HighScore();

    hs.listar(conexao, (result) => {
        res.render("highscore", {hs: result})
    });
})

app.post('/getAchievementsNaoFeitos', (req, res) => {
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

app.post('/giveAchievementToUser', (req, res) => {

    const { achievementId } = req.body;

    let uha = new User_has_achievements();

    uha.userId = 2
    uha.achievementId = achievementId

    uha.inserirAchievementCompleto(conexao);


})


app.get('/Achievement', function (req, res){
    const achievement = new Achievement();

    achievement.listar(conexao, (result) => {
        res.render("achievement", {achievement: result})
    });
})
