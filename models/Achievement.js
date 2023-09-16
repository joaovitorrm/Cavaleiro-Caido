
module.exports = class achievement {
    constructor () {
        this.achievementId;
        this.condicao;
        this.img;
        this.recompensa;
        this.descricao
    }

    inserir (conexao) {
        let sql = "insert into achievement (condicao, img, recompensa, descricao) values (?, ?, ?)";

        conexao.query(sql, [this.condition, this.img, this.reward, this.descricao], (err, result) => {
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