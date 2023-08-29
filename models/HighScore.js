const Usuario = require('./Usuario');
// const MiniJogos = require('./MiniJogos');

module.exports = class HighScore {
    constructor () {
        this.pontuacao = 0;
        this.usuario = new Usuario();
        // this.minijogos = new MiniJogos();
    }

    inserir (conexao) {
        let sql = "insert into highscore (pontuacao) values (?)";

        conexao.query(sql, [this.pontuacao], (err, result) => {
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