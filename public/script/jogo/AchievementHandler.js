
//publish/subscribe
//https://en.wikipedia.org/wiki/Publish–subscribe_pattern


//recebe um 

/*
WITH messagetobesent AS (
    SELECT * FROM user_has_achievement
    WHERE completionstatus EQUAL TO 0 (false)
    LEFT JOIN user_has_achievement, achievement ON achievement_id
)
SELECT condition 
FROM messagetobesent

*/
import { Player } from './Player.js';

export class AchievementHandler{
    constructor(game){
        this.game = game
        this.enemiesKilled = 0
        this.distanceWalked = 0
        this.messageQueue = ["killOne()"]

    }
    killOne(){
        if(this.enemiesKilled >= 1){
            return //enviar algo pro servidor
        }
    }
}