const Usuario = require('./Usuario');
const Achievement = require('./Achievement');

module.exports = class User_has_achievements {
  constructor() {
    this.userId = new Usuario();
    this.achievement = new Achievement();
  }
  
  inserirAchievementCompleto(conexao){
    const sql = "insert into user_has_achievement (user_iduser, achievement_achievementId) values (?, ?)";
    conexao.query(sql, [this.userId, this.achievementId], (err, result) => {
        if (err) throw err;
    })
}

  listarNConcluidos(conexao, callback) {
    let sql = `
    SELECT * 
    FROM achievement
    LEFT JOIN user_has_achievement 
    ON achievement.achievementId = user_has_achievement.achievement_achievementId 
       AND user_has_achievement.user_iduser = ?
    WHERE user_has_achievement.user_iduser IS NULL
    `;

    conexao.query(sql, [this.userId],(err, result) => {
      if (err) throw err;
      return callback(result);
    });
    

}
};
