const Usuario = require('./Usuario');
const Achievement = require('./Achievement')

module.exports = class User_has_achievements {
    constructor () {
        this.usuario = new Usuario();
        this.Achievements = new Achievement()
        this.completionStatus;
    }
    mudarStatus (conexao, callback){
        let sql = `
        UPDATE User_has_achievements
        SET status = 1
        WHERE id = 123;`
        
        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback
        });
    }

    listar (conexao, callback) {
        let sql = "select * from user_has_achievements";

        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback
        });
    }
    
    listarNConcluidos (conexao, callback){
        //uha == user_has_achievements
        let sql = `
        SELECT uha.*
        FROM user_has_achievement uha
        LEFT JOIN achievement a ON uha.achievement_id = a.achievement_id
        WHERE uha.completionstatus = 0;
        `;

        conexao.query(sql, (err, result) => {
            if (err) throw err;
            return callback
        });
    }
}