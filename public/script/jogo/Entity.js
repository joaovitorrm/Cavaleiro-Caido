import { Enemy } from "./Enemy.js";

export class Entity{
  // Definições das entidades
  constructor(){
    this.enemies = []
  }

  // Cria os inimigos
  createEnemy(enemy, x, y, w, h){
    this.enemies.push(new Enemy(enemy, x, y, w, h))
  }

  //método que checa a colisão com <entity> em relação ao player
  check2Collision(xa, ya, wa, ha, xb, yb, wb, hb) {
    if ((xa + wa > xb && xa < xb + wb && ya + ha > yb && ya < yb + hb)) {
      return true;
    }
    return false;
  }

  //método que checa a colisão com a parede
  checkScreenCollision(canvas, xa, ya, wa, ha){
    if(xa < 0 || xa + wa > canvas.width || ya < 0 || ya + ha > canvas.height){
      return true;
    }
    return false;
  }
}