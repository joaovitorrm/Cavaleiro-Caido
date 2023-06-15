import { Enemy } from "./Enemy.js";

import enemiesJson from './json/enemies.json' assert {type: 'json'}

export class Entity{
  // Definições das entidades
  constructor(){
    this.enemies = []
    this.entities = enemiesJson
  }
  
  move_up(speed){
    this.y -= speed;
  }
  move_down(speed){
      this.y += speed;
  }
  move_left(speed){
      this.x -= speed;
  }
  move_right(speed){
      this.x += speed;
  }


  drawText(context,text, x, y, color="rgb(255,255,255)") {
    context.fillStyle = color;
    context.fillText(text, x, y);
  }
  drawStrokedText(context, text, x, y) {
    context.fillStyle = "rgb(0,0,0)";
    context.fillText(text, x - 1, y - 1);
    context.fillText(text, x + 1, y - 1);
    context.fillText(text, x - 1, y);
    context.fillText(text, x + 1, y);
    context.fillText(text, x - 1, y + 1);
    context.fillText(text, x + 1, y + 1);
    this.drawText(context, text, x, y)
  }

  drawLife(context){
    if(this.currentHealth <= 0){
      return
    }
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.w, this.h / 10);
    context.fillStyle = "green";
    context.fillRect(this.x, this.y, 1 / (this.config.maxHealth / this.config.currentHealth) * this.w, this.h / 10);
    this.drawStrokedText(context, `${this.config.currentHealth}/${this.config.maxHealth}`, this.x + 5, this.y - 5);
  }

  dealDamage(source, target, who="both", amount=source.config.physicalDamage){
    if (target.config.currentHealth <= source.config.physicalDamage){
      target.config.currentHealth = 0
      return
    }
    switch(who){
      case "both":
        target.config.currentHealth = target.config.currentHealth - amount
        source.config.currentHealth = source.config.currentHealth - target.config.physicalDamage
        break;
      case "first":
        target.config.currentHealth = target.config.currentHealth - amount
        break;
      case "second":
        source.config.currentHealth = source.config.currentHealth - target.config.physicalDamage
        break;
    }


  }

  // método que checa a colisão com <entity> em relação ao player
  check2Collision(xa, ya, wa, ha, xb, yb, wb, hb) {
    if ((xa + wa > xb && xa < xb + wb && ya + ha > yb && ya < yb + hb)) {
      return true;
    }
    return false;
  }

  //método que checa a colisão com a parede
  checkScreenCollision(canvas, xa, ya, wa, ha){
    if(xa < 0 + 150 || xa + wa > canvas.width - 150 || ya < 0 + 100|| ya + ha > canvas.height - 100){
      return true;
    }
    return false;
  }
}