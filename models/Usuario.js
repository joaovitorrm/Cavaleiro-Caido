module.exports = class Usuario {
    constructor() {
        this.id = "";
        this.nome = "";
        this.email = "";
        this.senha = "";
        this.imagem = "";
        this.cargo = "";
    }

    inserir(conexao, callback) {
        const sql = "insert into user (nome, email, senha, cargo, imagemURL) values (?, ?, ?, ?, ?)";
        conexao.query(sql, [this.nome, this.email, this.senha, this.cargo, this.imagemURL], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    listar(conexao, callback){
        const sql = "select * from user";
        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    };

    pesquisar(conexao, callback) {
        conexao.query('SELECT * FROM user WHERE nome like ?', [this.nome], (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

    excluir(conexao, callback) {
        conexao.query('DELETE FROM user WHERE iduser = ?', [this.id], (err, result) => {
            if (err) throw err;
            return callback(result, err);
        });
    };

}