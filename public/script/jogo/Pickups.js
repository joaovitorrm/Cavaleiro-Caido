import { Entity } from './Entity.js'

export class Pickups extends Entity{
    constructor(config, x, y, w, h){
        super(Entity)

        this.config = { 
            sprite: config.sprite,
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
        
    }

    checkCollision(canvas, player){
        if (this.checkScreenCollision(canvas, this.x, this.y, this.w, this.h)){
            //this.config.speed *= -1;
            this.x = 0
        }
        if (this.check2Collision(player.x + player.hitbox_x, player.y + player.hitbox_y, player.hitbox_w, player.hitbox_h, this.x, this.y, this.w, this.h)){
            
            return;
        }
    }
    
    draw(context) {
        context.drawImage(this.sprite, this.x, this.y, this.w, this.h);
    }
}