const Usuario = require('./Usuario');


module.exports = class HighScore {
    constructor () {
        this.pontuacao = 0;
        this.usuario = new Usuario();

    }

    inserir (conexao) {
        let sql = "insert into highscore (pontuacao, user_iduser) values (?, ?)";

        conexao.query(sql, [this.pontuacao, this.usuario], (err, result) => {
            if (err) throw err
        });
    }

    listar (conexao, callback) {
        console.log('listar rodou!')
        let sql = `
        SELECT user_iduser, pontuacao 
        FROM highscore
        ORDER BY pontuacao DESC
        LIMIT 15
        
        `;

        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback(result)
        });
    }
}