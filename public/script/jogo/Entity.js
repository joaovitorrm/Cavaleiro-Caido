import { Enemy } from "./Enemy.js";

export class Entity{
  // Definições das entidades
  constructor(){
    this.sprites = {
      cavaleiro:"../../images/sprites/enemies/cavaleiro_real.png",
      slime:"../../images/sprites/enemies/slime.png",
      goblin: '../../images/sprites/enemies/goblin.png'
    }
    this.enemies = []
  }

  // Cria os inimigos
  createEnemy(enemy, x, y, w, h){
    let sprite = new Image()
    sprite.src = this.sprites[enemy];
    this.enemies.push(new Enemy(enemy, x, y, w, h, sprite))
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