import { Entity } from './Entity.js'
import { DrawText } from './DrawText.js';


export class Enemy extends Entity{
    constructor(game, config, x, y, w, h){
        super(Entity)
        
        this.game = game;

        this.config = { 
            sprite: config.sprite,
            physicalDamage: config.physicalDamage,
            speed: config.speed,
            maxHealth: config.maxHealth,
            currentHealth: config.currentHealth,
        };

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.sprite = new Image();
        this.sprite.src = config.sprite;
    }

    update() {
        this.move_right(this.config.speed);        
        this.checkEnemyCollision();
    }

    drawLife(context){
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.w, this.h / 10);
        context.fillStyle = "green";
        context.fillRect(this.x, this.y, 1 / (this.config.maxHealth / this.config.currentHealth) * this.w, this.h / 10);

        let life = new DrawText();
        Object.assign(life, {
            text: `${this.config.currentHealth}/${this.config.maxHealth}`,
            textAlign: "center",
            x: this.x + this.w / 2,
            y: this.y - 5, 
            fontStyle: "bold",
            color: "white",
            fontSize: 20,
        })
        life.drawStrokedText(context);
    }

    checkEnemyCollision(){
        if (this.checkScreenCollision(this.game.canvas, this.x, this.y, this.w, this.h)){
            this.config.speed *= -1;            
        }
        if (this.checkCollision(this.game.player.x + this.game.player.hitbox_x, this.game.player.y + this.game.player.hitbox_y, this.game.player.hitbox_w, this.game.player.hitbox_h, this.x, this.y, this.w, this.h)){
            this.config.speed = 0;
            return;
        }
    }
    
    draw(context) {
        this.drawLife(context)
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}