const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
    console.log("Servidor no ar - Porta: 3000!")
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/home.html');
});

app.get('/gameTest', function(req, res){
    res.sendFile(__dirname + '/public/views/gameTest.html');
});