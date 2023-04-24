const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
    console.log("Servidor no ar - Porta: 3000!")
});

pages =__dirname + '/public/views'

app.get('/', function(req, res){
    res.sendFile(pages + '/home.html');
});

app.get('/tutoriais', function(req, res){
    res.sendFile(pages + '/tutoriais.html');
});

app.get('/cadastro', function(req, res){
    res.sendFile(pages + '/cadastro.html');
});

app.get('/entrar', function(req, res){
    res.sendFile(pages + '/entrar.html');
});

app.get('/cadastrados', function(req, res){
    res.sendFile(pages + '/cadastrados.html');
});