
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

// Define a simple pub/sub mechanism
const EventBus = {
    topics: {},
    subscribe(topic, listener) {
      if (!this.topics[topic]) {
        this.topics[topic] = [];
      }
      this.topics[topic].push(listener);
    },
    publish(topic, data) {
      if (!this.topics[topic]) {
        return;
      }
      this.topics[topic].forEach((listener) => {
        listener(data);
      });
    },
  };
  
function playerStatsComponent(achievements) {
EventBus.subscribe('achievement_unlocked', (achievement) => {
    // Update player's stats UI here
});
}

function notificationComponent() {
EventBus.subscribe('achievement_unlocked', (achievement) => {
    console.log(`Notification: You earned a new achievement: ${achievement}`);
    // Show a notification to the player here
});
}

function leaderboardComponent() {
EventBus.subscribe('achievement_unlocked', (achievement) => {
    console.log(`Updating leaderboard for achievement: ${achievement}`);
    // Update the leaderboard here
});
}

// Simulate a player earning an achievement
function playerEarnAchievement(achievement) {
console.log(`Player earned achievement: ${achievement}`);
EventBus.publish('achievement_unlocked', achievement);
}

// Usage
playerStatsComponent();
notificationComponent();
leaderboardComponent();

// Simulate a player earning an achievement
playerEarnAchievement('High Score');
