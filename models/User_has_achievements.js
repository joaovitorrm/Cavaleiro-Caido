const Usuario = require('./Usuario');
const Achievement = require('./Achievement');

module.exports = class User_has_achievements {
  constructor() {
    this.userId = 1;
    this.achievements = new Achievement();
  }

  listar(conexao, callback) {
    let sql = "SELECT * FROM user_has_achievement WHERE user_iduser = ?"; // Fixed table name and column name

    conexao.query(sql, [this.userId] ,(err, result) => {
      if (err) throw err;
      return callback(result);
    });
  }
  
  inserirAchievementCompleto(conexao, AchievementId){
    const sql = "insert into user_has_achievements (userId, achievementId) values (?, ?)";
    conexao.query(sql, [this.userId, this.AchievementId], (err, result) => {
        if (err) throw err;
    })
}

  listarNConcluidos(conexao, userId, callback) {
    let sql = `
      SELECT achievement.* 
      FROM achievement
      LEFT JOIN user_has_achievement 
      ON achievement.idachievement = user_has_achievement.achievement_idachievement 
      AND user_has_achievement.user_iduser = ? 
      WHERE user_has_achievement.user_iduser IS NULL`;

    conexao.query(sql, [userId], (err, result) => {
      if (err) throw err;
      return callback(result);
    });
    

}
};
