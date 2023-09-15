
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


/*
A ideia é o a classe receber:
 - um array com as funções de achievements a serem coletados (messageQueue) do BD pelo servidor
 - dados relevantes da classe player (distancia caminhada e kills)
e constantes loopar o array checando as condições
*/

import { Player } from './Player.js';

export class AchievementHandler{
  constructor(game){            
    this.game = game
    this.stats = game.player.stats
    this.achievementsAConcluir = [{
      id: 0,
      condicao: ()=>{if(enemiesKilled == 1){return(true)}},
      img: "./a",
      status: 0
    },
    {
      id: 1,
      condicao: ()=>{if(enemiesKilled == 5){return(true)}},
      img: "./a",
      status: 0
    },
    {
      id: 2,
      condicao: ()=>{if(enemiesKilled == 10){return(true)}},
      img: "./a",
      status: 0
    }]
    this.events = {
      events: {},
      subscribe: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
      },
      unsubscribe: function (eventName, fn) {
        if (this.events[eventName]) {
          for (var i = 0; i < this.events[eventName].length; i++) {
            if (this.events[eventName][i] === fn) {
              this.events[eventName].splice(i, 1);
              break;
            }
          };
        }
      },
      publish: function (eventName, data) {
        if (this.events[eventName]) {
          this.events[eventName].forEach(function (fn) {
            fn(data);
          });
        }
      }
    }
  }
  subscribes(){
    /*
    events.subscribe("achievement", function(data){
    //usar fetch para fazer a interface achievementHandler - server - sql
    //para executar o alter table

    });
    */
    events.subscribe("achievement", function(data){
      //console.log(`notificação, ${data['id']} concluído`);
      //drawImage(img do achievement no 0,0 do canvas)
      
      if(data['condicao']()){
        achievementsAConcluir = achievementsAConcluir.filter(monke => monke.id != data.id)
        console.log(`achievement ${data.id} completo!, achievements a concluir: ${achievementsAConcluir.length}`)
      }
      console.log(data.condicao())
    });
  }
}

achievementsAConcluir.forEach((a) =>{ events.publish("achievement", a);})
