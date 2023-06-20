const express = require('express')
const app = express()
const port = 3000

app.listen(port, function(){
    console.log("Servidor no ar - Porta: 3000!")
});

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/public/views')

app.set('view engine', 'ejs')

pages =__dirname + '/public/views'

app.get('/', function(req, res){
    res.render('home');
});

app.get('/tutoriais', function(req, res){
    res.render('tutoriais');
});

app.get('/cadastro', function(req, res){
    res.render('cadastro');
});

app.get('/entrar', function(req, res){
    res.render('entrar');
});

app.get('/cadastrados', function(req, res){
    res.render('cadastrados');
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