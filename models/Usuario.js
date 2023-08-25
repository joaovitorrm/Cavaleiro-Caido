module.exports = class Usuario {
    constructor() {
        this.id = "";
        this.nome = "";
        this.email = "";
        this.senha = "";
        this.data_nascimento = "";
        this.imagem = "";
        this.cargo = "";
    }

    inserir(conexao) {
        const sql = "insert into user (nome, email, senha, data_nascimento, imagem) values (?, ?, ?, ?, ?)";
        conexao.query(sql, [this.nome, this.email, this.senha, this.data_nascimento, this.imagem], (err, result) => {
            if (err) throw err;
        })
    }

    listar(conexao, callback){
        const sql = "select * from user";
        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback(result);
        })
    }

}