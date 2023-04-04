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

app.get('/home', function(req, res){
    res.sendFile(pages + '/home.html');
});


app.get('/gameTest', function(req, res){
    res.sendFile(pages + '/gameTest.html');
});

app.get('/cadastro', function(req, res){
    res.sendFile(pages + '/cadastro.html');
});

app.get('/login', function(req, res){
    res.sendFile(pages + '/login.html');
});

app.get('/cadastrados', function(req, res){
    res.sendFile(pages + '/cadastrados.html');
});