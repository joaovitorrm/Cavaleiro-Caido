import { Enemy } from "./Enemy.js";
import enemies from './enemies.json' assert {type: 'json'}

export class Entity{
  // Definições das entidades
  constructor(){
    
    this.entities = { //valor concedido de exp ao morrer é o currentExp
      'player': {
        armor: 0,
        magicResistance: 0,
        maxHealth: 150,
        currentHealth: 150,
        speed: 10,
        physicalDamage: 2,
        magicDamage: 0
      },
      'slime': {
        sprite: '../../images/sprites/enemies/slime.png',
        armor: 0,
        magicResistance: 0,
        maxHealth: 10,
        currentHealth: 10,
        speed: 2,
        physicalDamage: 2,
        magicDamage: 0
      },
      'goblin': {
        sprite: '../../images/sprites/enemies/goblin.png',
        armor: 0,
        magicResistance: 0,
        maxHealth: 20,
        currentHealth: 10,
        speed: 4,
        physicalDamage: 5,
        magicDamage: 0
      },
      'dummy': {
        sprite: '../../images/icones/tutorial.png',
        armor: 0,
        magicResistance: 0,
        maxHealth: 100,
        currentHealth: 10,
        speed: 0,
        physicalDamage: 0,
        magicDamage: 0
      },
      'cavaleiro_boss': {
        sprite: '../../images/sprites/enemies/cavaleiro_real.png',
        armor: 0,
        magicResistance: 0,
        maxHealth: 1500,
        currentHealth: 1500,
        speed: 0,
        physicalDamage: 10,
        magicDamage: 0
      }
      
      
    }
  console.log(enemies)
  console.log(this.entities['slime'])
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
    if(xa < 0 || xa + wa > canvas.width || ya < 0 || ya + ha > canvas.height){
      return true;
    }
    return false;
  }
}