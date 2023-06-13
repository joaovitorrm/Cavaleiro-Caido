import { Entity } from './Entity.js'

export class Enemy extends Entity{
    constructor(config, x, y, w, h){
        super(Entity)
        
        //console.log(config)

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
;
    }

    update() {
        this.move_right(this.config.speed);
    }

    checkCollision(canvas, player){
        if (this.checkScreenCollision(canvas, this.x, this.y, this.w, this.h)){
            //this.config.speed *= -1;
            this.x = 0
        }
        if (this.check2Collision(player.x + player.hitbox_x, player.y + player.hitbox_y, player.hitbox_w, player.hitbox_h, this.x, this.y, this.w, this.h)){
            this.config.speed = 0;
            return;
        }
    }
    
    draw(context) {
        this.drawLife(context)
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}