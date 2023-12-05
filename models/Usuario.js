module.exports = class Usuario {
    constructor() {
        this.id = "";
        this.nome = "";
        this.email = "";
        this.senha = "";
        this.imagem = "";
        this.cargo = "";
    };

    inserir(conexao, callback) {
        const sql = "insert into user (nome, email, senha, cargo, imagemURL) values (?, ?, ?, ?, ?)";
        conexao.query(sql, [this.nome, this.email, this.senha, this.cargo, this.imagemURL], (err, result) => {
            if (err) throw err;
            return callback(err, result);
        });
    };

    listar(conexao, callback){
        const sql = "select * from user";
        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback(result);
        });
    };

    adicionarAmigo(conexao, id2, callback) {
        conexao.query('INSERT INTO amigos (user_iduser, user_iduser1) VALUES (?, ?)', [this.id, id2], (err, result) => {
            if (err) throw err;
        });
    };

    logar(conexao, callback) {
        conexao.query('SELECT * FROM user WHERE email = ? AND senha = ?', [this.email, this.senha], (err, result) => {
            if (err) throw err;
            return callback(result);
        });
    };

    pesquisar(conexao, callback) {
        conexao.query("WITH amigos_session AS ( \
            SELECT * FROM amigos \
            WHERE user_iduser = ? OR user_iduser1 = ? \
            ), \
            nao_session AS ( \
                SELECT u.iduser, u.nome \
                FROM user u \
                LEFT JOIN amigos a1 ON u.iduser = a1.user_iduser \
                LEFT JOIN amigos a2 ON u.iduser = a2.user_iduser1 \
                WHERE (a1.user_iduser IS NULL OR a1.user_iduser <> ?) \
                AND (a2.user_iduser1 IS NULL OR a2.user_iduser1 <> ?) \
            ), \
            filtrado_fim AS ( \
            SELECT * \
            FROM nao_session \
            WHERE NOT EXISTS ( \
                SELECT * \
                FROM amigos_session \
                WHERE amigos_session.user_iduser = nao_session.iduser OR amigos_session.user_iduser1 = nao_session.iduser \
            )) \
            SELECT * \
            FROM filtrado_fim \
            WHERE nome LIKE ? \
                AND iduser <> ?;", [this.id, this.id, this.id, this.id, this.nome, this.id], (err, result) => {
                if (err) throw err;
                return callback(result);
        });
    };

    excluir(conexao, callback) {
        conexao.query('DELETE FROM user WHERE iduser = ?', [this.id], (err, result) => {
            if (err) throw err;
            return callback(result, err);
        });
    };

}