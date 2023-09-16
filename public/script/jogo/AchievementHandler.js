
//publish/subscribe
//https://en.wikipedia.org/wiki/Publish–subscribe_pattern

import { Player } from './Player.js';

export class AchievementHandler{
  constructor(game){            
    this.game = game
    this.stats = game.player.stats
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

    this.initAchievements()

  
    

  }
  update() {
    if (this.achievementsAConcluir) { // Check if it's not null before using it
      this.achievementsAConcluir.forEach((a) => {
        this.events.publish("achievement", a);
      });
    }
  }
  async initAchievements() {
    const achievementsData = await this.fetchAchievements();
    this.achievementsAConcluir = achievementsData;

    // Now that achievementsAConcluir is initialized, you can subscribe and use it further
    this.subscribes();
  }

  
  fetchAchievements(userId, achievementId,condicao,img,recompensa,descricao, callback) {
    console.log("fetch rodou!")
    const data = {
      userId,
      achievementId,
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
      this.achievementsAConcluir = response
      return(response)
    })

    
  }

  giveAchievementToUser(achievementId) {
    fetch('/giveAchievementToUser', {
      method: 'POST',
      body: JSON.stringify({ achievementId }),
      headers: {
        'Content-Type': 'application/json',
      },
       // Pass the achievement ID to the server
    });

    console.log(`Achievement ${achievementId} given to the user.`);
}
  subscribes() {
    this.events.subscribe("achievement", (data) => {
      if (eval(data['condicao'])()) {

        this.giveAchievementToUser(data['achievementId']);
        console.log(data.achievementId)

        this.achievementsAConcluir = this.achievementsAConcluir.filter(monke => monke.achievementId != data.achievementId);
        console.log(`achievement ${data['achievementId']} completo!, achievements a concluir: ${this.achievementsAConcluir.length}`);
      }
    });
  }


}
