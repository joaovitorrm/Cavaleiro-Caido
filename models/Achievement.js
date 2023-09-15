
module.exports = class achievement {
    constructor () {
        this.id;
        this.condicao;
        this.img;
        this.recompensa;
    }

    inserir (conexao) {
        let sql = "insert into achievement (condicao, img, recompensa) values (?, ?, ?)";

        conexao.query(sql, [this.condition, this.img, this.reward], (err, result) => {
            if (err) throw err
        });
    }

    listar (conexao, callback) {
        let sql = "select * from achievement";

        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback(result)
        });
    }
}