import { Enemy } from "./Enemy.js";

export class Entity{
  // Definições das entidades
  constructor(){
    this.enemies = []
    this.entities = {
      'player': {
        armor: 0,
        magic_resist: 0,
        maxHealth: 1500,
        currentHealth: 1500,
        speed: 5,
        physical_damage: 2,
        magic_damage: 0
      },
      'slime': {
        sprite: '../../images/sprites/enemies/slime.png',
        armor: 0,
        magic_resist: 0,
        maxHealth: 10,
        currentHealth: 10,
        speed: 2,
        physical_damage: 2,
        magic_damage: 0
      },
      'goblin': {
        sprite: '../../images/sprites/enemies/goblin.png',
        armor: 0,
        magic_resist: 0,
        maxHealth: 20,
        currentHealth: 10,
        speed: 4,
        physical_damage: 5,
        magic_damage: 0
      },
      'dummy': {
        sprite: '../../images/icones/tutorial.png',
        armor: 0,
        magic_resist: 0,
        maxHealth: 100,
        currentHealth: 10,
        speed: 0,
        physical_damage: 0,
        magic_damage: 0
      }
    }
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

  drawStrokedText(context, text, x, y) {
    context.fillStyle = "rgb(0,0,0)";
    context.fillText(text, x - 1, y - 1);
    context.fillText(text, x + 1, y - 1);
    context.fillText(text, x - 1, y);
    context.fillText(text, x + 1, y);
    context.fillText(text, x - 1, y + 1);
    context.fillText(text, x + 1, y + 1);
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(text, x, y);
  }
  drawText(context, text, x, y) {
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(text, x, y);
  }
  drawLife(context){
    
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.w, this.h / 10);
    context.fillStyle = "green";
    context.fillRect(this.x, this.y, 1 / (this.config.maxHealth / this.config.currentHealth) * this.w, this.h / 10);
    this.drawStrokedText(context, `${this.config.currentHealth}/${this.config.maxHealth}`, this.x + 5, this.y - 5);
  }
  dealDamage(target){
    if (target.config.currentHealth <= this.config.physical_damage){
      target.config.currentHealth = 0
      return
    }
    target.config.currentHealth = target.config.currentHealth - this.config.physical_damage

  }
  takeDamage(dealer){
    if (this.config.currentHealth <= dealer.config.physical_damage){
      this.config.currentHealth = 0
      return
    }
    this.config.currentHealth = this.config.currentHealth - dealer.config.physical_damage
  }
  checkDead(){
    if(this.config.currentHealth <= 0){
      this.config.speed = 0
  }
  }

  // Cria os inimigos
  createEnemy(enemy, x, y, w, h){
    this.enemies.push(new Enemy(this.entities[enemy], x, y, w, h))
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