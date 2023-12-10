const Usuario = require('./Usuario');


module.exports = class HighScore {
    constructor () {
        this.pontuacao = 0;
        this.timer = 0
        this.usuario = new Usuario();
        

    }

    inserir (conexao) {
        let sql = "insert into highscore (pontuacao, user_iduser, timer) values (?, ?, ?)";

        conexao.query(sql, [this.pontuacao, this.usuario, this.timer], (err, result) => {
            if (err) throw err
        });
    }

    listar (conexao, callback) {
        console.log('listar rodou!')
        let sql = `
        SELECT  highscore.user_iduser, user.nome, highscore.pontuacao, highscore.timer
        FROM highscore 
        LEFT JOIN user ON highscore.user_iduser = user.iduser
        ORDER BY highscore.pontuacao DESC, highscore.timer
        LIMIT 15;            
        
        `;

        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback(result)
        });
    }
}