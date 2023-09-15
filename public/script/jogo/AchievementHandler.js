
//publish/subscribe
//https://en.wikipedia.org/wiki/Publish–subscribe_pattern

import { Player } from './Player.js';

export class AchievementHandler{
  constructor(game){            
    this.game = game
    this.stats = game.player.stats
    this.achievementsAConcluir = []
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


    this.subscribes()
  }
  subscribes() {
    this.events.subscribe("achievement", (data) => {
      console.log(data)
      if (data['condicao']()) {

        this.giveAchievementToUser(data.id);

        this.achievementsAConcluir = this.achievementsAConcluir.filter(monke => monke.id != data.id);
        console.log(`achievement ${data.id} completo!, achievements a concluir: ${this.achievementsAConcluir.length}`);
      }
    });
  }
  
  update(){
    this.achievementsAConcluir.forEach((a) =>{this.events.publish("achievement", a);})

  }

  
  fetchAchievements(idachievement, condicao,img,recompensa,descricao, callback) {
    const data = {
      idachievement,
      condicao,
      img,
      recompensa,
      descricao
    }
    this.achievements = fetch('/getAchievementsNaoFeitos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(response => {
        return callback(JSON.stringify(response))
    })

    
}

  giveAchievementToUser(achievementId) {
    const response = fetch('/giveAchievementToUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ achievementId }), // Pass the achievement ID to the server
    });

    console.log(`Achievement ${achievementId} given to the user.`);
}

}
