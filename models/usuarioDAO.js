module.exports = class Usuario {
    constructor() {
        this.nome = ""
        this.email = ""
        this.senha = ""
        this.data_nascimento = ""
    }

    inserir(conexao) {
        const sql = "insert into usuario (nome, email, senha, data_nascimento) values (?, ?, ?, ?)";
        conexao.query(sql, [this.nome, this.email, this.senha, this.data_nascimento], (err, result) => {
            if (err) throw err;
        })
    }

    listar(conexao, callback){
        const sql = "select * from usuario";
        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

}