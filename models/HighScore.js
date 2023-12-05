const Usuario = require('./Usuario');


module.exports = class HighScore {
    constructor () {
        this.pontuacao = 0;
        this.usuario = new Usuario();

    }

    inserir (conexao) {
        let sql = "insert into highscore (pontuacao, userId) values (?, ?)";

        conexao.query(sql, [this.pontuacao, this.usuario], (err, result) => {
            if (err) throw err
        });
    }

    listar (conexao, callback) {
        let sql = "select * from highscore";

        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback
        });
    }
}